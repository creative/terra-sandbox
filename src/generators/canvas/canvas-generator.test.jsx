
import CanvasGenerator from './canvas-generator';
import Placeholder from '../../components/placeholder/Placeholder';
import Canvas from '../../components/canvas/Canvas';
import mockCanvas1 from './test-data/mocks/mock-canvas1';
import mockCanvas2 from './test-data/mocks/mock-canvas2';
import expected1 from './test-data/expects/expected1';
import expected2 from './test-data/expects/expected2';

describe('Canvas Generator', () => {
  describe('generate', () => {
    it('should generate a canvas', () => {
      const imports = {
        'terra-sandbox:Canvas': Canvas,
        'terra-sandbox:Placeholder': Placeholder,
      };

      const result = JSON.stringify(CanvasGenerator.generate(imports, mockCanvas1));

      expect(result).toEqual(JSON.stringify(expected1));
    });

    it('should generate a canvas with multiple children', () => {
      const imports = {
        'terra-sandbox:Canvas': Canvas,
        'terra-sandbox:Placeholder': Placeholder,
      };

      const result = JSON.stringify(CanvasGenerator.generate(imports, mockCanvas2));

      expect(result).toEqual(JSON.stringify(expected2));
    });
  });

  describe('import', () => {
    it('should return the canvas import', () => {
      const imports = {
        'terra-sandbox:Canvas': Canvas,
        'terra-sandbox:Placeholder': Placeholder,
      };

      const result = CanvasGenerator.import(imports, mockCanvas1.value);

      expect(result).toEqual(Canvas);
    });

    it('should return the placeholder import', () => {
      const imports = {
        'terra-sandbox:Canvas': Canvas,
        'terra-sandbox:Placeholder': Placeholder,
      };

      const placeholder = { name: 'terra-sandbox:Placeholder', props: {} };

      const result = CanvasGenerator.import(imports, placeholder);

      expect(result).toEqual(Placeholder);
    });
  });

  describe('element', () => {
    it('should generate a canvas element', () => {
      const imports = {
        'terra-sandbox:Canvas': Canvas,
        'terra-sandbox:Placeholder': Placeholder,
      };

      const result = JSON.stringify(CanvasGenerator.element(imports, mockCanvas1));

      expect(result).toEqual(JSON.stringify(expected1));
    });
  });
});
