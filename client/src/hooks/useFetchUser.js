import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const isAuthenticated = cookies.isAuthenticated === "true";

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((user) => {
          setUser(user);
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  return user;
};

export default useFetchUser;
