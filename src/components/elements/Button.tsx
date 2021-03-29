import React, { MouseEventHandler } from 'react';
import Colour, { ColourType } from 'components/helpers/Colour';

type ButtonProps = {
  label: string;
  type?: 'button' | 'submit' | 'reset'; // defaults to 'button'
  onClick: MouseEventHandler<HTMLButtonElement>;
  colour: ColourType;
  isDisabled?: boolean;
};

/**
 * Render button
 */
export default function Button({ label, type, onClick, colour, isDisabled = false }: ButtonProps): JSX.Element {

  return <button type={type || 'button'} disabled={isDisabled} onClick={onClick} className={`button ${Colour.getElementColourClass(colour)}`}>{label}</button>;
}


