import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { flightValidationSchema } from 'validationSchema/flights';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.flight
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFlightById();
    case 'PUT':
      return updateFlightById();
    case 'DELETE':
      return deleteFlightById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFlightById() {
    const data = await prisma.flight.findFirst(convertQueryToPrismaUtil(req.query, 'flight'));
    return res.status(200).json(data);
  }

  async function updateFlightById() {
    await flightValidationSchema.validate(req.body);
    const data = await prisma.flight.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFlightById() {
    const data = await prisma.flight.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
