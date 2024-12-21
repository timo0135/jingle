import {Router} from "express";
import * as PlaylistController from "../controllers/playlistController";


const router = Router();

router.get('/playlists', PlaylistController.getPlaylists);
router.get('/playlists/:id', PlaylistController.getPlaylist);
router.post('/users/:id/playlists', PlaylistController.createPlaylist);
router.delete('/playlists/:id', PlaylistController.deletePlaylist);
router.post('/playlists/:id/podcast', PlaylistController.addPodcastToPlaylist);
router.put('/playlists/:id', PlaylistController.updatePlaylist);
router.delete('/playlists/:id/podcast', PlaylistController.removePodcastToPlaylist);


export default router;
