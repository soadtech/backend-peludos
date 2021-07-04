import express from "express";
import colors from 'colors'
import Logger from "./helpers/Logger";
import { name, port } from "./config";

async function startServer () {
    const app = express()
    await require('./loaders').default(app)

    app.
        listen(port, () => {
            Logger.info(`${colors.yellow('########################################################')}
  🛡️  ${colors.green(`Server ${colors.blue(name)} listening on port:`)} ${colors.blue(port)} 🛡️
${colors.yellow('########################################################')}`)
        })
        .on('error', (e) => Logger.error('error in server.listen', e))
}

startServer()
    .then(() => Logger.info(colors.green('done ✌️')))
    .catch((error) => Logger.error(colors.red('error when starting the api'), error))
