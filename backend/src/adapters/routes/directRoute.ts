import {Router} from "express";
import * as DirectController from "../controllers/directController";


const router = Router();

router.get('/directs', DirectController.getDirects);
router.get('/directs/:id', DirectController.getDirect);
router.post('/directs', DirectController.createDirect);
router.get('/users/:id/directs', DirectController.getDirectsByUser);
router.delete('/directs/:id', DirectController.deleteDirect);
router.put('/directs/:id', DirectController.updateDirect);
router.put('/directs/:id/guests', DirectController.inviteGuest);
router.delete('/directs/:id/guests/', DirectController.cancelGuest);
export default router;
