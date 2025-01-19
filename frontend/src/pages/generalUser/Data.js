import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getMonthlyJoined = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/members/monthly-member`,
      { withCredentials: true },
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const threeDayExpire = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/members/within-3-days-expiring`,
      { withCredentials: true },
    );
  
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const fourToSevenDaysExpire = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/members/within-4-7-expiring`,
      { withCredentials: true },
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const expired = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/members/expired-member`,
      { withCredentials: true },
    );
   
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const inActiveMembers = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/members/inactive-member`,
      { withCredentials: true },
    );
    
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
