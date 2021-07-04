require("dotenv").config();

export const port = process.env.PORT
// export const port = 3000
export const name = "API"
export const db = {
    host: process.env.HOST_RD || '',
    password: process.env.PASSWORD_RD || '',
    port: process.env.PORT_RD || ''
}
export const api = {
    prefix: '/api/v1'
}
