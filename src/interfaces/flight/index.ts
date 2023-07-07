import { PassengerInterface } from 'interfaces/passenger';
import { AirlineInterface } from 'interfaces/airline';
import { GetQueryInterface } from 'interfaces';

export interface FlightInterface {
  id?: string;
  status: string;
  airline_id?: string;
  created_at?: any;
  updated_at?: any;
  passenger?: PassengerInterface[];
  airline?: AirlineInterface;
  _count?: {
    passenger?: number;
  };
}

export interface FlightGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  airline_id?: string;
}
