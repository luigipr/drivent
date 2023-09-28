import { Router } from 'express';
import { ticketSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketTypes, createTicket, getTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/types', getTicketTypes);
ticketsRouter.get('/', getTicket);
ticketsRouter.post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
