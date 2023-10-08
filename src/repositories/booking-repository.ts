import { prisma } from '@/config';

export async function getUserBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

export async function getRoomById(roomId: number) {
  return await prisma.room.findFirst({
    where: { id: roomId },
    include: { Booking: true },
  });
}

export async function findBookingsByRoomId(roomId: number) {
  return await prisma.booking.findMany({
    where: { roomId },
    include: { Room: true },
  });
}

export async function postBookingReservation(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
    include: { Room: true },
  });
}

export async function updateBookReservation(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: { id: bookingId },
    data: {
      roomId: roomId,
    },
    include: { Room: true },
  });
}

export const bookingRepository = {
  getUserBooking,
  postBookingReservation,
  updateBookReservation,
};
