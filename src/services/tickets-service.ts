import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { ticketsRepository } from '@/repositories';

export type CreateTicket = Omit<Ticket, 'id'>;
export type CreateTicketForPost = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketsType(): Promise<TicketType[]> {
  const tickets = await ticketsRepository.getTicketTypes();
  return tickets;
}

async function getUserTicket(id: number) {
  const enrollment = await ticketsRepository.checkEnrollment(id);
  if (!enrollment) throw notFoundError();
  const Ticket = await ticketsRepository.checkTicket(enrollment.id);
  if (!Ticket) throw notFoundError();
  const userTicket = await ticketsRepository.getUserTicket(id);
  return userTicket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await ticketsRepository.checkEnrollment(userId);
  if (!enrollment) throw invalidDataError('no enrollments found');

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.postTicket(ticketData);

  const ticket = await ticketsRepository.checkTicket(enrollment.id);
  console.log('ticket', ticket);
  return ticket;
}

export const ticketsService = { getTicketsType, getUserTicket, postTicket };
