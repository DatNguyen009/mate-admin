import { getUserRole } from "helpers/erp_helper";
import { useEffect, useState } from "react";

export const useRoles = () => {
  const [roles, setRoles] = useState();

  useEffect(async () => {
    const userRole = await getUserRole();
    setRoles(userRole);
  }, []);

  return { roles };
};
