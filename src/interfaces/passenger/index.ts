import { FlightInterface } from 'interfaces/flight';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PassengerInterface {
  id?: string;
  flight_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  flight?: FlightInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PassengerGetQueryInterface extends GetQueryInterface {
  id?: string;
  flight_id?: string;
  user_id?: string;
}
