import {useRef} from 'react';
import {mockIntersectionObserver} from 'jsdom-testing-mocks';
import {act, render, screen} from '@testing-library/react';
import {useIntersectionObserver} from './useIntersectionObserver.ts';

const TEST_ID = 'mock';
const io = mockIntersectionObserver();
const callback = jest.fn();
const Mock = () => {
  const ref = useRef(null);
  useIntersectionObserver({ref, onView: callback});
  return <div ref={ref} data-testid={TEST_ID}></div>;
}
describe('useIntersectionObserver()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it('should fire onView callBack when observed element becomes visible', () => {
    render(<Mock />);
    act(() => {
      io.enterNode(screen.getByTestId(TEST_ID));
    })
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(callback).toHaveBeenCalled();
  });
})