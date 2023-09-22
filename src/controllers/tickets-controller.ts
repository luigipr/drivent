import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ticketsService } from '@/services';
import { TicketType } from '@prisma/client';

async function ticketPost(req: Request, res: Response) {
  const { ticketTypeId } = req.body;

  const user = await ticketsService.createTicket({ ticketTypeId });

  return res.status(httpStatus.CREATED).json({
    id: user.id,
    email: user.email,
  });
}

async function getTicketsType(req: Request, res: Response) {
  const ticketTypes: TicketType[] = await ticketsService.getTicketsTypes();

  return res.status(httpStatus.OK).send(ticketTypes);
}
//await prisma.ticketType.findMany();

async function getTickets(req: Request, res: Response) {
  const { token } = req.headers;

  const userTickets = await ticketsService.getUserTickets();
  res.status(httpStatus.OK).send(userTickets);
}

export const ticketsController = { getTicketsType, ticketPost, getTickets };
