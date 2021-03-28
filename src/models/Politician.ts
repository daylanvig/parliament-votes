import ParliamentAPIUtils from 'api/ParliamentAPIUtils';
import { ParliamentPolitician } from 'api/ParliamentTypes';

export default class Politician {
  private readonly _parliamentPolitician: ParliamentPolitician;

  constructor(parliamentPolitician: ParliamentPolitician) {
    this._parliamentPolitician = parliamentPolitician;
  }

  /**
   * Get the parliament url
   * 
   * This url is a unique identifier for the politician, used for queries. It is not prefixed with the base parliament "https:..." as its not used in that context
   */
  public getURL(): string {
    return this._parliamentPolitician.url;
  }

  public getHyperLinkToParliamentProfile(): string {
    return ParliamentAPIUtils.getViewURL(this._parliamentPolitician.url);
  }

  /**
   * Gets the english party name of this politician
   */
  public getPartyName(): string {
    return this._parliamentPolitician.current_party.short_name.en;
  }

  /**
   * Get the photo url of this politician
   */
  public getPhotoURL(): string {
    return ParliamentAPIUtils.getAPIURL(this._parliamentPolitician.image);
  }

  /**
   * Get this politicians full name
   */
  public getFullName(): string {
    return this._parliamentPolitician.name;
  }

  /**
   * Get the riding this politician represents
   */
  public getRiding(): string {
    return `${this._parliamentPolitician.current_riding.name.en} (${this._parliamentPolitician.current_riding.province})`;
  }
}