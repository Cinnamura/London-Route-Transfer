# API Contract — LONDON ROUTE TRANSFERS

Базовый URL: `http://localhost:4000`

## Сущности

**Booking** — бронирование поездки. Хранит данные из формы + id, статус, дату создания.

Поля: `id` (uuid), `fullName`, `company?`, `phone`, `email`, `serviceType`, `pickupAddress`, `destinationAddress`, `pickupDate`, `pickupTime`, `passengersCount`, `meetAndGreet`, `additionalInfo?`, `createdAt`, `status`

Статусы: `pending` | `confirmed` | `completed` | `cancelled`

## Маршруты

| Метод | Путь | Описание |
|---|---|---|
| POST | `/api/bookings` | Создать бронирование |
| GET | `/api/bookings` | Список всех (опционально `?status=`) |
| GET | `/api/bookings/:id` | Одна запись |
| PATCH | `/api/bookings/:id/status` | Обновить статус |

## Формат ошибок

```json
{
  "message": "Booking not found",
  "error": "Not Found",
  "statusCode": 404
}
```

При валидации `message` — массив строк:
```json
{
  "message": ["email must be an email", "phone must be a string"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## CORS

Разрешены запросы с `http://localhost:3000`.

## Как подключен frontend

| Файл | Что делает |
|---|---|
| `book/page.tsx` | POST `/api/bookings` при отправке формы |
| `manager/page.tsx` | GET `/api/bookings` при загрузке, PATCH при смене статуса |
| `lib/api.ts` | обёртка над fetch с обработкой ошибок |

## Архитектурные решения

- **NestJS** — как рекомендовано в задании. Контроллеры, сервисы, DTO, ValidationPipe.
- **JSON-файл** (`data/bookings.json`) — простое хранение без БД.
- **Валидация** — отдельно на frontend (Zod) и на backend (class-validator).
- **UUID** — генерация id на backend.
- **MVP** — без авторизации, пагинации и конкурентного доступа.
