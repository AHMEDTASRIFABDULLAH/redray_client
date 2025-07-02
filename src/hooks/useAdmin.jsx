import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [isAdmin?.role];
};

export default useAdmin;
