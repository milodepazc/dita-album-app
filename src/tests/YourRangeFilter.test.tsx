import { render, fireEvent } from '@testing-library/react';
import YearRangeFilter from '../components/filters/YearRangeFilter';

describe('YearRangeFilter', () => {
  it('calls onYearRangeChange when slider is moved', () => {
    const mockOnYearRangeChange = jest.fn();

    const { getByLabelText } = render(
      <YearRangeFilter
        selectedMinYear={2000}
        selectedMaxYear={2020}
        minYear={1990}
        maxYear={2025}
        onYearRangeChange={mockOnYearRangeChange}
      />,
    );

    // Simulate changing the Min Year input
    const minYearInput = getByLabelText('Min Year:');
    fireEvent.change(minYearInput, { target: { value: '1995' } });

    // Simulate blurring the Min Year input (to trigger validation)
    fireEvent.blur(minYearInput);

    // Simulate changing the Max Year input
    const maxYearInput = getByLabelText('Max Year:');
    fireEvent.change(maxYearInput, { target: { value: '2020' } });

    // Simulate blurring the Max Year input
    fireEvent.blur(maxYearInput);

    // Assert that the onYearRangeChange is called with the updated values
    expect(mockOnYearRangeChange).toHaveBeenCalledWith({
      minYear: 1995,
      maxYear: 2020,
    });
  });
});
