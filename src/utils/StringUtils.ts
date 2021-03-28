export default class StringUtils {

  /**
   * Check if string is null (or undefined), or empty.
   * @param value The string value to check
   */
  public static isNullOrEmpty(value?: string | null): boolean {
    return value == null || value === '';
  }
}