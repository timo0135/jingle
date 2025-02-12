import {Router} from "express";
import * as MusicController from "../controllers/musicController";

const router = Router();
router.post('/musics', MusicController.createMusic);
router.get('/musics/:id', MusicController.getMusic);
router.get('/musics', MusicController.getMusics);
router.get('/users/:id/musics', MusicController.getMusicsByUserId);
router.put('/musics/:id', MusicController.updateMusic);
router.delete('/musics/:id', MusicController.deleteMusic);

export default router;

