require("dotenv").config();

export const port = process.env.PORT
// export const port = 3000
export const name = "API"
export const db = {
    database: process.env.DATABASE_PG || '',
    host: process.env.HOST_PG || '',
    user: process.env.USER_PG || '',
    password: process.env.PASSWORD_PG || '',
    port: process.env.PORT_PG || ''
}
export const api = {
    prefix: '/api/v1'
}
