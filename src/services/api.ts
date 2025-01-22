import axios from "axios";
import { useQuery } from "react-query";
import { useInfiniteQuery } from "react-query";

const apiClient = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
});


const fetchCharacters = async ({ pageParam = 1 }) => {
    const { data } = await apiClient.get(`/character?page=${ pageParam }`);
    return data;
  };
  
export const useCharacters = () => {
    return useInfiniteQuery(
        "characters",
        fetchCharacters,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.info.next ? lastPage.info.next.split("=")[1] : undefined;
            },
            keepPreviousData: true,
        }
    );
};


const fetchCharacter = async (id: string) => {
    const response = await apiClient.get(`/character/${id}`);
    return response.data;
  };

export const useCharacter = (id: string) => {
    return useQuery(["character", id], () => fetchCharacter(id), {
      enabled: !!id,
    });
};


const fetchLocation = async (id: number) => {
    const { data } = await apiClient.get(`/location/${id}`);
    return data;
};

export const useLocation = (id: number) => {
    return useQuery(["location", id], () => fetchLocation(id));
};

const fetchMultipleCharacters = async (ids: string[]) => {
    const { data } = await apiClient.get(`/character/${ids.join(",")}`);
    return data;
};

export const useCharactersByIds = (ids: string[]) => {
    return useQuery(
        ["characters", ids],
        () => fetchMultipleCharacters(ids),
        { enabled: ids.length > 0 }
    );
};


const fetchEpisode = async (id: number) => {
    try {
        const { data } = await apiClient.get(`/episode/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching episode with ID ${id}:`, error);
        throw new Error(`Failed to fetch episode with ID ${id}`);
    }
};

export const useEpisode = (id: number) => {
    return useQuery(["episode", id], () => fetchEpisode(id), {
        enabled: !!id,
    });
};


export default apiClient;