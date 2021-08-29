import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ _id, username, profilePic }) => {
  let cardStyle = {
    backgroundImage: "url(" + profilePic + ")",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <Link to={`/profile/${_id}`} style={{ width: "300px", height: "300px" }}>
      <div className=" m-2" style={cardStyle}>
        <h3>{username}</h3>
      </div>
    </Link>
  );
};

export default UserCard;
