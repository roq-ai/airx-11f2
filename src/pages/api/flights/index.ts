import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { flightValidationSchema } from 'validationSchema/flights';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFlights();
    case 'POST':
      return createFlight();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFlights() {
    const data = await prisma.flight
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'flight'));
    return res.status(200).json(data);
  }

  async function createFlight() {
    await flightValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.passenger?.length > 0) {
      const create_passenger = body.passenger;
      body.passenger = {
        create: create_passenger,
      };
    } else {
      delete body.passenger;
    }
    const data = await prisma.flight.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
