import colors from 'colors'
import jwt from 'jsonwebtoken'
import { secretKey } from '../../config'
import UsersModel from '../../models/auth/user.models'
import Logger from '../../helpers/Logger'

const usersModel = UsersModel.getInstance()
export default class UsersService {

    static instance

    static getInstance () {
        if (UsersService.instance === undefined) {
            UsersService.instance = new UsersService()
        }
        return UsersService.instance
    }

    findByEmail = async (email) => {
        try {
            const result = await usersModel.findByEmail(email)
            return JSON.parse(result)
        } catch (error) {
            Logger.error(colors.red('Error UsersService findByEmail '), error)
            throw new Error('ERROR TECNICO')
        }
    }

    comparePassword = async (confirmPassword, password) => {
        console.log(confirmPassword, password)
        try {
            return confirmPassword === password
        } catch (e) {
            Logger.error(colors.red('Error comparePassword '), e)
            throw e
        }
    }

    signToken = (data) => {
        return jwt.sign(data, secretKey, { expiresIn: '12h' })
    }

    verifyToken = (token) => {
        return jwt.verify(token, secretKey)
    }
}
