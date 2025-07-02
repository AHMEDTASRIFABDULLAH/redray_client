import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define your axios instance
const axiosStatus = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchStatusData = async ({ queryKey }) => {
  const [_, statusId, status] = queryKey;
  const { data } = await axiosStatus.patch(
    `/all-status/${statusId}?status=${status}`
  );
  return data;
};

const useAxiosStatus = (statusId, status) => {
  return useQuery({
    queryKey: ["statusdata", statusId, status],
    queryFn: fetchStatusData,
  });
};

export default useAxiosStatus;
