import apiClient from '../rmApi';

const fetchCharacters = async ({ pageParam = 1 }) => {
  const { data } = await apiClient.get(`/character?page=${pageParam}`);
  return data;
};

const fetchCharacter = async (id: string) => {
  const response = await apiClient.get(`/character/${id}`);
  return response.data;
};

const fetchMultipleCharacters = async (ids: string[]) => {
  const { data } = await apiClient.get(`/character/${ids.join(',')}`);
  return data;
};

export { fetchCharacters, fetchCharacter, fetchMultipleCharacters };
