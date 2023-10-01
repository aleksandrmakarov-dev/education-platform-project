import React from "react";
import { useParams } from "react-router-dom";

const TermsPage = () => {
  const { themeId } = useParams();

  return <div>{themeId}</div>;
};

export default TermsPage;
