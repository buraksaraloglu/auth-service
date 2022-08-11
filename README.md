# Auth Service

Authentication service with jwt tokens.

### Dependencies

[NodeJS](https://nodejs.org/en/)
[MongoDB](https://www.mongodb.com/)

### Installation

```bash
git clone https://github.com/buraksaraloglu/auth-service.git
cd auth-service
npm install
```

### Development

```bash
npm dev
```

### Deployment

```bash
npm run build
```

### Usage

```bash
npm start
```

### Testing

```bash
npm test
```

## Example Requests

**Create User** _(Register)_

```bash
# POST /auth/users

curl --location --request POST '<service-uri>/auth/users' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "12345678"
  }'
```

**Create Session** _(Login)_

```bash
# POST /sessions

curl --location --request POST '<service-uri>/sessions' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "test@example.com",
    "password": "12345678"
  }'
```

**Get Session** _(Authorize)_

```bash
# GET /sessions

curl --location --request GET 'http://localhost:5000/sessions' \
  --header 'x-refresh: <refreshToken in create session response>' \
  --header 'Authorization: Bearer <accessToken in create session response>'
```

**Delete Session** _(Sign out)_

```bash
# DELETE /sessions

curl --location --request DELETE 'http://localhost:5000/sessions' \
  --header 'x-refresh: <refreshToken in create session response>' \
  --header 'Authorization: Bearer <accessToken in create session response>'
```
