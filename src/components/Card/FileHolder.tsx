import { FC } from "react";
import MaterialIcon from "../Icon/MaterialIcon";

interface FileHolderProps {
  fileType: string;
  fileTitle: string;
  fileSize: string;
  onClick: () => void;
}
const FileHolder: FC<FileHolderProps> = ({
  fileType,
  fileSize,
  fileTitle,
  onClick,
}) => {
  return (
    <div className="flex flex-row justify-between items-center pr-7">
      <div className="flex flex-row gap-2">
        <div className="w-[5rem] h-[4.5rem] flex justify-center items-center bg-red-500 text-white p-5">
          {fileType}
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold">{fileTitle}</p>
          <p className="">{fileSize}</p>
        </div>
      </div>
      <div className="">
        <MaterialIcon
          onClick={onClick}
          className="text-Grey text-3xl hover:text-primary cursor-pointer"
          icon="download_for_offline"
        />
      </div>
    </div>
  );
};

export default FileHolder;
