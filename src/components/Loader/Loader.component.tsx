import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="flex justify-center items-center text-brand-70">
      <CircularProgress size={24} color="inherit" />
    </div>
  );
};

export default Loader;
