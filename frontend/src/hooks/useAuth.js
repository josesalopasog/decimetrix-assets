//Packages ⬇️
import useSWR from "swr"; //For fetching data 
import axios from "axios"; //For http request 

// Fetch data from a given URL 
const fetchData = (url) => {
  axios
    .get(url, { withCredentials: true }) // GET request to the URL(backend), including credentials (JWT)
    .then((res) => res.data); //Extract and returns the response data
}

const useAuth = () => { //Custom hook to fetch user auth status
  const { data, error } = useSWR("http://localhost:5000/api/users/me", fetchData); // Uses SWR to fetch user data from the backend 

  return {
    user: data, // Stores the fetched user data
    isLoading: !error && !data, // Returns true if the request is still in progress
    isError: error, // Stores any error that occurs during the request
  };
};

export default useAuth;
