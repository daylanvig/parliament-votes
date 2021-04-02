import React from 'react';

// FUTURE: size, colour, etc
type TitleProps = {
  title: string;
};

/**
 * Title element
 * @returns 
 */
function Title({ title }: TitleProps): JSX.Element {
  return <h1 className='Title title'>{title}</h1>;
}

export default Title;