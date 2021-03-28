import React from 'react';
import './ProfilePhoto.css';
import Politician from 'models/Politician';

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
      <div className="ProfilePhoto">
        <figure className="image is-4by5">
          <img src='https://via.placeholder.com/250x312?text=No+Selection' alt='Placeholder - No Politician Selected' className="ProfilePhoto__Image"></img>
        </figure>
      </div>
    );
  }

  return (
    <a className="ProfilePhoto" href={politician.getHyperLinkToParliamentProfile()} target="_blank" rel="noreferrer">
      <figure className="image is-4by5">
        <img src={politician.getPhotoURL()} alt={`${politician.getPhotoURL()}'s Profile`} className="ProfilePhoto__Image"></img>
      </figure>
    </a>
  );
}
export default ProfilePhoto;