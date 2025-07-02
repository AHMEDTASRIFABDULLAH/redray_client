import { BsFillHouseAddFill } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
import useAdmin from "../../../../hooks/useAdmin";
const SellerMenu = () => {
  const [isAdmin] = useAdmin();
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Create donation"
        address="create-donation-request"
      />

      {isAdmin === "admin" || isAdmin === "volunteer" ? (
        <MenuItem
          icon={MdOutlineManageHistory}
          label="Statistics"
          address="/dashboard"
        />
      ) : (
        " "
      )}
    </>
  );
};

export default SellerMenu;
