import { InternalError, SuccessResponse, AuthFailureError, BadRequestError } from '../../../../../helpers/api.response'
import logger from '../../../../../helpers/Logger'

import UsersService from '../../../../../services/auth.service'

const usersService = UsersService.getInstance()

export default async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.findKeyByEmail(email)
        if (user === null) return SuccessResponse(res, false, 'User not register')

        // verify password
        const match = await usersService.comparePassword(password, user.pass)
        if (!match) return AuthFailureError(res)

        // Create token
        const token = usersService.signToken(user)

        return SuccessResponse(res, true, 'Login Successful', { data: { user, token } })
    } catch (error) {
        logger.error(error)
        return InternalError(res)
    }
}

export const singup = async (req, res) => {
    try {
        const { email, password, number, name } = req.body;
        const user = await usersService.findKeyByEmail(email)
        console.log(user);
        if (user !== null) return SuccessResponse(res, false, 'Ya existe un usuario con este correo electornico');

        await usersService.createUser(email, name, password, number)
        return SuccessResponse(res, true, 'Signup Successful')

    } catch (error) {
        return InternalError(res)
    }
}