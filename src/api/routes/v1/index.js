import { Router } from 'express'
import authRoutes from './auth'
const router = Router();

export default function () {
    router.use("/auth", authRoutes());
    return router;
};
