import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoriteCount: number;

  // Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  if (!favorites) return [];

  try {
    const parsed: Hero[] = JSON.parse(favorites);
    const BASE_URL = import.meta.env.VITE_API_URL;

    // Normalizar la propiedad `image` para que use el `VITE_API_URL` actual.
    // Esto corrige favoritos guardados previamente que apuntaban al URL antiguo.
    return parsed.map((h) => {
      if (!h.image) return h;

      // Si la imagen ya es una URL absoluta, extraer el filename
      const parts = h.image.split("/");
      const filename = parts.length ? parts[parts.length - 1] : h.image;

      return {
        ...h,
        image: `${BASE_URL}/images/${filename}`,
      };
    });
  } catch (error) {
    return [];
  }
};

// Provider
export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }

    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    // Verifica si el héroe está en la lista de favoritos y devuelve un valor booleano.
    return favorites.some((h) => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
