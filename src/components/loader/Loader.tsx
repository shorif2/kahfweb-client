import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Triangle
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
