import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import FilterPopOver from "./FilterPopOver";

function Header(props: { plantNames: string[] }) {
  return (
    <Navbar maxWidth={"xl"}>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem className="text-sm text-foreground">
          <h1>Next update in 01:00</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="text-2xl bg-gradient-to-r from-primary via-pink-500 to-danger bg-clip-text text-transparent">
          <h1>PlantMonitoring</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <FilterPopOver plantNames={props.plantNames} />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
