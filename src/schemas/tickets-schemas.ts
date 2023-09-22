import Joi from 'joi';
import { CreateTicketsParams } from '@/services/tickets-service';

export const createTicketsSchema = Joi.object<CreateTicketsParams>({
  ticketTypeId: Joi.number().required(),
});
