import { Ticket, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import { ticketsRepository } from '@/repositories/tickets-repository';

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

export const ticketsService = { getTicketsType, getUserTicket };
