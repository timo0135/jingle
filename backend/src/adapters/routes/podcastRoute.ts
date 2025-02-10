import { Router } from 'express';
import * as PodcastController from "../controllers/podcastController";

const router = Router();

router.get('/podcasts', PodcastController.getPodcasts);
router.get('/podcasts/:id', PodcastController.getPodcast);
router.post('/podcasts', PodcastController.createPodcast);
router.put('/podcasts/:id', PodcastController.updatePodcast);
router.delete('/podcasts/:id', PodcastController.deletePodcast);
router.post('/podcasts/:id/avis', PodcastController.createAvis);
router.get('/podcasts/:id/avis', PodcastController.getAvisByPodcast);
router.get('/avis/:id', PodcastController.getAvisById);
router.delete('/avis/:id', PodcastController.deleteAvis);
router.put('/avis/:id', PodcastController.updateAvis);
router.put('/users/:id/subscribers', PodcastController.subscribeToBroadcaster);

export default router;
