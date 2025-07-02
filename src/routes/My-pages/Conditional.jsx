import useAdmin from "../../hooks/useAdmin";
import Statistics from "../../pages/Dashboard/Common/Statistics";
import ManageOrders from "../../pages/Dashboard/Seller/ManageOrders";

const Conditional = () => {
  const [isAdmin] = useAdmin();
  return (
    <div>
      {isAdmin === "admin" || isAdmin === "volunteer" ? (
        <Statistics />
      ) : (
        <ManageOrders />
      )}
    </div>
  );
};

export default Conditional;
