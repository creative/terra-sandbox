const Format = require('./Format');

describe('Format', () => {
  describe('humanize', () => {
    it('returns a humanized string', () => {
      expect(Format.humanize('MockStringValue')).toEqual('Mock string value');
    });

    it('returns a humanized string with the is prefix removed', () => {
      expect(Format.humanize('isDisabledProperty')).toEqual('Disabled property');
    });
  });

  describe('hyphenize', () => {
    it('returns a hyphenize string from a hyphen string', () => {
      expect(Format.hyphenize('mock-string-value')).toEqual('mock-string-value');
    });

    it('returns a hyphenize string from a camelcase string', () => {
      expect(Format.hyphenize('camelCaseString')).toEqual('camel-case-string');
    });
  });

  describe('titleize', () => {
    it('returns a hyphenize string from a hyphen string', () => {
      expect(Format.titleize('mock-string-value')).toEqual('MockStringValue');
    });

    it('returns a hyphenize string from a camelcase string', () => {
      expect(Format.titleize('camelCaseString')).toEqual('CamelCaseString');
    });

    it('returns a hyphenize string and removes the terra prefix', () => {
      expect(Format.titleize('TerraComponentExample')).toEqual('ComponentExample');
    });
  });
});
