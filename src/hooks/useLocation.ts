import { useQuery } from 'react-query';
import { fetchLocation } from '../services/queries/location';

export const useLocation = (id: number) => {
  return useQuery(['location', id], () => fetchLocation(id));
};
