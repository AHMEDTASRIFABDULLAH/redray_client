import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosRole = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const adminRoleData = async ({ queryKey }) => {
  const [_, roleEmail, role] = queryKey;
  const { data } = await axiosRole.patch(
    `/users-roll/${roleEmail}?role=${role}`
  );
  return data;
};

const useAdminRole = (roleEmail, role) => {
  return useQuery({
    queryKey: ["adminrole", roleEmail, role],
    queryFn: adminRoleData,
  });
};

export default useAdminRole;
