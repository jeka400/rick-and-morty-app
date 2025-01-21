import axios from "axios";
import { useQuery } from "react-query";

const apiClient = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
});


const fetchCharacters = async (page: number) => {
    const { data } = await apiClient.get(`/character?page=${page}`);
    return data;
  };
  
export const useCharacters = (page: number) => {
    return useQuery(["characters", page], () => fetchCharacters(page), {
        keepPreviousData: true, 
    });
};

export const useCharacter = (id: string | undefined) => {
    return useQuery(["character", id], async () => {
        if (!id) throw new Error("No ID provided");

        const { data } = await apiClient.get(`/character/${id}`);
        return data;
      },
      {
        enabled: !!id,
      }
    );
};

export const useLocation = (id: number) => {
    return useQuery(["location", id]), async () => {
        const { data } = await apiClient.get(`/location/${id}`);
        return data;
    }
}

export const useEpisode = (id: number) => {
    return useQuery(["episode", id]), async () => {
        const { data } = await apiClient.get(`/episode/${id}`);
        return data;
    }
}


export default apiClient;