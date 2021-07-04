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

export const SuccessResponse = (res, success = true, msg = 'OK', data) => {
    const body = {
        message: msg,
        success,
        StatusCode: StatusCode.SUCCESS
    }
    if (data !== undefined) Object.assign(body, data)
    return res.status(ResponseStatus.SUCCESS).json(body)
}

export const NotFoundError = (res) => {
    return responseError(StatusCode.FAILURE, TypeErrors.NOTFOUND, ResponseStatus.NOT_FOUND, res)
}

export const AuthFailureError = (res, message = TypeErrors.UNAUTHORIZED) => {
    return responseError(StatusCode.FAILURE, message, ResponseStatus.UNAUTHORIZED, res)
}

export const BadRequestError = (res, message = TypeErrors.BAD_REQUEST) => {
    return responseError(StatusCode.FAILURE, message, ResponseStatus.BAD_REQUEST, res)
}

export const InternalError = (res) => {
    return responseError(StatusCode.FAILURE, TypeErrors.INTERNAL_ERROR, 500, res)
}

export const responseError = (code, type, statusCode, res) => {
    return res.status(statusCode).json({
        statusCode: code,
        message: type,
        success: false
    })
}
