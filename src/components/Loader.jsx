import loadgif from "../assets/3.gif";
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 ">
      <img className=" h-[20%] w-auto" src={loadgif} alt="loading gif" />
    </div>
  );
};
export default Loader;
