import useSWR from "swr"; // for data fetching
import api from "../api/axios";

const fetcher = async (url) => {
  try { 
    const res = await api.get(url); // Fetch the user data from the API
    return res.data; // Return the user data
  } catch (err) {
    if (err.response && err.response.status === 401) { // If the error is 401 (Unauthorized), return null
      return null; 
    }
    throw err; // For other errors, throw the error to be handled by SWR
  }
};

const useAuth = () => {
  const { data, error } = useSWR( 
    "/users/me", // Fetch the user data from the API
    fetcher, // The fetcher function to fetch the user data
    { 
      revalidateOnFocus: false, // Don't revalidate when the window is focused
      dedupingInterval: 3000, // Deduplicate requests for 3 seconds
    }
  ); //This is for fetching the user data and updating the header

  return {
    user: data,
    isLoading: !error && !data,
    isError: error && error.response?.status !== 401,
  };
};

export default useAuth;
