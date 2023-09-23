import { Router } from 'express';
import { createTicketsSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketsController } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/tickets/*', authenticateToken);
ticketsRouter.get('/ticket/types', ticketsController.getTicketsType);
ticketsRouter.get('/tickets', ticketsController.getTickets);
ticketsRouter.post('/tickets', validateBody(createTicketsSchema), ticketsController.postTicket);

export { ticketsRouter };
