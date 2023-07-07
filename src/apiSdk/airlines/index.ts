import axios from 'axios';
import queryString from 'query-string';
import { AirlineInterface, AirlineGetQueryInterface } from 'interfaces/airline';
import { GetQueryInterface } from '../../interfaces';

export const getAirlines = async (query?: AirlineGetQueryInterface) => {
  const response = await axios.get(`/api/airlines${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAirline = async (airline: AirlineInterface) => {
  const response = await axios.post('/api/airlines', airline);
  return response.data;
};

export const updateAirlineById = async (id: string, airline: AirlineInterface) => {
  const response = await axios.put(`/api/airlines/${id}`, airline);
  return response.data;
};

export const getAirlineById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/airlines/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAirlineById = async (id: string) => {
  const response = await axios.delete(`/api/airlines/${id}`);
  return response.data;
};
