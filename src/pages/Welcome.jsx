import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col text-[#000]">
      <h1 className="text-6xl font-bold m-4 text-[#000]">Welcome</h1>
      <Link to={"/alllesson"} className="hover:text-blue-500 text-[#000] text-[16px]">👉 Go to lesson list</Link>
    </div>
  );
};

export default Welcome;
