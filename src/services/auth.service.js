import colors from 'colors'
import jwt from 'jsonwebtoken'
import { secretKey } from '../config'
import UsersModel from '../models/auth.model'
import Logger from '../helpers/Logger';
import uuidv4 from '../helpers/uuid'

const usersModel = UsersModel.getInstance()
export default class UsersService {

    static instance

    static getInstance () {
        if (UsersService.instance === undefined) {
            UsersService.instance = new UsersService()
        }
        return UsersService.instance
    }

    createUser = async (email, name, password, number) => {
        try {
            const uuid = uuidv4()
            const data = {
                id: uuid,
                name,
                password,
                number,
                date: Date(),
                image: 'https://i.ibb.co/g3qbhkY/036-person.png'
            }
            const result = await usersModel.createUser(email, uuid, data)
            return result
        } catch (error) {
            Logger.error(colors.red('Error UsersService createUser '), error)
            throw new Error('ERROR TECNICO')
        }
    }

    findKeyByEmail = async (email) => {
        try {
            const result = await usersModel.findKeyByEmail(email)
            return result
        } catch (error) {
            Logger.error(colors.red('Error UsersService findKeyByEmail '), error)
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
