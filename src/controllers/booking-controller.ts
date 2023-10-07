import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getBooking, postBooking, updateBooking } from '@/services';

export async function getUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const bookingByUser = await getBooking(userId);

  return res.status(httpStatus.OK).send(bookingByUser);
}

export async function postUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  const booking = await postBooking(roomId, userId);

  const answer = { bookingId: booking.id };

  return res.status(httpStatus.OK).send(answer);
}

export async function updateUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingId = parseInt(req.params.bookingId);
  const { roomId } = req.body;

  const bookingUpdated = await updateBooking(userId, bookingId, roomId);

  res.status(httpStatus.OK).send(bookingUpdated.id);
}
