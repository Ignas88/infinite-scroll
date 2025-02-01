import {useRef} from 'react';
import {mockIntersectionObserver} from 'jsdom-testing-mocks';
import {act, render, screen} from '@testing-library/react';
import {useIntersectionObserver} from './useIntersectionObserver.ts';

const io = mockIntersectionObserver();
const callback = jest.fn();
const Mock = () => {
  const ref = useRef(null);
  useIntersectionObserver({ref, onView: callback});
  return <div ref={ref} data-testid="mock"></div>;
}
describe('useIntersectionObserver()', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should fire onView callBack when observed element becomes visible', () => {
    render(<Mock />);
    act(() => {
      io.enterNode(screen.getByTestId('mock'));
    })
    expect(screen.getByTestId('mock')).toBeInTheDocument();
    expect(callback).toHaveBeenCalled();
  });
})