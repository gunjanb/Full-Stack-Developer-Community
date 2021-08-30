import React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CURRENT_TECH } from "../../utils/actions";
import "./TechBtn.css";

const TechBtn = ({ tech }) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_TECH,
      payload: id,
    });
  };

  return (
    <button className="button-style rounded" onClick={() => handleClick(tech._id)}>
      {tech.name}
    </button>
  );
};

export default TechBtn;
