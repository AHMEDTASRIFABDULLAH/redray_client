import axios from "axios";
import { useEffect, useState } from "react";

const useDistrict = () => {
  const [upazila, setUpazila] = useState([]);
  const [district, setDistrict] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upazilaResponse, districtResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/upazilla`),
          axios.get(`${import.meta.env.VITE_API_URL}/district`),
        ]);
        setUpazila(upazilaResponse.data);
        setDistrict(districtResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { district, upazila, loading };
};

export default useDistrict;
