import { Router } from 'express';

import { createTicketSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { ticketsController } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.get('/ticket/types', ticketsController.getTicketsType);
ticketsRouter.get('/tickets', ticketsController.getTickets);
ticketsRouter.post('/', validateBody(createTicketSchema), ticketsController.postTicket);

export { ticketsRouter };
