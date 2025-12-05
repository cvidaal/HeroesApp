import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "heroes" | "villains"
  >("all");

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
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => setActiveTab("favorites")}
              className="flex items-center gap-2"
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setActiveTab("villains")}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los favoritos */}
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
          </TabsContent>
        </Tabs>

        {/* Character Cards Grid */}
        <HeroGrid />

        {/* Pagination */}
        <CustomPagination totalPages={8} />
      </>
    </>
  );
};
