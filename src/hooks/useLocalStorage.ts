import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const getStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(`Error getting data from local storage: ${error}`);
      }
    };

    getStoredValue();
  }, [key]);

  const setValue = async (value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error(`Error setting data in local storage: ${error}`);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;