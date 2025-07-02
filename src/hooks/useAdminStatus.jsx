import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const axiosAdminStatus = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const fetchStatusData = async ({ queryKey }) => {
  const [_, statusId, status] = queryKey;
  const { data } = await axiosAdminStatus.patch(
    `/users-status/${statusId}?status=${status}`
  );
  return data;
};
const useAdminStatus = (statusId, status) => {
  return useQuery({
    queryKey: ["statusdata", statusId, status],
    queryFn: fetchStatusData,
  });
};

export default useAdminStatus;
