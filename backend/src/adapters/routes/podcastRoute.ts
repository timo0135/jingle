import { Router } from 'express';
import * as PodcastController from "../controllers/podcastController";

const router = Router();

router.get('/podcasts', PodcastController.getPodcasts);
router.get('/podcasts/:id', PodcastController.getPodcast);
router.post('/podcasts', PodcastController.createPodcast);
router.put('/podcasts/:id', PodcastController.updatePodcast);
router.delete('/podcasts/:id', PodcastController.deletePodcast);

export default router;
