
export type SizeType = 'small' | 'medium' | 'large';

export default class Size {
  public static readonly Small: SizeType = 'small';
  public static readonly Medium: SizeType = 'medium';
  public static readonly Large: SizeType = 'large';

  public static getElementSizeClass(size?: SizeType): string {
    if (size == null) {
      return '';
    }
    return `is-${size}`;
  }
}