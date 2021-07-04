import { Response } from 'express'

export const StatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
}
export const TypeErrors = {
    TECNICO: 'Tecnico',
    NOTFOUND: 'Not Found',
    INTERNAL_ERROR: 'Internal error',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Authentication error',
    ECONNREFUSED: 'ECONNREFUSED',
    ECONNABORTED: 'ECONNABORTED',
    ECONNRESET: 'ECONNRESET'
}

export const ResponseStatus = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
}
export const SuccessResponse = (res, msg = 'OK', success = true, data = undefined) => {
    const body = {
        success,
        message: msg,
        StatusCode: StatusCode.SUCCESS
    }
    if (data !== undefined) Object.assign(body, data)
    return res.status(ResponseStatus.SUCCESS).json(body)
}
export const NotFoundError = (res) => {
    return responseError(StatusCode.TECNICO, TypeErrors.NOTFOUND, ResponseStatus.NOT_FOUND, res)
}

export const AuthFailureError = (res, message = TypeErrors.UNAUTHORIZED) => {
    return responseError(message, StatusCode.UNAUTHORIZED, res)
}

export const BadRequestError = (res, message = TypeErrors.BAD_REQUEST) => {
    return responseError(message, ResponseStatus.BAD_REQUEST, res)
}

export const InternalError = (res) => {
    return responseError(TypeErrors.INTERNAL_ERROR, ResponseStatus.INTERNAL_ERROR, res)
}

export const responseError = (type, statusCode, res) => {
    return res.status(statusCode).json({
        statusCode,
        message: type,
    })
}
