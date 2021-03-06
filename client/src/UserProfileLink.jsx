import { useNavigate } from "react-router-dom";
import { memo } from "react";
const UserProfileLink = ({ name, photo }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", minHeight: "60px", minWidth: "200px" }}>
      <>
        {photo && name && (
          <>
            <div style={{ height: "60px", width: "60px" }}>
              <img
                onClick={() => navigate("/")}
                src={photo}
                alt="user avatar"
                style={{ width: "inherit" }}
              />
            </div>

            <h1
              className="logged-in-name"
              style={{ position: "relative", left: "10px" }}
            >
              {name}
            </h1>
          </>
        )}
      </>
    </div>
  );
};

export default memo(UserProfileLink);
