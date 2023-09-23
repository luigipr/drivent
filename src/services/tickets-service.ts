import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

export type CreateTicketParams = { ticketTypeId: number };
export type CreateTicket = Omit<Ticket, 'id'>;
export type CreateTicketForPost = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketsType(): Promise<TicketType[]> {
  const tickets = await ticketsRepository.getTicketTypes();
  return tickets;
}

async function getUserTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const userTicket = await ticketsRepository.getUserTicket(enrollment.id);
  if (!userTicket) throw notFoundError();
  return userTicket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await ticketsRepository.checkEnrollment(userId);
  //if (!enrollment) throw invalidDataError('no enrollments found');
  if (!enrollment) throw notFoundError();

  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!userEnrollment) throw notFoundError();

  return await ticketsRepository.postTicket(userId, ticketTypeId);
}

export const ticketsService = { getTicketsType, getUserTicket, postTicket };
