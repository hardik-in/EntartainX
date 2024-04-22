import notfound from "/notfound.gif";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <img className="" src={notfound} alt="" />
    </div>
  );
};

export default NotFound;
