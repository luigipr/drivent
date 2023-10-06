import { prisma } from '@/config';

export async function getUserBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

export async function getRoomById(roomId: number) {
  return await prisma.room.findUnique({
    where: { id: roomId },
  });
}

export async function findBookingsByRoomId(roomId: number) {
  return await prisma.booking.findMany({
    where: { roomId },
  });
}

const currentDate = new Date();

export async function postBookingReservation(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
  });
}

export async function updateBookReservation(userId: number, roomId: number) {
  return await prisma.booking.update({
    where: { userId: userId },
    data: {
      updatedAt: currentDate,
      roomId: roomId,
    },
  });
}
