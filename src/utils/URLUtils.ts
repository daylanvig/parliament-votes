/**
 * Utility functions for working with urls
 */
export default class URLUtils {

  /**
   * Build URL path
   * @param URLParts 
   * @returns The url path, joined with "/" as needed. 
   */
  public static buildURL(...URLParts: string[]): string {
    let URL = URLParts[0];
    for (let i = 1; i < URLParts.length; i += 1) {
      if (!URL.endsWith('/')) {
        URL += '/';
      }
      const URLPart = URLParts[i];
      URL += URLPart.startsWith('/') ? URLPart.substring(1) : URLPart;
    }
    return URL;
  }
}