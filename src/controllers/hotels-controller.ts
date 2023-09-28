import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';

async function findHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  await hotelsService.checkUser(userId);

  const hotels = await hotelsService.findHotels();

  return res.status(httpStatus.OK).send(hotels);
}

async function findHotelWithRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  await hotelsService.checkUser(userId);

  const hotelWithRooms = hotelsService.findHotelWithRooms(hotelId);

  return res.status(httpStatus.OK).send(hotelWithRooms);
}

export const hotelsController = {
  findHotels,
  findHotelWithRooms,
};
