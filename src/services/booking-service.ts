import { TicketStatus } from '@prisma/client';
import { forbiddenError, notFoundError } from '@/errors';
import {
  enrollmentRepository,
  findBookingsByRoomId,
  getRoomById,
  getUserBooking,
  postBookingReservation,
  ticketsRepository,
  updateBookReservation,
} from '@/repositories';

export async function getBooking(userId: number) {
  const booking = await getUserBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

export async function postBooking(roomId: number, userId: number) {
  if (!roomId) throw notFoundError();
  await businessRules(userId);
  await checkRoom(roomId);

  const reservation = await postBookingReservation(roomId, userId);
  if (!reservation) throw notFoundError();

  return reservation;
}

export async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const userBooking = await getUserBooking(userId);
  if (!userBooking) throw forbiddenError();

  checkRoom(roomId);

  const booking = await updateBookReservation(bookingId, roomId);

  return booking;
}

async function checkRoom(roomId: number) {
  const room = await getRoomById(roomId);
  if (!room) throw notFoundError();
  const bookings = await findBookingsByRoomId(roomId);
  if (room.capacity === bookings.length) throw forbiddenError();
}

async function businessRules(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  const type = ticket.TicketType;

  if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
    throw forbiddenError();
  }
}
