import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ _id, username, profilePic }) => {
  let cardStyle = {
    backgroundImage: "url(" + profilePic + ")",
    backgroundColor: "black",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200px",
    width: "200px",
    margin: "2rem",
    textAlign: "center",
    color: "white",
    fontSize: "5rem",
    border: "2px black solid",
    borderRadius: "5px",
  };
  return (
    <Link to={`/profile/${_id}`}>
      <div className="m-2" style={cardStyle}>
        <h3>{username}</h3>
      </div>
    </Link>
  );
};

export default UserCard;
