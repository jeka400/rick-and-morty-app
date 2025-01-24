import apiClient from '../client';

const fetchLocation = async (id: number) => {
  const { data } = await apiClient.get(`/location/${id}`);
  return data;
};

export { fetchLocation };
