import Joi from 'joi';

export const createOrUpdateBookingSchema = Joi.object({
  roomId: Joi.number().required(),
});
