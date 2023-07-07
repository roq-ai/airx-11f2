import { PassengerInterface } from 'interfaces/passenger';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  passenger: PassengerInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  roq_user_id?: string;
  tenant_id?: string;
}
