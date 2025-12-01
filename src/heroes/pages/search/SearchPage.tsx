import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        subtitle="Descubre, explora y administra tus superhéroes y villanos favoritos"
      />
      {/* Stats DashBoard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
