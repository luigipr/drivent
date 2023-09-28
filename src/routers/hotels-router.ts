import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelByhotelId, getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getHotelByhotelId);

export { hotelsRouter };
