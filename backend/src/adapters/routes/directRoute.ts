import {Router} from "express";
import * as DirectController from "../controllers/directController";
import {authenticate} from "../middlewares/middlewares";


const router = Router();

router.get('/directs', DirectController.getDirects);
router.get('/directs/:id', DirectController.getDirect);
router.post('/directs', authenticate, DirectController.createDirect);
router.get('/users/:id/directs', DirectController.getDirectsByUser);
router.delete('/directs/:id', authenticate, DirectController.deleteDirect);
router.put('/directs/:id', authenticate, DirectController.updateDirect);
router.put('/directs/:id/guests', authenticate, DirectController.inviteGuest);
router.delete('/directs/:id/guests/', authenticate, DirectController.cancelGuest);
router.get('/direct', DirectController.getCurrentDirects);
export default router;
