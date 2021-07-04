import { Router } from 'express'

import jwt from 'jsonwebtoken'
import { secretKey } from '../../config'
// import { decodeInfo } from '../../helpers'
import { AuthFailureError } from '../../helpers/api.response'
import Logger from '../../helpers/Logger'
import schema from './schema'
import validator, { ValidationSource } from './validator'

const router = Router()
const auth = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    const [, token] = authHeader.split(' ')
    try {
        const payload = jwt.verify(token, secretKey)
        req.body.session = payload

        next()
    } catch (error) {
        if (String(error).includes('invalid token')) return AuthFailureError(res, 'Token is not valid')
        if (String(error).includes('jwt expired')) return AuthFailureError(res, 'Token is expired')
        Logger.error(error)
        return AuthFailureError(res)
    }
}

router.use('/', validator(schema.headers, ValidationSource.HEADER), auth)

export default router
