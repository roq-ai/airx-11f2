import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { passengerValidationSchema } from 'validationSchema/passengers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.passenger
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPassengerById();
    case 'PUT':
      return updatePassengerById();
    case 'DELETE':
      return deletePassengerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPassengerById() {
    const data = await prisma.passenger.findFirst(convertQueryToPrismaUtil(req.query, 'passenger'));
    return res.status(200).json(data);
  }

  async function updatePassengerById() {
    await passengerValidationSchema.validate(req.body);
    const data = await prisma.passenger.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePassengerById() {
    const data = await prisma.passenger.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
