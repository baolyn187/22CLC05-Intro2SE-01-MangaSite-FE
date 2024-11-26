import axiosInstance from "./axiosInstance";

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/endpoint"); // Replace with your endpoint
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
