

export default class ArgumentError extends Error {
  /**
   * Ctor
   */
  constructor(argumentName: string, argumentValue: any, errorMessage?: string) {
    super(`Invalid value for "${argumentName}". Received value was "${argumentValue}". ${errorMessage}`);
  }
}