import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Button from "@/components/Button/Button.component";
import { signOut } from "next-auth/react";

const Dropdown = ({ label, children }) => {
  return (
    <Menu>
      <div>
        <MenuButton>{label}</MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="bg-white p-5 z-50 rounded-lg origin-top-righttransition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            {children}
            {/* <Button label={"Odjava"} onClick={() => signOut()} /> */}
          </MenuItem>
        </MenuItems>
      </div>
    </Menu>
  );
};

export default Dropdown;
