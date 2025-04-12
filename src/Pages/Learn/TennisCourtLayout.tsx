const TennisCourtLayout = ({ children }: any) => {
  return (
    <div className="relative w-full h-full bg-[#ECF1E9]">
      {/* Tennis Court Container */}
      <div className="relative w-[80%] h-[720px] border-4 border-white">
        {/* Outer Doubles Sidelines - already drawn by container */}

        {/* Singles Sidelines */}
        <div className="absolute top-0 bottom-0 left-[17%] border-l-2 border-white"></div>
        <div className="absolute top-0 bottom-0 right-[17%] border-l-2 border-white"></div>

        {/* Baselines - already drawn by container */}

        {/* Service Boxes (Top and Bottom) */}
        <div className="absolute top-[180px] w-[65%] left-1/2 right-1/2 -translate-x-1/2 border-t-2 border-white"></div>
        <div className="absolute bottom-[180px] w-[65%] left-1/2 right-1/2 -translate-x-1/2 border-t-2 border-white"></div>

        {/* Net */}
        <div className="absolute top-1/2 left-0 right-0 border-t-4 border-white -translate-y-1/2"></div>

        {/* Center Service Line */}
        <div className="absolute top-[180px] bottom-[180px] left-1/2 border-l-2 border-white -translate-x-1/2"></div>

        {/* Center Marks (small tick on baselines) */}
        <div className="absolute top-0 left-1/2 w-[2px] h-3 bg-white -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-[2px] h-3 bg-white -translate-x-1/2"></div>
      </div>

      {/* Top Layer Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default TennisCourtLayout;
