import colors from 'colors'
import expressLoader from './express'
import Logger from '../helpers/Logger'
// import mongooseLoader from './mongose'

export default async (expressApp) => {
    Logger.info(colors.blue('Loading configuration... 💻'))

    try {
        await expressLoader(expressApp)
        Logger.info(colors.green('Express loaded ✌️'))
    } catch (error) {
        Logger.error(colors.red('error loading Express'), error)
        throw error
    }
}
