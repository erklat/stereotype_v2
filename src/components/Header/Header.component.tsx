import Logo from "@/components/Logo/Logo.component";
import HeaderActions from "@/components/Header/components/HeaderActions/HeaderActions.components";
import { Container } from "@/components/Layout/Layout.component";

const Header = () => {
  return (
    <header className="flex">
      <Container>
        <div className="h-20 flex items-center justify-between">
          <Logo />
          {/* <Menu /> */}
          <HeaderActions />
        </div>
      </Container>
    </header>
  );
};

export default Header;
