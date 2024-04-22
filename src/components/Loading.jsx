import loader from "/loader.gif";

const Loading = () => {
  return (
    <div className=" w-full h-full bg-black flex justify-center items-center">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loading;
