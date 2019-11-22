import React from 'react';
import { render } from '@testing-library/react';
import Fiber from './react-fiber';

describe('React Fiber', () => {
  describe('findNearest', () => {
    it('should find the nearest component with a valid UUID key', () => {
      const mockKey = 'b051f985-70ba-4122-9c46-2ca8f97d47b6';

      const { getByText } = render(
        <div>
          <div key={mockKey}>
            <div>Workspace</div>
          </div>
        </div>,
      );

      const start = getByText('Workspace');
      const key = Fiber.findNearest(start);

      expect(key).toEqual(mockKey);
    });

    it('should return root if root the starting node', () => {
      const { getByText } = render(<div data-terra-sandbox-root>Workspace</div>);

      const start = getByText('Workspace');
      const key = Fiber.findNearest(start);

      expect(key).toEqual('root');
    });

    it('should return null if no valid component is available in the ancestor tree', () => {
      const { getByText } = render(<div>Mock</div>);

      const start = getByText('Mock');
      const key = Fiber.findNearest(start);

      expect(key).toBeNull();
    });
  });

  describe('match', () => {
    it('should return the matched key', () => {
      const mockKey = 'b051f985-70ba-4122-9c46-2ca8f97d47b6';

      expect(Fiber.match(mockKey)).toEqual(mockKey);
    });

    it('should return the matched key with a prefix', () => {
      const mockKey = 'b051f985-70ba-4122-9c46-2ca8f97d47b6';

      expect(Fiber.match(`Prefix${mockKey}`)).toEqual(mockKey);
    });

    it('should return the matched key with a suffix', () => {
      const mockKey = 'b051f985-70ba-4122-9c46-2ca8f97d47b6';

      expect(Fiber.match(`${mockKey}Suffix`)).toEqual(mockKey);
    });

    it('should return the matched key with a prefix and a suffix', () => {
      const mockKey = 'b051f985-70ba-4122-9c46-2ca8f97d47b6';

      expect(Fiber.match(`Prefix${mockKey}Suffix`)).toEqual(mockKey);
    });

    it('should return null if the regex has no match', () => {
      expect(Fiber.match('key')).toBeNull();
    });
  });

  describe('fiberNode', () => {
    it('should return a fiber node', () => {
      const { getByText } = render(<div>Mock</div>);

      const node = getByText('Mock');
      const fiberNode = Fiber.fiberNode(node);

      expect(fiberNode.stateNode).toBeDefined();
    });
  });
});
