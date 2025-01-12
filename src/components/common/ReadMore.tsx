import React, { useState } from "react";

interface ReadMoreProps {
  text: string;
  previewLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, previewLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="tracking-wide text-[#27275a]">
      {text?.length > previewLength ? (
        <>
          {isExpanded ? text : `${text.slice(0, previewLength)}...`}
          <button
            onClick={toggleReadMore}
            className="ml-1 text-[#ff9328] hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </>
      ) : (
        text
      )}
    </div>
  );
};

export default ReadMore;
