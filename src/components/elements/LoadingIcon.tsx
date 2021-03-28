import React from 'react';
import './LoadingIcon.scss';

type LoadingIconProps = {
  // colour can be any bulma colour https://bulma.io/documentation/helpers/color-helpers/
  colour?: string;
  size?: string;
};
/**
 * 
 * @returns A loading icon element
 */
function LoadingIcon({ colour, size }: LoadingIconProps): JSX.Element {
  return (
    <div className={`LoadingIcon  ${size || ''}`}>
      <div className={`LoadingIcon__Icon has-text-${colour}`}><div></div><div></div><div></div><div></div></div>
      <div className="LoadingIcon__Label">Loading...</div>
    </div>
  );
};

export default LoadingIcon;

