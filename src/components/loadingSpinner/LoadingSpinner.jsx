import React from 'react';

import './LoadingSpinner.scss';

const LoadingSpinner = (props) => {
  const { center } = props;
  const style = center ? { justifyContent: 'center' } : {};

  return (
    <div className="loading-spinner-container" style={style}>
      <div className="LoadingSpinner"/>
    </div>
  );
};

export default LoadingSpinner;