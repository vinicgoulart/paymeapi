import express from "express";

import { Index, Store, getOne, Update, Destroy } from "../controllers/paymentsController";
import { ValidateStore, ValidateUpdate } from "../validations/paymentsValidation";
import { verifyAuth } from "../middlewares/verifyauthMiddleware";

const router = express.Router();

router.get('/', verifyAuth, Index);

router.get('/:id', verifyAuth, getOne);

router.post('/', verifyAuth, ValidateStore, Store);

router.put('/update/:id', verifyAuth, ValidateUpdate, Update);

router.delete('/delete/:id', verifyAuth, Destroy);

export const paymentsRouter = router;
