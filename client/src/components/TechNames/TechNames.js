import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { QUERY_TECHS } from "../../utils/queries";
import { UPDATE_TECHS } from "../../utils/actions";
import { idbPromise } from "../../utils/helper";

import TechBtn from "../TechBtn/TechBtn";
import "./TechNames.css";

const TechNames = () => {
  const { loading, data: techData } = useQuery(QUERY_TECHS);

  const { techs } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (techData) {
      dispatch({
        type: UPDATE_TECHS,
        payload: techData.techs,
      });
      techData.techs.forEach((tech) => {
        idbPromise("techs", "put", tech);
      });
    } else if (!loading) {
      idbPromise("techs", "get").then((techs) => {
        dispatch({
          type: UPDATE_TECHS,
          payload: techs,
        });
      });
    }
  }, [techData, loading, dispatch]);

  return (
    <>
      {loading ? null : (
        <div className=" m-2">
          <h5 className="text-center">Learn More</h5>
          {techData.techs.map((tech) => (
            <TechBtn key={tech._id} tech={tech} />
          ))}
        </div>
      )}
    </>
  );
};

export default TechNames;
