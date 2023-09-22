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
  const ticketTypes: TicketType[] = ticketsService.getTicketsTypes();

  return ticketTypes; res.status(httpStatus.OK)
}
//await prisma.ticketType.findMany();

export const ticketsController = { getTicketsType, ticketPost }
