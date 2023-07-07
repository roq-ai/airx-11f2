import axios from 'axios';
import queryString from 'query-string';
import { PassengerInterface, PassengerGetQueryInterface } from 'interfaces/passenger';
import { GetQueryInterface } from '../../interfaces';

export const getPassengers = async (query?: PassengerGetQueryInterface) => {
  const response = await axios.get(`/api/passengers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPassenger = async (passenger: PassengerInterface) => {
  const response = await axios.post('/api/passengers', passenger);
  return response.data;
};

export const updatePassengerById = async (id: string, passenger: PassengerInterface) => {
  const response = await axios.put(`/api/passengers/${id}`, passenger);
  return response.data;
};

export const getPassengerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/passengers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePassengerById = async (id: string) => {
  const response = await axios.delete(`/api/passengers/${id}`);
  return response.data;
};
