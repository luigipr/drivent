import { prisma } from '@/config';

async function findHotels() {
  const result = await prisma.hotel.findMany();
  return result;
}

async function findHotelWithRooms(hotelId: number) {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
  return result;
}

export const hotelsRepository = {
  findHotels,
  findHotelWithRooms,
};
