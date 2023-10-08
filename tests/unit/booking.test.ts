import { Booking, Room } from '@prisma/client';
import faker from '@faker-js/faker';
import { createBooking, createRoom } from '../factories/bookings-factory';
import { bookingRepository } from '@/repositories';
import { getBooking } from '@/services';
import { init } from '@/app';

init();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /booking', () => {
  it('should return 404 when user doesnt have a booking', async () => {
    jest.spyOn(bookingRepository, 'getUserBooking').mockResolvedValueOnce(null);

    const promise = getBooking(99);
    expect(promise).rejects.toMatchObject({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});
