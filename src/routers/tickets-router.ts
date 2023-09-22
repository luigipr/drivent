import { Router } from 'express';

import { createTicketSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { ticketPost, ticketsTypesGet, ticketsGet } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.get('/ticket/types', ticketsTypesGet);
ticketsRouter.get('/tickets', ticketsGet);
ticketsRouter.post('/', validateBody(createTicketSchema), ticketPost);

export { ticketsRouter };
