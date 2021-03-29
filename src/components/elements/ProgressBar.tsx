import React from 'react';
import Colour, { ColourType } from 'components/helpers/Colour';
import Size, { SizeType } from 'components/helpers/Size';

type ProgressBarProps = {
  percentage: number;
  colour: ColourType;
  size?: SizeType;
};

export default function ProgressBar({ percentage, colour, size }: ProgressBarProps): JSX.Element {
  return <progress className={`progress ${Size.getElementSizeClass(size)} ${Colour.getElementColourClass(colour)}`} value={percentage} max={100}></progress>;
}