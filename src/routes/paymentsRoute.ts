import express from "express";

import { Index, Store, getOne, Update, Destroy } from "../controllers/paymentsController";
import { verifyAuth } from "../middlewares/verifyauthMiddleware";

const router = express.Router();

router.get('/', verifyAuth, Index);

router.get('/:id', verifyAuth, getOne);

router.post('/', verifyAuth, Store);

router.put('/update/:id', verifyAuth, Update);

router.delete('/delete/:id', verifyAuth, Destroy);

export const paymentsRouter = router;
