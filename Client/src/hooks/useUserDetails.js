import { useState, useEffect } from "react";

const STORAGE_KEY = "getway_user_details";

export function useUserDetails() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [campus, setCampus] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setFullName(data.fullName || "");
        setPhone(data.phone || "");
        setCampus(data.campus || "");
      }
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
    } catch (error) {
      console.error("Failed to save user details to localStorage:", error);
    }
  };

  // Clear all stored details
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
