"use client";

import { useAppSelector } from "@/state-management/hooks";
import { getUserData } from "@/utils/AuthManager/AuthManager.selectors";
import Dropdown from "@/components/Dropdown/Dropdown.component";

const HeaderActions = () => {
  const userData = useAppSelector(getUserData);

  return (
    <div>
      <Dropdown
        label={!!userData && `${userData.firstName} ${userData.lastName}`}
      />
    </div>
  );
};

export default HeaderActions;
