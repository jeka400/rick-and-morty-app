import { useQuery } from 'react-query';
import { fetchMultipleCharacters } from '../services/queries/character';

export const useCharactersByIds = (ids: string[]) => {
  return useQuery(['characters', ids], () => fetchMultipleCharacters(ids), {
    enabled: ids.length > 0,
  });
};
