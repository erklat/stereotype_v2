import Slider from "@mui/material/Slider";

const RangeSlider = ({ min, max, onChange, value }) => {
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
