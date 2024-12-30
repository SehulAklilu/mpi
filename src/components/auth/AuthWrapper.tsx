import bg from "../../assets/bg.png";

const AuthWrapper = ({ children }: any) => {
  return (
    <div className="w-full h-screen relative flex">
      <div className="absolute left-0 z-10 right-0 bottom-0 top-0 ">
        <div className="bg-white/30 absolute left-0 right-0 bottom-0 top-0 z-10 "></div>
        <img className="w-full h-screen z-10" src={bg} alt="" />
      </div>
      <div className="w-[65%] p-10 z-50 relative h-[85vh] m-auto bg-white rounded-xl flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
