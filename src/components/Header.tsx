import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import FilterPopOver from "./FilterPopOver";
import { QueryParams } from "../types/global";
import { useAuth } from "../context/AuthContext.tsx";

interface HeaderProps {
  plantNames: string[];
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams | null>>;
  currentPlant: string;
  isLoadingPlantNames: boolean;
}

function Header(props: HeaderProps) {
  const { logout } = useAuth();

  return (
    <Navbar maxWidth={"xl"}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="text-2xl bg-gradient-to-r from-primary via-pink-500 to-danger bg-clip-text text-transparent">
          <h1>{props.currentPlant != "" ? props.currentPlant : "PlantMonitoring"}</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <FilterPopOver
            plantNames={props.plantNames}
            setQueryParams={props.setQueryParams}
            isLoadingPlantNames={props.isLoadingPlantNames}
          />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="flat" onClick={logout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
