import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserBooking } from '@/controllers';
import { createOrUpdateBookingSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', validateBody(createOrUpdateBookingSchema), postBooking)
  .put('/:bookingId', validateBody(createOrUpdateBookingSchema), updateBooking);

export { bookingsRouter };
