import { TicketStatus } from '@prisma/client';
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import { enrollmentRepository, hotelsRepository, ticketsRepository } from '@/repositories';
import { paymentRequiredError } from '@/errors/payment-required-error';

async function checkUser(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (
    ticket.status !== TicketStatus.PAID ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false
  )
    throw paymentRequiredError();
}

async function findHotels() {
  const hotels = hotelsRepository.findHotels();
  return hotels;
}

async function findHotelWithRooms(hotelId: number) {
  const hotelWithRooms = hotelsRepository.findHotelWithRooms(hotelId);
  return hotelWithRooms;
}

export const hotelsService = {
  checkUser,
  findHotels,
  findHotelWithRooms,
};
