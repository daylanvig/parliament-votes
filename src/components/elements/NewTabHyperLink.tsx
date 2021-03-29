import React from 'react';

type NewTabHyperLinkProps = {
  label: string;
  href: string;
};

/**
 * Renders an anchor tag that opens in a new tab
 * @returns 
 */
export default function NewTabHyperLink({ label, href }: NewTabHyperLinkProps): JSX.Element {
  return <a rel="noreferrer" target="_blank" href={href}> {label}</a>;
}
