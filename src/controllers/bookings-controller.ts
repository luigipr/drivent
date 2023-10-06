import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getBooking } from '@/services/bookings-service';

export async function getUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const bookByUser = await getBooking(userId);

  return res.status(httpStatus.OK).send(bookByUser);
}
