const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cargo_ton',
  password: '(101010)',
  port: 5432,
});

// Определение middleware для аутентификации пользователя
const authenticateUser = (req, res, next) => {
  // Получаем токен из заголовка запроса
  const token = req.headers.authorization;

  // Проверяем, есть ли токен
  if (!token) {
    return res.status(401).json({ message: 'Требуется аутентификация' });
  }

  try {
    // Проверяем и расшифровываем токен
    const decodedToken = jwt.verify(token.split(' ')[1], 'secret');

    // Извлекаем идентификатор пользователя из расшифрованного токена и добавляем его в объект запроса
    req.user = { userId: decodedToken.userId };

    // Продолжаем выполнение следующего middleware или маршрута
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен аутентификации' });
  }
};

app.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    country,
    city,
    street,
    houseAndApartment,
    postalCode,
    hasCompany,
    companyName,
    companyType,
    inn,
    officialCompanyAddress,
    companyPhone,
    password,
    agreedToTerms,
    captchaToken
  } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ message: 'Капча не пройдена' });
  }

  try {
    const secretKey = '6LenJuEpAAAAALPc3c6KlF4ndbcF6lFs_1Q10wO_'; // Замените на ваш реальный Secret Key
    const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    const captchaResponse = await axios.post(captchaVerifyUrl);
    const { success } = captchaResponse.data;

    if (!success) {
      return res.status(400).json({ message: 'Проверка капчи не удалась' });
    }

    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const userExists = await pool.query(checkUserQuery, [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хеширование пароля перед сохранением в базу данных
    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставка нового пользователя в базу данных
    const insertUserQuery = `
        INSERT INTO users (first_name, last_name, email, phone_number, date_of_birth, country, city, street, house_and_apartment, postal_code, hascompany, company_name, company_type, inn, official_company_address, company_phone, password_hash, agreed_to_terms)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    `;
    await pool.query(insertUserQuery, [firstName, lastName, email, phoneNumber, dateOfBirth, country, city, street, houseAndApartment, postalCode, hasCompany, companyName, companyType, inn, officialCompanyAddress, companyPhone, hashedPassword, agreedToTerms]);

    return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error.message);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверяем наличие пользователя с таким email в базе данных
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    // Если пользователь не найден, отправляем ошибку
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    // Сравниваем хешированный пароль с введенным паролем
    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    // Если пароль не совпадает, отправляем ошибку
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    // Генерируем JWT токен для аутентификации
    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '7d' });

    // Выводим время истечения токена в консоль
    const decodedToken = jwt.verify(token, 'secret');
    console.log('Время истечения токена:', new Date(decodedToken.exp * 1000).toLocaleString());

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Ошибка при входе пользователя:', error.message);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.post('/logout', (req, res) => {
  // Очистите токен из локального хранилища или из сессии
  // Перенаправьте пользователя на страницу входа
  return res.status(200).json({ message: 'Пользователь успешно вышел из профиля' });
});

// Получение данных профиля
app.get('/profile', authenticateUser, async (req, res) => {
  const userId = req.user.userId; // Получаем идентификатор пользователя из JWT токена
  
  try {
    // Выполняем запрос к базе данных, чтобы получить данные профиля пользователя по его идентификатору
    const userProfileQuery = 'SELECT * FROM users WHERE id = $1';
    const userProfile = await pool.query(userProfileQuery, [userId]);

    // Проверяем, найден ли пользователь
    if (userProfile.rows.length === 0) {
      return res.status(404).json({ message: 'Профиль пользователя не найден' });
    }

    // Отправляем данные профиля в ответе
    return res.status(200).json(userProfile.rows[0]);
  } catch (error) {
    console.error('Ошибка при получении данных профиля:', error.message);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});


// Обновление данных профиля
app.put('/profile', authenticateUser, async (req, res) => {
  const userId = req.user.userId; // Получаем идентификатор пользователя из JWT токена
  const updatedProfileData = req.body; // Получаем обновленные данные профиля из тела запроса

  try {
    // Проверяем наличие обновленных данных профиля в запросе
    if (!updatedProfileData) {
      return res.status(400).json({ message: 'Необходимо предоставить обновленные данные профиля' });
    }

    // Выполняем запрос к базе данных для обновления данных профиля
    const updateProfileQuery = `
      UPDATE users
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        phone_number = $4
        -- Добавьте остальные поля профиля здесь
      WHERE id = $5
    `;
    await pool.query(updateProfileQuery, [
      updatedProfileData.firstName,
      updatedProfileData.lastName,
      updatedProfileData.email,
      updatedProfileData.phoneNumber,
      // Передайте остальные поля профиля в соответствующем порядке
      userId
    ]);

    // Отправляем ответ об успешном обновлении данных профиля
    return res.status(200).json({ message: 'Данные профиля успешно обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении данных профиля:', error.message);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.post('/refresh-token', async (req, res) => {
  const refreshToken = req.headers.authorization;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Требуется обновить токен' });
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken.split(' ')[1], 'refreshSecret');
    const userId = decodedRefreshToken.userId;

    // Создаем новый токен
    const newAccessToken = jwt.sign({ userId }, 'secret', { expiresIn: '7d' });

    return res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error.message);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});


// Получение всех отправок для текущего пользователя
app.get('/shipments', authenticateUser, async (req, res) => {
  const userId = req.user.userId; // Получаем идентификатор пользователя из JWT токена

  try {
    console.log('Запрос на получение отправок для пользователя с ID:', userId);

    // Получаем все отправки для текущего пользователя из базы данных
    const userShipmentsQuery = 'SELECT * FROM shipments WHERE user_id = $1';
    const userShipments = await pool.query(userShipmentsQuery, [userId]);

    console.log('Отправки для пользователя с ID', userId, ':', userShipments.rows);

    return res.status(200).json(userShipments.rows);
  } catch (error) {
    console.error('Ошибка при получении отправок:', error.message);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});



app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
