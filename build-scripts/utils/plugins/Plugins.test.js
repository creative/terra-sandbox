const fs = require('fs');
const Plugins = require('./Plugins');
const Component = require('../component/Component');

describe('Plugins', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('config', () => {
    it('returns an existing config', () => {
      const mockConfig = { defaultExport: { sourceFile: './src/mock' } };

      jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
      jest.spyOn(fs, 'readFileSync').mockImplementation(() => (JSON.stringify(mockConfig)));

      const config = Plugins.config('mock-package');

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(config).toEqual(mockConfig);
    });

    it('returns a default config if one does not exist', () => {
      jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

      const config = Plugins.config('mock-package');

      const expectedConfig = { defaultExport: { sourceFile: '/src/MockPackage.jsx' } };

      expect(fs.existsSync).toHaveBeenCalled();
      expect(config).toEqual(expectedConfig);
    });
  });

  describe('create', () => {
    it('returns a plugin configuration', () => {
      jest.spyOn(Plugins, 'key');
      jest.spyOn(Plugins, 'createSubcomponents').mockImplementation(() => ({}));
      jest.spyOn(Component, 'create').mockImplementation((packageName, name) => ({
        packageName,
        name,
        version: '1.0.0',
      }));

      const mockConfig = { mockComponentName: { sourceFile: '../mock/mockFile' } };

      const config = Plugins.create('mock-package', mockConfig, 'Default');

      const expectedConfig = {
        'mock-package:mockComponentName': {
          name: 'mockComponentName',
          packageName: 'mock-package',
          version: '1.0.0',
          key: 'mock-package:mockComponentName',
          subcomponents: [],
          exportType: 'Default',
        },
      };

      expect(Plugins.key).toHaveBeenCalledWith('mock-package', 'mockComponentName');
      expect(Plugins.createSubcomponents).toHaveBeenCalledWith('mock-package', undefined, 'mockComponentName');
      expect(config).toEqual(expectedConfig);
    });

    it('returns a plugin configuration with subcomponents', () => {
      jest.spyOn(Plugins, 'createSubcomponents').mockImplementation((_packageName, subcomponents) => (
        { ...subcomponents }
      ));
      jest.spyOn(Component, 'create').mockImplementation((packageName, name) => ({
        packageName,
        name,
        version: '1.0.0',
      }));

      const mockConfig = { mockComponentName: { sourceFile: '../mock/mockFile', subcomponents: { mockSubcomponent1: {}, mockSubcomponent2: {} } } };

      const config = Plugins.create('mock-package', mockConfig, 'Default');

      const expectedConfig = {
        'mock-package:mockComponentName': {
          name: 'mockComponentName',
          packageName: 'mock-package',
          version: '1.0.0',
          key: 'mock-package:mockComponentName',
          subcomponents: [
            'mockSubcomponent1',
            'mockSubcomponent2',
          ],
          exportType: 'Default',
        },
        mockSubcomponent1: {},
        mockSubcomponent2: {},
      };

      expect(config).toEqual(expectedConfig);
    });

    it('returns a plugin configuration with multiple components and subcomponents', () => {
      jest.spyOn(Plugins, 'createSubcomponents').mockImplementation((_packageName, subcomponents) => (
        { ...subcomponents }
      ));
      jest.spyOn(Component, 'create').mockImplementation((packageName, name) => ({
        packageName,
        name,
        version: '1.0.0',
      }));

      const mockConfig = {
        mockComponentName1: {
          sourceFile: '../mock/mockFile1',
          subcomponents: {
            mockSubcomponent1: {},
            mockSubcomponent2: {},
          },
        },
        mockComponentName2: {
          sourceFile: '../mock/mockFile2',
        },
      };

      const config = Plugins.create('mock-package', mockConfig, 'Default');

      const expectedConfig = {
        'mock-package:mockComponentName1': {
          packageName: 'mock-package',
          name: 'mockComponentName1',
          version: '1.0.0',
          key: 'mock-package:mockComponentName1',
          subcomponents: [
            'mockSubcomponent1',
            'mockSubcomponent2',
          ],
          exportType: 'Default',
        },
        mockSubcomponent1: {},
        mockSubcomponent2: {},
        'mock-package:mockComponentName2': {
          packageName: 'mock-package',
          name: 'mockComponentName2',
          version: '1.0.0',
          key: 'mock-package:mockComponentName2',
          subcomponents: [],
          exportType: 'Default',
        },
      };

      expect(config).toEqual(expectedConfig);
    });

    it('returns an empty object if the config is undefined', () => {
      const config = Plugins.create('mock-package', undefined, 'Default');

      expect(config).toEqual({});
    });
  });

  describe('destination', () => {
    it('returns the destination of a component', () => {
      const destination = Plugins.destination('mock-package', 'MockComponent');

      // Jest does not currently support mocking process.cwd() after it has already been declared.
      // To prevent absolute paths being machine specific check only for the expected substring.
      const trimmedDestination = '/plugins/mock-package/components/mock-component/MockComponent.json';
      expect(destination.indexOf(trimmedDestination) >= 0).toBe(true);
    });

    it('returns the destination of a subcomponent', () => {
      const destination = Plugins.destination('mock-package', 'MockSubcomponent', 'MockParentComponent');

      // Jest does not currently support mocking process.cwd() after it has already been declared.
      // To prevent absolute paths being machine specific check only for the expected substring.
      const trimmedDestination = '/plugins/mock-package/components/mock-parent-component-mock-subcomponent/MockSubcomponent.json';
      expect(destination.indexOf(trimmedDestination) >= 0).toBe(true);
    });
  });

  describe('generate', () => {
    it('generates the plugin configurations', () => {
      const mockPlugins = [
        'mock-plugin-1',
        'mock-plugin-2',
        'mock-plugin-3',
      ];

      const mockConfig = {
        defaultExport: {
          sourceFile: '/src/MockDefault.jsx',
        },
        componentExports: {
          MockExport1: {
            sourceFile: '/src/MockDefault1.jsx',
          },
          MockExport2: {
            sourceFile: '/src/MockDefault2jsx',
          },
        },
      };

      jest.spyOn(Plugins, 'config').mockImplementation(() => (mockConfig));
      jest.spyOn(Plugins, 'writeFiles').mockImplementation(() => ({}));
      jest.spyOn(Plugins, 'create').mockImplementation((plugin, config, exportType) => ({
        [`${plugin}-${exportType}`]: {
          exportType,
        },
      }));

      Plugins.generate(mockPlugins);

      const expectedConfig = {
        'mock-plugin-1-Default': { exportType: 'Default' },
        'mock-plugin-1-Export': { exportType: 'Export' },
        'mock-plugin-1-Custom': { exportType: 'Custom' },
        'mock-plugin-2-Default': { exportType: 'Default' },
        'mock-plugin-2-Export': { exportType: 'Export' },
        'mock-plugin-2-Custom': { exportType: 'Custom' },
        'mock-plugin-3-Default': { exportType: 'Default' },
        'mock-plugin-3-Export': { exportType: 'Export' },
        'mock-plugin-3-Custom': { exportType: 'Custom' },
      };

      expect(Plugins.writeFiles).toHaveBeenCalledWith(expectedConfig);
    });

    it('generates the plugin configurations if no default is provided', () => {
      const mockPlugins = [
        'mock-plugin-1',
        'mock-plugin-2',
        'mock-plugin-3',
      ];

      const mockConfig = {
        componentExports: {
          MockExport1: {
            sourceFile: '/src/MockDefault1.jsx',
          },
          MockExport2: {
            sourceFile: '/src/MockDefault2jsx',
          },
        },
      };

      jest.spyOn(Plugins, 'config').mockImplementation(() => (mockConfig));
      jest.spyOn(Plugins, 'writeFiles').mockImplementation(() => ({}));
      jest.spyOn(Plugins, 'create').mockImplementation((plugin, config, exportType) => ({
        [`${plugin}-${exportType}`]: {
          exportType,
        },
      }));

      Plugins.generate(mockPlugins);

      const expectedConfig = {
        'mock-plugin-1-Export': { exportType: 'Export' },
        'mock-plugin-1-Custom': { exportType: 'Custom' },
        'mock-plugin-2-Export': { exportType: 'Export' },
        'mock-plugin-2-Custom': { exportType: 'Custom' },
        'mock-plugin-3-Export': { exportType: 'Export' },
        'mock-plugin-3-Custom': { exportType: 'Custom' },
      };

      expect(Plugins.writeFiles).toHaveBeenCalledWith(expectedConfig);
    });
  });

  describe('key', () => {
    it('returns the expected component key', () => {
      const key = Plugins.key('mock-package', 'mock-component');
      expect(key).toEqual('mock-package:mock-component');
    });

    it('returns the expected subcomponent key', () => {
      const key = Plugins.key('mock-package', 'mock-component', 'mock-parent');
      expect(key).toEqual('mock-package:mock-parent:mock-component');
    });
  });

  describe('writeFile', () => {
    it('creates a new directory is one does not exist', () => {
      jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
      jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      Plugins.writeFile('/mock/dir/Mock.json', {});

      expect(fs.existsSync).toHaveBeenCalledWith('/mock/dir');
      expect(fs.mkdirSync).toHaveBeenCalledWith('/mock/dir', { recursive: true });
      expect(fs.writeFileSync).toHaveBeenCalledWith('/mock/dir/Mock.json', '{}\n');
    });

    it('writes to an existing file', () => {
      jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
      jest.spyOn(fs, 'mkdirSync');
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      Plugins.writeFile('/mock/dir/Mock.json', {});

      expect(fs.existsSync).toHaveBeenCalledWith('/mock/dir');
      expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
      expect(fs.writeFileSync).toHaveBeenCalledWith('/mock/dir/Mock.json', '{}\n');
    });
  });

  describe('writeFiles', () => {
    it('writes the necessary files', () => {
      jest.spyOn(Plugins, 'writeFile').mockImplementation(() => {});
      jest.spyOn(Plugins, 'destination').mockImplementation((packageName, name, parent) => (
        `${packageName}/${parent || 'parent'}/${name}`
      ));

      const mockConfig = {
        mockComponent1: {
          packageName: 'mockPackage1',
          name: 'mockComponent1',
        },
        mockComponent2: {
          packageName: 'mockPackage2',
          name: 'mockComponent2',
        },
        mockComponent3: {
          packageName: 'mockPackage2',
          name: 'mockComponent3',
          parent: 'mockComponent2',
        },
      };

      Plugins.writeFiles(mockConfig);

      expect(Plugins.writeFile).toHaveBeenCalledTimes(4);
      expect(Plugins.destination).toHaveBeenCalledTimes(3);
    });
  });

  describe('createSubcomponents', () => {
    it('returns a plugin configuration', () => {
      jest.spyOn(Component, 'create').mockImplementation((packageName, name) => ({
        packageName,
        name,
        version: '1.0.0',
      }));

      const mockConfig = {
        mockComponent1: {
          sourceFile: '../mock/MockFile1',
        },
        mockComponent2: {
          sourceFile: '../mock/MockFile2',
        },
        mockComponent3: {
          sourceFile: '../mock/MockFile3',
        },
      };

      const config = Plugins.createSubcomponents('mock-package', mockConfig, 'MockParent');

      const expectedConfig = {
        'mock-package:MockParent:mockComponent1': {
          packageName: 'mock-package',
          name: 'mockComponent1',
          version: '1.0.0',
          key: 'mock-package:MockParent:mockComponent1',
          parent: 'mock-package:MockParent',
          exportType: 'Subcomponent',
        },
        'mock-package:MockParent:mockComponent2': {
          packageName: 'mock-package',
          name: 'mockComponent2',
          version: '1.0.0',
          key: 'mock-package:MockParent:mockComponent2',
          parent: 'mock-package:MockParent',
          exportType: 'Subcomponent',
        },
        'mock-package:MockParent:mockComponent3': {
          packageName: 'mock-package',
          name: 'mockComponent3',
          version: '1.0.0',
          key: 'mock-package:MockParent:mockComponent3',
          parent: 'mock-package:MockParent',
          exportType: 'Subcomponent',
        },
      };

      expect(config).toEqual(expectedConfig);
    });

    it('returns an empty object if the config is undefined', () => {
      const config = Plugins.createSubcomponents('mock-package', undefined, 'Parent');

      expect(config).toEqual({});
    });
  });
});
