import Placeholder from '../../components/placeholder/Placeholder';
import WorkspaceGenerator from './workspace-generator';

describe('Workspace Generator', () => {
  describe('generate', () => {
    it('should generate a workspace', () => {
      const config = {
        workspace: {
          root: {
            placeholder: {
              id: 'placeholder',
              parent: 'root',
              type: 'element',
              value: {
                name: 'terra-sandbox:Placeholder',
                props: {
                  expand: {
                    type: 'bool',
                    value: true,
                  },
                },
              },
            },
          },
        },
        imports: {
          'terra-sandbox:Placeholder': Placeholder,
        },
      };

      const result = JSON.stringify(WorkspaceGenerator.generate(config.imports, config.workspace));

      const expected = '{"key":null,"ref":null,"props":{"children":[{"key":"placeholder","ref":null,"props":{"id":"placeholder","expand":true},"_owner":null,"_store":{}}]},"_owner":null,"_store":{}}';

      expect(result).toEqual(expected);
    });
  });
});
