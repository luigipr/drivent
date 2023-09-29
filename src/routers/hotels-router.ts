import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { hotelsController } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', hotelsController.findHotels)
  .get('/:hotelId', hotelsController.findHotelWithRooms);

export { hotelsRouter };
