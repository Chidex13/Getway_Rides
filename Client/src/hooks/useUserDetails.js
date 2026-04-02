import { useState, useEffect } from "react";

const STORAGE_KEY = "getway_user_details";
const LAST_VISIT_KEY = "getway_last_visit";
const DAYS_TO_EXPIRE = 3;

export function useUserDetails() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [campus, setCampus] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if saved details have expired (3 days)
  const hasDetailsExpired = (savedAt) => {
    if (!savedAt) return true;
    
    try {
      const savedDate = new Date(savedAt);
      const currentDate = new Date();
      const daysDifference = (currentDate - savedDate) / (1000 * 60 * 60 * 24);
      return daysDifference >= DAYS_TO_EXPIRE;
    } catch (error) {
      console.error("Failed to calculate expiration:", error);
      return true;
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        
        // Check if details have expired
        if (hasDetailsExpired(data.savedAt)) {
          // Auto-clear expired details
          localStorage.removeItem(STORAGE_KEY);
          setFullName("");
          setPhone("");
          setCampus("");
        } else {
          // Load valid details
          setFullName(data.fullName || "");
          setPhone(data.phone || "");
          setCampus(data.campus || "");
        }
      }
      
      // Update last visit timestamp
      localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    } catch (error) {
      console.error("Failed to load user details from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever any field changes
  const saveDetails = (name, phoneNum, campusVal) => {
    try {
      const data = {
        fullName: name,
        phone: phoneNum,
        campus: campusVal,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    } catch (error) {
      console.error("Failed to save user details to localStorage:", error);
    }
  };

  // Clear all stored details (internal use only)
  const clearDetails = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFullName("");
      setPhone("");
      setCampus("");
    } catch (error) {
      console.error("Failed to clear user details:", error);
    }
  };

  return {
    fullName,
    setFullName,
    phone,
    setPhone,
    campus,
    setCampus,
    saveDetails,
    clearDetails,
    isLoaded
  };
}
