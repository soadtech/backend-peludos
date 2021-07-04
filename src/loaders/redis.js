import colors from 'colors'
import Logger from '../helpers/Logger'
import { createClient } from 'then-redis'
import { db } from '../config'

const client = createClient({
    port: db.port,
    host: db.host,
    password: db.password,
});
client.select(process.env.REDIS_DATABASE)
client.on('error', (err) => {
    Logger.error("Ha ocurrido un error", err)
})
client.on('ready', () => {
    Logger.info(`${colors.magenta('[  DB  ]')} *** Conectada`)
})

export default client
