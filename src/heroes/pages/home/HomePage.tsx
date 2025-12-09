import { useSearchParams } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { TabsContent } from "@radix-ui/react-tabs";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { use, useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  // Obtener los parametros de búsqueda de la URL ? page=2 etc
  const [searchParams, setSearchParams] = useSearchParams();

  const { favorites, favoriteCount } = use(FavoriteHeroContext);

  //! SEARCH PARAMS
  // Obtenemos el tab de los parametros www.midominio.com?tab=favorites
  const activeTabParam = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1"; // Por defecto la página 1 siempre string.
  const limit = searchParams.get("limit") ?? "6"; // Por defecto 6 items por página
  const category = searchParams.get("category") ?? "all";

  // Sirve para validar que el tab sea uno de los permitidos y si no es así, establecer "all" como valor por defecto
  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTabParam) ? activeTabParam : "all";
  }, [activeTabParam]);

  //! Uso de tanstack query
  // Heroes by Page
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  // Summary information con un custom hook
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          subtitle="Descubre, explora y administra tus superhéroes y villanos favoritos"
        />

        {/* Breadcrumbs */}
        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");
                  return prev.toString();
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev.toString();
                })
              }
              className="flex items-center gap-2"
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");

                  return prev.toString();
                })
              }
            >
              Heroes ({summary?.heroCount ?? 0})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");

                  return prev.toString();
                })
              }
            >
              Villains ({summary?.villainCount ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />
            {/* Mostrar todos los favoritos */}
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {selectedTab !== "favorites" && (
          <CustomPagination totalPages={heroesResponse?.pages} />
        )}
      </>
    </>
  );
};
