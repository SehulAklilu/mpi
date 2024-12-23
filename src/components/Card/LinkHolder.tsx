import { FC } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

interface LinkHolderProps {
  linkTitle: string;
  linkURL: string;
  onClick: () => void;
}
const LinkHolder: FC<LinkHolderProps> = ({ linkTitle, linkURL, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-between items-center pr-7"
    >
      <div className="flex flex-row gap-2">
        <div className="flex justify-center items-center bg-blue text-white p-5">
          <MaterialIcon className="" icon="link" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold">{linkTitle}</p>
          <p className="">{linkURL}</p>
        </div>
      </div>
    </div>
  );
};

export default LinkHolder;
