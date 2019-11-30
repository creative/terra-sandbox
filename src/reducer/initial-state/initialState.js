import uuidv4 from 'uuid/v4';
import Placeholder from '../../components/placeholder/Placeholder';

const initialUUID = uuidv4();

const initialState = {
  imports: {
    'terra-sandbox:Placeholder': Placeholder,
  },
  selected: undefined,
  workspace: {
    root: {
      [initialUUID]: {
        id: initialUUID,
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
};

export default initialState;
