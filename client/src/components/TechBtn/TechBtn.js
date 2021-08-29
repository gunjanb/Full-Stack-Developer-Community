import React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CURRENT_TECH } from "../../utils/actions";

const TechBtn = ({ tech }) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_TECH,
      payload: id,
    });
  };

  return (
    <button className="py-2 rounded m-2" onClick={() => handleClick(tech._id)}>
      {tech.name}
    </button>
  );
};

export default TechBtn;
