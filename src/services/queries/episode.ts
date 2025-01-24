import apiClient from '../client';

const fetchEpisode = async (id: number) => {
  try {
    const { data } = await apiClient.get(`/episode/${id}`);

    return data;
  } catch (error) {
    console.error(`Error fetching episode with ID ${id}:`, error);
    throw new Error(`Failed to fetch episode with ID ${id} `);
  }
};

export { fetchEpisode };
