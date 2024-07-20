import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Button from "@/components/Button/Button.component";
import { signOut } from "next-auth/react";

const Dropdown = ({ label }) => {
  return (
    <Menu>
      <MenuButton>{label}</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <Button label={"Odjava"} onClick={() => signOut()} />
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
