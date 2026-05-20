# 4 - Cоздание бэкенда на Express.js <!-- omit in toc -->

> Лабораторная работа 4 для студентов курса "Проектирование сетевых приложений" 4 семестра кафедры ИУ5 МГТУ им Н.Э. Баумана.

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Начало работы](#начало-работы)
- [Задание](#задание)
- [Указания по выполнению лабораторной работы](#указания-по-выполнению-лабораторной-работы)
    - [Требования к реализации](#требования-к-реализации)
    - [Структура проекта](#структура-проекта)
- [Пример программы](#пример-программы)
- [Результат работы](#результат-работы)

## Цель работы

Освоить создание бэкенд-сервера на платформе Node.js с использованием фреймворка Express.js для разработки REST API.

---

## Начало работы

Зайдите в свою локальную директорию с репозиторием для выполнения лабораторных работ. Заберите ветку с соответствующей лабораторной работой из общего репозитория:

```sh
git pull upstream
```

**или**

```sh
git pull upstream lab_4
```

Переключитесь на ветку с текущей лабораторной работой:

```sh
git checkout lab_4
```

Свяжите ветку локального репозитория с вашим удаленным репозиторием:

```sh
git push --set-upstream origin lab_4
```

## Задание

Реализация на Node.js собственного веб-сервиса для API, данные хранятся в json файле. Тестирование через Postman/Insomnia 5 методов: список с фильтрацией, получение одной записи, добавление, редактирование, удаление

---
## Указания по выполнению лабораторной работы
1. Работа выполняется индивидуально в соответствии с вариантом
2. Код должен быть организован по слоистой архитектуре (routes → controllers → services)
3. Все эндпоинты должны быть протестированы через Postman или аналогичный инструмент
4. Проект должен быть загружен на GitHub

---

## Требования к реализации
1. Проект должен быть написан на Node.js с использованием фреймворка Express.js
2. Код должен быть организован по слоистой архитектуре (routes → controllers → services)
3. Все зависимости должны быть указаны в package.json
4. Код должен быть чистым, читаемым и сопровождаемым
5. Должна быть корректная обработка ошибок (try-catch, статус-коды)

---

## Структура проекта

![Фото 1](assets/image.png)

---
## Пример программы

Запуск сервера

```javascript
const express = require('express');
const cors = require('cors');
const stocksRouter = require('./routes/stocks');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());      // парсинг JSON
app.use('/stocks', stocksRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
```
Чтение/запись файлов

```javascript
const readData = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};
```

Контроллер 

```javascript
const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const createStock = (req, res) => {
    const { src, title, text } = req.body;
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    const newStock = stocksService.create({ src, title, text });
    res.status(201).json(newStock);
};
```
Маршруты 

```javascript
const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

// GET /stocks - получить все карточки (с фильтрацией по title)
router.get('/', stocksController.getAllStocks);

// GET /stocks/:id - получить одну карточку по ID
router.get('/:id', stocksController.getStockById);

// POST /stocks - создать новую карточку
router.post('/', stocksController.createStock);

// PATCH /stocks/:id - обновить карточку
router.patch('/:id', stocksController.updateStock);

// DELETE /stocks/:id - удалить карточку
router.delete('/:id', stocksController.deleteStock);

module.exports = router;
```
---

## Результат работы

![Фото 2](imahe2.png)
![Фото 3](image3.png)

---