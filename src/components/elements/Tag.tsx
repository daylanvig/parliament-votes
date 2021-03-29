import React from 'react';
import Colour, { ColourType } from 'components/helpers/Colour';
import Size, { SizeType } from 'components/helpers/Size';

// SEE: https://bulma.io/documentation/elements/tag/
type TagProps = {
  colour: ColourType;
  size?: SizeType;
  label: string;
};

/**
 * Create bulma tag element
 * @returns 
 */
export default function Tag({ colour, size, label }: TagProps): JSX.Element {
  return <span className={`tag ${Colour.getElementColourClass(colour)} ${Size.getElementSizeClass(size)}`}>{label}</span>;
}