import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    },
  });
}

export async function createRoom(hotelId: number, capacity: number) {
  return prisma.room.create({
    data: {
      name: String(faker.datatype.number()),
      capacity: capacity,
      hotelId: hotelId,
    },
  });
}
