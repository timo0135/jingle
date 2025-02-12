import {Router} from "express";
import * as MusicController from "../controllers/musicController";
import {authenticate} from "../middlewares/middlewares";

const router = Router();
router.post('/musics', authenticate, MusicController.createMusic);
router.get('/musics/:id', authenticate, MusicController.getMusic);
router.get('/musics', authenticate, MusicController.getMusics);
router.get('/users/:id/musics', authenticate, MusicController.getMusicsByUserId);
router.put('/musics/:id', authenticate, MusicController.updateMusic);
router.delete('/musics/:id', authenticate, MusicController.deleteMusic);

export default router;

