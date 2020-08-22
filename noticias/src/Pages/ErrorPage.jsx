import React from "react";

const ErrorPage = (props) => {
  const isError404 = (
    <div className="wrapper">
      <h1>Error 404</h1>
    </div>
  );

  const isError = (
    <div className="wrapper">
      <h1>Error {props.errorValue}</h1>
    </div>
  );

  if (props.value) {
    return isError;
  } else {
    return isError404;
  }
};

export default ErrorPage;
