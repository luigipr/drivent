import { notFoundError } from '@/errors';
import { enrollmentRepository, hotelsRepository, ticketsRepository } from '@/repositories';
import { paymentRequiredError } from '@/errors/payment-required-error';

async function checkUser(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false)
    throw paymentRequiredError();
}

async function findHotels() {
  const hotels = await hotelsRepository.findHotels();
  if (!hotels || hotels.length === 0) throw notFoundError();
  return hotels;
}

async function findHotelById(hotelId: number) {
  const hotelWithRooms = await hotelsRepository.findHotelById(hotelId);
  return hotelWithRooms;
}

export const hotelsService = {
  checkUser,
  findHotels,
  findHotelById,
};
