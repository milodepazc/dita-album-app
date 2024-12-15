import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface YearRange {
  minYear: number;
  maxYear: number;
}

interface YearRangeFilterProps {
  selectedMinYear: number | null;
  selectedMaxYear: number | null;
  minYear: number;
  maxYear: number;
  onYearRangeChange: (range: YearRange) => void;
}

const YearRangeFilter: React.FC<YearRangeFilterProps> = ({
  selectedMinYear,
  selectedMaxYear,
  minYear,
  maxYear,
  onYearRangeChange,
}) => {
  const [yearRange, setYearRange] = useState<[number, number]>([
    selectedMinYear ?? minYear,
    selectedMaxYear ?? maxYear,
  ]);

  useEffect(() => {
    setYearRange([selectedMinYear ?? minYear, selectedMaxYear ?? maxYear]);
  }, [selectedMinYear, selectedMaxYear, minYear, maxYear]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const [newMinYear, newMaxYear] = value;
      setYearRange([newMinYear, newMaxYear]);
      onYearRangeChange({ minYear: newMinYear, maxYear: newMaxYear });
    }
  };

  const handleMinYearBlur = () => {
    const newMinYear = Math.max(minYear, Math.min(yearRange[0], yearRange[1]));
    setYearRange([newMinYear, yearRange[1]]);
    onYearRangeChange({ minYear: newMinYear, maxYear: yearRange[1] });
  };

  const handleMaxYearBlur = () => {
    const newMaxYear = Math.min(maxYear, Math.max(yearRange[1], yearRange[0]));
    setYearRange([yearRange[0], newMaxYear]);
    onYearRangeChange({ minYear: yearRange[0], maxYear: newMaxYear });
  };

  const handleMinYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = Number(e.target.value);
    setYearRange([inputYear, yearRange[1]]);
  };

  const handleMaxYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = Number(e.target.value);
    setYearRange([yearRange[0], inputYear]);
  };

  return (
    <div>
      <Slider
        range
        min={minYear}
        max={maxYear}
        value={yearRange}
        onChange={handleSliderChange}
        allowCross={false}
      />
      <div className="d-flex justify-content-between mt-2">
        <div>
          <label htmlFor="min-year">Min Year: </label>
          <input
            id="min-year"
            type="number"
            className="form-control"
            value={yearRange[0]}
            min={minYear}
            max={yearRange[1]}
            onChange={handleMinYearChange}
            onBlur={handleMinYearBlur}
          />
        </div>
        <div>
          <label htmlFor="max-year">Max Year: </label>
          <input
            id="max-year"
            type="number"
            className="form-control"
            value={yearRange[1]}
            min={yearRange[0]}
            max={maxYear}
            onChange={handleMaxYearChange}
            onBlur={handleMaxYearBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default YearRangeFilter;
