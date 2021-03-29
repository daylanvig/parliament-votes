

export type ColourType = 'danger' | 'info' | 'link' | 'primary' | 'success' | 'warning';
/**
 * Bulma colour classes
 */
export default class Colour {
  public static readonly Danger: ColourType = "danger";
  public static readonly Info: ColourType = "info";
  public static readonly Link: ColourType = "link";
  public static readonly Primary: ColourType = "primary";
  public static readonly Success: ColourType = "success";
  public static readonly Warning: ColourType = "warning";

  public static getTextColourClass(colour?: ColourType): string {
    if (colour == null) {
      return '';
    }
    return `has-text-${colour}`;
  }

  public static getElementColourClass(colour?: ColourType): string {
    if (colour == null) {
      return '';
    }
    return `is-${colour}`;
  }

  public static getBackgroundColourClass(colour?: ColourType): string {
    if (colour == null) {
      return '';
    }
    return `has-background-${colour}`;
  }
}