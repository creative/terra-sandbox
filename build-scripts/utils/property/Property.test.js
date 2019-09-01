
const Property = require('./Property');
const Format = require('../format/Format');

describe('Property', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('returns undefined for private properties', () => {
      const mockProperty = { description: '@private Mock Description' };
      const property = Property.create('mock-package', 'mock', mockProperty);

      expect(property).toBe(undefined);
    });

    it('returns undefined for private properties', () => {
      jest.spyOn(Property, 'type').mockImplementation(() => undefined);

      const mockProperty = { description: '' };
      const property = Property.create('mock-package', 'mock', mockProperty);

      expect(property).toBe(undefined);
    });

    it('returns a property', () => {
      jest.spyOn(Property, 'type').mockImplementation(() => 'String');
      jest.spyOn(Format, 'humanize').mockImplementation((name) => name);
      jest.spyOn(Property, 'defaultValue').mockImplementation(() => undefined);
      jest.spyOn(Property, 'options').mockImplementation(() => undefined);
      jest.spyOn(Property, 'schema').mockImplementation(() => undefined);

      const mockProperty = {
        description: '',
        required: false,
      };

      const property = Property.create('mock-package', 'mock', mockProperty);

      const expected = {
        type: 'String',
        displayName: 'mock',
        description: '',
        defaultValue: undefined,
        options: undefined,
        required: false,
        schema: undefined,
      };

      expect(property).toEqual(expected);
    });
  });

  describe('defaultValue', () => {
    it('returns undefined if the property has no default value', () => {
      expect(Property.defaultValue({ type: {} })).toEqual(undefined);
    });

    it('returns undefined if the property has no default value', () => {
      expect(Property.defaultValue({ defaultValue: {}, type: {} })).toEqual(undefined);
    });

    it('returns undefined if the property value is undefined', () => {
      expect(Property.defaultValue({ defaultValue: { value: 'undefined' }, type: {} })).toEqual(undefined);
    });

    it('returns undefined if the property value is null', () => {
      expect(Property.defaultValue({ defaultValue: { value: 'null' }, type: {} })).toEqual(undefined);
    });

    it('returns the default property of a bool', () => {
      const mockProperty = { type: { name: 'bool' }, defaultValue: { value: true } };

      expect(Property.defaultValue(mockProperty)).toBe(true);
    });

    it('returns the default property of a number', () => {
      const mockProperty = { type: { name: 'number' }, defaultValue: { value: '12' } };

      expect(Property.defaultValue(mockProperty)).toBe(12);
    });

    it('returns the default property of a string', () => {
      const mockProperty = { type: { name: 'string' }, defaultValue: { value: 'mock string' } };

      expect(Property.defaultValue(mockProperty)).toBe('mock string');
    });

    it('returns the default property of an enum type', () => {
      const mockProperty = { type: { name: 'enum' }, defaultValue: { value: 'mock enum' } };

      expect(Property.defaultValue(mockProperty)).toBe('mock enum');
    });

    it('returns undefined for unsupported properties', () => {
      const mockProperty = { type: { name: 'function' }, defaultValue: { value: '() => {}' } };

      expect(Property.defaultValue(mockProperty)).toBe(undefined);
    });
  });

  describe('enumType', () => {
    it('returns null for computed properties', () => {
      const mockProperty = { type: { name: 'function', value: [], computed: true } };

      expect(Property.enumType(mockProperty)).toBe(null);
    });

    it('returns null for computed properties', () => {
      const mockProperty = { type: { name: 'function', value: [], computed: false } };

      expect(Property.enumType(mockProperty)).toBe(null);
    });

    it('returns a string PropType for string enums', () => {
      const mockProperty = { type: { name: 'function', value: [{ value: '\'mock\'', computed: false }], computed: false } };

      expect(Property.enumType(mockProperty)).toBe('string');
    });

    it('returns a number PropType for number enums', () => {
      const mockProperty = { type: { name: 'function', value: [{ value: '10', computed: false }], computed: false } };

      expect(Property.enumType(mockProperty)).toBe('number');
    });

    it('returns null if the value is unsupported', () => {
      const mockProperty = { type: { name: 'function', value: [{ value: () => {}, computed: false }], computed: false } };

      expect(Property.enumType(mockProperty)).toBe(null);
    });
  });

  describe('options', () => {
    it('returns undefined if the property type is not an enum', () => {
      const mockProperty = { type: { name: 'string', value: [], computed: true } };

      expect(Property.options(mockProperty)).toBe(undefined);
    });

    it('returns an array of options', () => {
      const mockProperty = {
        type: { name: 'enum', value: [{ value: '1', computed: true }, { value: '2', computed: false }, { value: '3', computed: false }, { value: '4', computed: false }, { value: '5', computed: false }, { value: '6', computed: false }] }, required: false, description: 'One of `2`, `3`, `4`, `5`, `6`.', defaultValue: { value: '2', computed: false },
      };

      const expected = [{ displayName: '2', type: 'number', value: '2' }, { displayName: '3', type: 'number', value: '3' }, { displayName: '4', type: 'number', value: '4' }, { displayName: '5', type: 'number', value: '5' }, { displayName: '6', type: 'number', value: '6' }];

      expect(Property.options(mockProperty)).toEqual(expected);
    });
  });

  describe('schema', () => {
    it('returns undefined if the property is not an arrayOf type', () => {
      const mockProperty = { type: { name: 'arrayOf', value: [] } };

      expect(Property.schema(mockProperty)).toBe(undefined);
    });

    it('returns undefined if the property is an arrayOf but the type is undefined', () => {
      const mockProperty = { type: { name: 'arrayOf' } };

      expect(Property.schema(mockProperty)).toBe(undefined);
    });

    it('returns a schema for a property', () => {
      const mockProperty = { type: { name: 'arrayOf', value: { name: 'string' } } };

      expect(Property.schema(mockProperty)).toEqual({ type: 'string' });
    });
  });

  describe('type', () => {
    it('returns the expected supported property type', () => {
      const mockProperty = { type: { name: 'string' } };

      expect(Property.type(mockProperty)).toBe('string');
    });

    it('returns the expected enum type', () => {
      const mockProperty = { type: { name: 'enum' } };

      jest.spyOn(Property, 'enumType').mockImplementation(() => 'number');

      expect(Property.type(mockProperty)).toBe('number');
    });

    it('returns null if the property type cannot be interpreted', () => {
      const mockProperty = { type: { name: 'function' } };

      expect(Property.type(mockProperty)).toBe(null);
    });
  });
});
