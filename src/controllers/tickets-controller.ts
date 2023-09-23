import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services';

async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;

  const user = await ticketsService.createTicket({ ticketTypeId });

  return res.status(httpStatus.CREATED).json({
    id: user.id,
    email: user.email,
  });
}

async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketsType();

  return res.status(httpStatus.OK).send(ticketTypes);
}
//await prisma.ticketType.findMany();

async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;

  const userTickets = await ticketsService.getUserTicket(ticketTypeId);
  res.status(httpStatus.OK).send(userTickets);
}

export const ticketsController = { getTicketsType, postTicket, getTickets };
