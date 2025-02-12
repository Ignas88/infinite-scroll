import { useRef } from 'react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import { act, render, screen } from '@testing-library/react';
import { useIntersectionObserver } from './useIntersectionObserver.ts';

const TEST_ID = 'mock';
const io = mockIntersectionObserver();
const callback = jest.fn();
const Mock = () => {
  const ref = useRef(null);
  useIntersectionObserver({ref, onView: callback});
  return <div ref={ref} data-testid={TEST_ID}></div>;
};
describe('useIntersectionObserver()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fire onView callBack when observed element becomes visible', () => {
    render(<Mock/>);
    const observable = screen.getByTestId(TEST_ID);
    act(() => {
      io.enterNode(observable);
    });
    expect(observable).toBeInTheDocument();
    expect(callback).toHaveBeenCalled();
  });
  it('should fire onView callBack only ONCE - when observed element becomes visible first time', () => {
    render(<Mock/>);
    const observable = screen.getByTestId(TEST_ID);
    act(() => {
      io.enterNode(observable);
      io.leaveNode(observable);
      io.enterNode(observable);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});