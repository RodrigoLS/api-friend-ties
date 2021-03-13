export default {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": 3307,
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "entities": [
        "./src/models/**.ts"
    ],
    "migrations": [
        "./src/database/migrations/**.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}