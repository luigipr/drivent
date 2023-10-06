import { forbiddenError, notFoundError } from '@/errors';
import { findBookingsByRoomId, getRoomById, getUserBooking, postBookingReservation } from '@/repositories';

export async function getBooking(userId: number) {
  const booking = await getUserBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

export async function postBooking(roomId: number, userId: number) {
  if (!roomId) throw notFoundError();

  const room = await getRoomById(roomId);
  if (!room) throw notFoundError();

  const bookings = await findBookingsByRoomId(roomId);
  if (room.capacity === bookings.length) throw forbiddenError('room is full');

  const reservation = await postBookingReservation(roomId, userId);
  if (!reservation) throw notFoundError();

  return reservation;
}
