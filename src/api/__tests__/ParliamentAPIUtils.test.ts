import ParliamentAPIUtils from 'api/ParliamentAPIUtils';
import ArgumentError from 'errors/ArgumentError';

describe('getAPIURL', () => {
  it('should throw an argument error because the relative path is empty', () => {
    expect(() => ParliamentAPIUtils.getAPIURL('')).toThrow(ArgumentError);
  });

  it('should return the URL of https://api.openparliament.ca/votes', () => {
    expect(ParliamentAPIUtils.getAPIURL('/votes')).toBe('https://api.openparliament.ca/votes');
  });
});

describe('getViewURL', () => {
  it('should throw an argument error because the relative path is empty', () => {
    expect(() => ParliamentAPIUtils.getViewURL('')).toThrow(ArgumentError);
  });

  it('should return the URL of https://openparliament.ca/votes', () => {
    expect(ParliamentAPIUtils.getViewURL('/votes')).toBe('https://openparliament.ca/votes');
  });
});