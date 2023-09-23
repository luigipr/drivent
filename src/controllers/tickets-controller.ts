import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CreateTicket, ticketsService } from '@/services';
import { invalidDataError } from '@/errors';

export type CreateTicketParams = { ticketTypeId: number };

async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as CreateTicket;
  if (!ticketTypeId) throw invalidDataError('"ticket type not found');
  const { userId } = req;

  const ticket = await ticketsService.postTicket(ticketTypeId, userId);

  if (!ticket) throw invalidDataError('Error submitting ticket');

  return res.status(httpStatus.CREATED).send(ticket);
}

async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketsType();

  return res.status(httpStatus.OK).send(ticketTypes);
}
//await prisma.ticketType.findMany();

async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const userTickets = await ticketsService.getUserTicket(userId);
  res.status(httpStatus.OK).send(userTickets);
}

export const ticketsController = { getTicketsType, postTicket, getTickets };
