import { useQuery } from "@tanstack/react-query";
import { getHeroAction } from "../actions/get-hero.action";

export const useHero = (slug: string = "") => {
  return useQuery({
    queryKey: ["hero", slug],
    queryFn: () => getHeroAction(slug),
    retry: false,
  });
};
