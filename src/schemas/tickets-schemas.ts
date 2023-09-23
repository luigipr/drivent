import Joi from 'joi';
import { CreateTicket } from '@/services';

export const createTicketsSchema = Joi.object<CreateTicket>({
  ticketTypeId: Joi.number().required(),
});
