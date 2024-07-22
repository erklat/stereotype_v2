import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
} from "react";
import { Transition } from "@headlessui/react";

interface DropdownProps {
  trigger: ReactElement;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {trigger && (
        <div onClick={handleToggle} aria-haspopup="true" aria-expanded={isOpen}>
          {React.cloneElement(trigger)}
        </div>
      )}

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className="absolute left-0 origin-top-left rounded-xl border border-white/5 bg-gray-800 text-sm text-white p-4"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-menu"
        >
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default Dropdown;
