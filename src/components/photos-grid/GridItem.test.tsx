import {mockIntersectionObserver} from 'jsdom-testing-mocks';
import {act, render, screen} from '@testing-library/react';
import {GridItem} from './GridItem';

const io = mockIntersectionObserver();
const callback = jest.fn();
describe('<GridItem />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should fire onView callBack when observed element becomes visible', () => {
    render(
      <GridItem
        isObservable={true}
        onView={() => callback()}
        id={123}
        photographer="test"
        alt="test"
        src={{small: 'test', medium: 'test', large: 'test'}}
        onClick={() => null}
      />
    );
    act(() => {
      io.enterNode(screen.getByTestId('123'));
    })
    expect(screen.getByTestId('123')).toBeInTheDocument();
    expect(callback).toHaveBeenCalled();
  });
})