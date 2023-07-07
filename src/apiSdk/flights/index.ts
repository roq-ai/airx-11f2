import axios from 'axios';
import queryString from 'query-string';
import { FlightInterface, FlightGetQueryInterface } from 'interfaces/flight';
import { GetQueryInterface } from '../../interfaces';

export const getFlights = async (query?: FlightGetQueryInterface) => {
  const response = await axios.get(`/api/flights${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFlight = async (flight: FlightInterface) => {
  const response = await axios.post('/api/flights', flight);
  return response.data;
};

export const updateFlightById = async (id: string, flight: FlightInterface) => {
  const response = await axios.put(`/api/flights/${id}`, flight);
  return response.data;
};

export const getFlightById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/flights/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFlightById = async (id: string) => {
  const response = await axios.delete(`/api/flights/${id}`);
  return response.data;
};
