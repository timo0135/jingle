import {Router} from "express";
import * as MusicController from "../controllers/musicController";

const router = Router();
router.post('/musics', MusicController.createMusic);

export default router;

