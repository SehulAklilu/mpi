import React from "react";
import { useNavigate } from "react-router-dom";

function CustomButton2({
  label,
  style,
  url,
}: {
  label: string;
  style?: string;
  url: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/${url}`)}
      className={`mt-6 px-6 py-3 bg-orange-500 text-white rounded-full shadow-md border border-white hover:bg-orange-600 ${style} hover:bg-white  hover:border-primary hover:text-primary`}
    >
      {label}
    </button>
  );
}

export default CustomButton2;
