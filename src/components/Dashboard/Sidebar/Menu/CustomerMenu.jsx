import { BsFingerprint } from "react-icons/bs";
import MenuItem from "./MenuItem";
import useAdmin from "../../../../hooks/useAdmin";
const CustomerMenu = () => {
  const [isAdmin] = useAdmin();
  console.log("my-request", isAdmin);
  return (
    <>
      {isAdmin === "admin" || isAdmin === "volunteer" ? (
        " "
      ) : (
        <MenuItem
          icon={BsFingerprint}
          label="My Requenst"
          address="/dashboard/my-request"
        />
      )}
    </>
  );
};

export default CustomerMenu;
