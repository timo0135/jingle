import {Router} from "express";
import * as FileController from "../controllers/fileController";

const router = Router();
router.get('/assets/:id', FileController.getFiles);

export default router;
