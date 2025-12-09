import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHero = (page = 1, limit = 6, category = "all") => {
  return useQuery({
    // Tengo que mandar argumentos para que sean parte del query key y así diferenciar las peticiones y lo suyo es mandarlo como un objeto
    queryKey: ["heroes", { page, limit, category }], // Necesito un query key único por cada petición // {'page': page, 'limit': limit}
    queryFn: () => getHeroesByPageAction(+page, +limit!, category),
    staleTime: 1000 * 60 * 5, // 5 minutos. // Cuanto tiempo considera el resultado de la petición como fresca
  });
};
