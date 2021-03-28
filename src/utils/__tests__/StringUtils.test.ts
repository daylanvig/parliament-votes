import StringUtils from 'utils/StringUtils';

describe('isNullOrEmpty', () => {
  it.each(['', null, undefined])('should return true because the value provided is "%s"', (stringValue) => {
    expect(StringUtils.isNullOrEmpty(stringValue)).toBe(true);
  });

  it.each(['0', 'null', 'abc'])('should return false because the value provided is "%s" (literal)', (stringValue) => {
    expect(StringUtils.isNullOrEmpty(stringValue)).toBe(false);
  })
})