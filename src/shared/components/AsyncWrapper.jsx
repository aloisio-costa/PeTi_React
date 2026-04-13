import React from "react";
import LoadingSpinner from "../utils/loadingSpinner";
import ErrorAlert from "../utils/errorAlert";

const AsyncWrapper = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorAlert error={error} />
      </div>
    );
  }

  return children;
};

export default AsyncWrapper;