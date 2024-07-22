import Slider from "@mui/material/Slider";

type TSliderProps = {
  min: number;
  max: number;
  onChange: (value: number | number[]) => void;
  value: number;
};

const RangeSlider = ({ min, max, onChange, value }: TSliderProps) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue);
  };

  return (
    <Slider
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
    />
  );
};

export default RangeSlider;
