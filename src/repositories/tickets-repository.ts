//import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
//import { CreateTicketForPost } from '@/services';

async function getTicketTypes() {
  const ticketTypes = await prisma.ticketType.findMany();
  return ticketTypes;
}

async function getUserTicket(id: number) {
  const userTicket = await prisma.ticket.findUnique({
    include: {
      TicketType: true,
    },
    where: {
      enrollmentId: id,
    },
  });
  return userTicket;
}

async function checkTicket(enrollmentId: number) {
  return await prisma.ticket.findUnique({
    include: {
      TicketType: true,
    },
    where: {
      enrollmentId,
    },
  });
}

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: { TicketType: true },
  });
}

export const ticketsRepository = { getUserTicket, getTicketTypes, checkTicket, postTicket };
