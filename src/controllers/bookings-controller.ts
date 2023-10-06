import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getBooking, postBooking } from '@/services';

export async function getUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const bookByUser = await getBooking(userId);

  return res.status(httpStatus.OK).send(bookByUser);
}

export async function postUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  const booking = await postBooking(roomId, userId);

  return res.status(httpStatus.CREATED).send(booking);
}
