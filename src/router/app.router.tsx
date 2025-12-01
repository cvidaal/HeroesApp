import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

// LazyLoad -> Carga lenta de páginas
const searchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([
  // Usar la ruta con el layout. que sera la ruta padre.
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/heroes/1",
        element: <HeroPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ],
  },
]);
