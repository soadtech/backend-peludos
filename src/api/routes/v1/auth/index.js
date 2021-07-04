import { Router } from 'express';
import validator from '../../../middleware/validator';
import auth, { singup } from './access/index';
import schema from './access/schema'
const router = Router();

export default function () {
    router.post("/login", validator(schema.login), auth);
    router.post("/singup", validator(schema.singup), singup);
    return router;
};
