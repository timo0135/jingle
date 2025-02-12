import {Router} from "express";
import * as MusicController from "../controllers/musicController";

const router = Router();
router.post('/musics', MusicController.createMusic);
router.get('/musics/:id', MusicController.getMusic);
router.get('/musics', MusicController.getMusics);
router.get('/users/:id/musics', MusicController.getMusicsByUserId);

export default router;

