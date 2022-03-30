import { useEffect, useState } from "react";

export default function AuthenticatedApp() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  function handleFetchCalendar() {
    console.log("handle fetch calendare running");
    setIsFetching(true);
    fetch("/calendar/list")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error)
      .finally(() => setIsFetching(false));
  }

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch(console.error);
  }, []);
  console.log(user, "tkjahdflkjas");
  return (
    <div>
      <a
        style={{
          display: "inline-block",
          backgroundColor: "green",
          color: "white",
          textDecoration: "none",
          margin: 5,
          padding: "10px 20px",
        }}
        href="/auth/logout"
      >
        Logout
      </a>
      <h1>this is authenticated app</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <div style={{ marginBottom: 20 }}>
            <img src={user.photo} alt="user avatar" />
          </div>
          <button disabled={isFetching} onClick={handleFetchCalendar}>
            Fetch Calendar data
          </button>
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}
