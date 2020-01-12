import TreeParser from './tree-parser';
import mockCanvas from './test-data/mocks/mock-canvas';
import mockReplacement from './test-data/mocks/mock-element-replacement';
import expected1 from './test-data/expects/expected1';
import expected2 from './test-data/expects/expected2';

describe('Tree Parser', () => {
  describe('replace', () => {
    it('should replace the target node with the specified replacement', () => {
      const tree = TreeParser.replace(mockCanvas, '6acb405b-77bf-4a71-9371-e7b366f1edf0', mockReplacement);

      expect(tree).toEqual(expected1);
    });

    it('should replace the target node with the specified replacement', () => {
      const tree = TreeParser.replace(mockCanvas, 'a3f27357-d0c3-4c50-96a4-1d65c564b959', mockReplacement);

      expect(tree).toEqual(expected2);
    });
  });

  describe('replaceElement', () => {
    it('should replace the target node with the specified replacement', () => {
      const tree = TreeParser.replace(mockCanvas, '6acb405b-77bf-4a71-9371-e7b366f1edf0', mockReplacement);

      expect(tree).toEqual(expected1);
    });
  });
});
