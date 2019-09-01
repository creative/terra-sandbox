const fs = require('fs');
const DocGen = require('react-docgen');
const Component = require('./Component');
const Property = require('../property/Property');

describe('Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('returns a JSON representation of the component', () => {
      const mockConfig = {
        sourceFile: '../mock/file',
      };

      jest.spyOn(Component, 'parse').mockImplementation(() => ({ props: {} }));
      jest.spyOn(Component, 'packageJSON').mockImplementation(() => ({ version: '1.0.0' }));
      jest.spyOn(Component, 'documentationUrl').mockImplementation(() => 'http://mock.com/');
      jest.spyOn(Component, 'createProperties').mockImplementation(() => ({}));

      const component = Component.create('mock-package', 'mock-component-name', mockConfig);

      const expected = {
        description: '',
        documentation: 'http://mock.com/',
        name: 'mock-component-name',
        packageName: 'mock-package',
        props: {},
        version: '1.0.0',
      };

      expect(Component.parse).toHaveBeenCalledWith('mock-package', '../mock/file');
      expect(Component.packageJSON).toHaveBeenCalledWith('mock-package');
      expect(Component.documentationUrl).toHaveBeenCalledWith('mock-package');
      expect(Component.createProperties).toHaveBeenCalledWith('mock-package', { sourceFile: '../mock/file' }, {});
      expect(component).toEqual(expected);
    });
  });

  describe('createProperties', () => {
    it('returns the generated properties', () => {
      const mockProps = {
        mockProperty1: {},
        mockProperty2: {},
        mockProperty3: {},
      };

      jest.spyOn(Property, 'create').mockImplementation(() => ({}));

      const properties = Component.createProperties('mock-package', {}, mockProps);

      expect(properties).toEqual(mockProps);
    });

    it('returns the generated properties excluding the ignored properties', () => {
      const mockConfig = {
        ignoredProperties: ['mockProperty2'],
      };

      const mockProps = {
        mockProperty1: {},
        mockProperty2: {},
        mockProperty3: {},
      };

      jest.spyOn(Property, 'create').mockImplementation(() => ({}));

      const properties = Component.createProperties('mock-package', mockConfig, mockProps);

      const expected = {
        mockProperty1: {},
        mockProperty3: {},
      };

      expect(properties).toEqual(expected);
    });
  });

  describe('documentationUrl', () => {
    it('returns the terra-ui documentation url for a provided package', () => {
      const url = Component.documentationUrl('terra-mock-package');
      const expected = 'http://engineering.cerner.com/terra-ui/#/components/terra-mock-package/mock-package';

      expect(url).toEqual(expected);
    });
  });

  describe('packageJSON', () => {
    it('returns a valid JSON of the package', () => {
      const mockPackageJSON = {
        name: 'mock-package',
        version: '1.0.0',
        description: 'Mock description',
      };

      jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(mockPackageJSON));

      const packageJSON = Component.packageJSON('mock-package');

      expect(fs.readFileSync).toHaveBeenCalledWith('node_modules/mock-package/package.json');
      expect(packageJSON).toEqual(mockPackageJSON);
    });
  });

  describe('parse', () => {
    it('returns a valid JSON of the package', () => {
      jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'mockFile');
      jest.spyOn(DocGen, 'parse').mockImplementation(() => ({}));

      const docGen = Component.parse('mock-package', '../mock/file');

      expect(fs.readFileSync).toHaveBeenCalledWith('node_modules/mock-package../mock/file');
      expect(DocGen.parse).toHaveBeenCalledWith('mockFile');
      expect(docGen).toEqual({});
    });
  });
});
