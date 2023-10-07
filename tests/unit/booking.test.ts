import { bookingsRepository } from '@/repositories';
import { bookingsService } from '@/services/booking-service';
import { createBooking } from '../factories/bookings-factory';
import { Booking, Room } from '@prisma/client';
import faker from '@faker-js/faker';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /booking', () => {
  it('should return 404 when user doesnt have a booking', async () => {
    jest.spyOn(bookingsRepository, 'findBookings').mockResolvedValueOnce(null);

    const promise = bookingsService.getBookings(4);
    expect(promise).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});
