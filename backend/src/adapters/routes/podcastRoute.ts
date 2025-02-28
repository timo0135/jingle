import { Router } from 'express';
import * as PodcastController from "../controllers/podcastController";
import {authenticate} from "../middlewares/middlewares";

const router = Router();

router.get('/podcasts', PodcastController.getPodcasts);
router.get('/podcasts/:id', PodcastController.getPodcast);
router.get('/users/:id/podcasts', PodcastController.getPodcastByCreator);
router.post('/podcasts', authenticate, PodcastController.createPodcast);
router.put('/podcasts/:id', authenticate, PodcastController.updatePodcast);
router.delete('/podcasts/:id', authenticate, PodcastController.deletePodcast);
router.post('/podcasts/:id/avis', authenticate, PodcastController.createAvis);
router.get('/podcasts/:id/avis', PodcastController.getAvisByPodcast);
router.get('/avis/:id', PodcastController.getAvisById);
router.delete('/avis/:id', authenticate, PodcastController.deleteAvis);
router.put('/avis/:id', authenticate, PodcastController.updateAvis);
router.put('/users/:id/subscribers', authenticate, PodcastController.subscribeToBroadcaster);
router.delete('/users/:id/subscribers', authenticate, PodcastController.unsubscribeToBroadcaster);
router.patch('/users/:id/upgrade', authenticate, PodcastController.upgradeUserToBroadcaster);
router.patch('/users/:id/disupgrade', authenticate, PodcastController.disupgradeUserToBroadcaster);

export default router;
