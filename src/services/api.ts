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
    return useQuery(["location", id], async () => {
        const { data } = await apiClient.get(`/location/${id}`);
        return data;
    });
};

export const useEpisode = (id: number) => {
    return useQuery(["episode", id], async () => {
        const { data } = await apiClient.get(`/episode/${id}`);
        return data;
    });
};

export default apiClient;