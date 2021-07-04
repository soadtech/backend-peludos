import express from 'express'
import routes from "../api/routes/v1";
import { api } from "../config";
import cors from 'cors'
import morgan from 'morgan'
import { BadRequestError } from '../helpers/api.response';

export default async (app) => {
    app.use(cors())

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use((error, req, res, next) => {
        if (error instanceof SyntaxError) { //Handle SyntaxError here.
            return BadRequestError(res, 'Formato invalido')
        }
        next();
    })

    // db.once('open', () => { });
    app.use(morgan('dev'))
    app.use(api.prefix, routes())

    return app
}
