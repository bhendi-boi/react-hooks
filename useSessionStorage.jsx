import { useState, useEffect } from "react";

// a hook which work same as use state but also stores state in session storage
// props:  key : key which you pass in setting the session storage
//               use signIndata for storing data state which is in signIn page
//         initial value : initial value which you want to set (same as useState)

const useSessionStorageState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const getSavedValue = (key, initialValue) => {
  const savedValue = JSON.parse(sessionStorage.getItem(key));
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

export default useSessionStorageState;
