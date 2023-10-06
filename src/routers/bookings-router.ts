import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserBooking, postUserBooking } from '@/controllers';
import { createOrUpdateBookingSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', validateBody(createOrUpdateBookingSchema), postUserBooking)
  .put('/:bookingId', validateBody(createOrUpdateBookingSchema), updateUserBooking);

export { bookingsRouter };
