import { useNavigate } from "react-router-dom";
import { memo } from "react";
const UserProfileLink = ({ name, photo }) => {
  console.log("in the user profile");
  console.log({ name });
  console.log({ photo });
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", minHeight: "60px", minWidth: "200px" }}>
      <>
        {photo && name && (
          <>
            <img
              onClick={() => navigate("/")}
              style={{ height: "60px" }}
              src={photo}
              alt="user avatar"
            />
            <h1 style={{ position: "relative", left: "10px" }}>{name}</h1>
          </>
        )}
      </>
    </div>
  );
};

export default memo(UserProfileLink);
