import { Router } from 'express'
const router = Router();

export default function () {
    router.get("/login", () => {
        console.log("Hola mundo")
    });
    // router.post("/singup", validator(schema.singup), authController.singup);
    return router;
};
