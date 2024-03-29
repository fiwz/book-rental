# Book Rental App

Technical test for PT Eigen Tri Mathema

Author: Afiani Fauziah

## Installation

Please follow the instructions below:

1. Clone the repository
2. Create `.env` file from `.env.example`
3. Set the database environment in `.env`
4. Install the project

```bash
npm install
npx sequelize db:migrate
npx sequelize db:seed
```

5. Run application

Production mode
```bash
npm run start
```

Development mode:
```bash
npm run dev
```

## API Documentation

Available for local environtment

https://localhost:5001/docs

> You may need to adjust the hostname and port

# Test

```bash
npm run test
```

The test can only be run once

- I added the test case of penalized member
- You should change the date or member before run the test again
- or you can update the member's penalized date

# Soal Algoritma

The solutions from question 1-4 can be found in file `/soal-algoritma/soal1.js`