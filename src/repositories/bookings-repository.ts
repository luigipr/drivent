import { prisma } from '@/config';

export async function getUserBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}
