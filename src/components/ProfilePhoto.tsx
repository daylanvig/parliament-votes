import React from 'react';
import Politician from 'models/Politician';
import './ProfilePhoto.scss';

type ProfilePhotoProps = {
  politician?: Politician;
};

/**
 * Profile Photo Component
 * @returns 
 */
function ProfilePhoto({ politician }: ProfilePhotoProps) {

  // if politician has not been selected, we can render a placeholder here
  if (politician == null) {
    return (
      <div className='ProfilePhoto'>
        <figure className='image is-2by3'>
          <img src='https://via.placeholder.com/250x312?text=No+Selection' alt='Placeholder - No Politician Selected'></img>
        </figure>
      </div>
    );
  }

  return (
    <a className='ProfilePhoto' href={politician.getHyperLinkToParliamentProfile()} target="_blank" rel="noreferrer">
      <figure className='image is-2by3'>
        <img src={politician.getPhotoURL()} alt={`${politician.getPhotoURL()}'s Profile`}></img>
      </figure>
    </a>
  );
}
export default ProfilePhoto;