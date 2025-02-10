import {Router} from "express";
import * as PlaylistController from "../controllers/playlistController";
import {authenticate} from "../middlewares/middlewares";


const router = Router();

router.get('/playlists', PlaylistController.getPlaylists);
router.get('/playlists/:id', PlaylistController.getPlaylist);
router.post('/users/:id/playlists', authenticate, PlaylistController.createPlaylist);
router.delete('/playlists/:id', authenticate, PlaylistController.deletePlaylist);
router.post('/playlists/:id/podcast', authenticate, PlaylistController.addPodcastToPlaylist);
router.put('/playlists/:id', authenticate, PlaylistController.updatePlaylist);
router.delete('/playlists/:id/podcast', authenticate, PlaylistController.removePodcastToPlaylist);
router.get('/users/:id/playlists', PlaylistController.getPlaylistByUser);


export default router;
