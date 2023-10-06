import { notFoundError } from '@/errors';
import { getUserBooking } from '@/repositories';

export async function getBooking(userId: number) {
  const booking = await getUserBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}
