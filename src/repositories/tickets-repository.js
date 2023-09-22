import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes(){
    const ticketTypes = await prisma.ticketTypes.findMany()
    return ticketTypes
}