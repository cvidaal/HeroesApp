import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSummary = () => {
  // Creando un custom hook para reutilizar la lógica de obtener el summary information
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
