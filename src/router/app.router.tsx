import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

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
        // el SLUG es un parámetro dinámico que representa el identificador único del héroe en la URL.
        path: "/heroes/:slug",
        element: <HeroPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
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
