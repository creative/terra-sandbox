import Canvas from '../../components/canvas/Canvas';
import Placeholder from '../../components/placeholder/Placeholder';
import ExampleGenerator from '../../generators/example/example-generator';

const initialState = {
  imports: {
    'terra-sandbox:Canvas': Canvas,
    'terra-sandbox:Placeholder': Placeholder,
  },
  selected: undefined,
  canvas: ExampleGenerator.generate({ type: 'element', name: 'terra-sandbox:Canvas' }),
};

export default initialState;
