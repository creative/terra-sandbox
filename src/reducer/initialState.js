import uuidv4 from 'uuid/v4';
import Placeholder from '../components/placeholder/Placeholder';

const initialUUID = uuidv4();

const initialState = {
  workspace: {
    root: {
      [initialUUID]: {
        id: initialUUID,
        parent: 'root',
        name: 'terra-sandbox:Placeholder',
        type: 'element',
        props: {
          expand: {
            type: 'bool',
            value: true,
          },
        },
      },
    },
  },
  imports: {
    'terra-sandbox:Placeholder': Placeholder,
  },
};

export default initialState;
