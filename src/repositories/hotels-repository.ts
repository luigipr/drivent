import { prisma } from '@/config';
import { notFoundError } from '@/errors';

async function findHotels() {
  const result = await prisma.hotel.findMany();
  return result;
}

async function findHotelById(hotelId: number) {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
  if (!result) throw notFoundError();
  return result;
}

export const hotelsRepository = {
  findHotels,
  findHotelById,
};
