import { Router } from 'express';
import { createTicketsSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketsController } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/types', ticketsController.getTicketsType);
ticketsRouter.get('/', ticketsController.getTickets);
ticketsRouter.post('/', validateBody(createTicketsSchema), ticketsController.postTicket);

export { ticketsRouter };
