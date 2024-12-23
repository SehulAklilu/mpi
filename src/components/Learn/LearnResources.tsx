import { useForm } from "react-hook-form";
import CloseClickOutside from "../Additionals/ClickOutside";
import IconButton from "../Button/IconButton";
import BasicInput from "../Inputs/BasicInput";
import NotesCard from "../Card/NotesCard";
import { useState } from "react";
import FileHolder from "../Card/FileHolder";
import LinkHolder from "../Card/LinkHolder";
import VideoHolder from "../Card/VideoHolder";
import googleImg from "../../assets/googleIcon.png";

const tabs = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Files",
  },
  {
    id: 3,
    name: "Links",
  },
  {
    id: 4,
    name: "Videos",
  },
];

const LearnResources = () => {
  const { register, handleSubmit } = useForm();
  const [select, setSelect] = useState<number>(1);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-3 my-auto relative justify-end">
        <BasicInput
          iconName={"search"}
          outline={true}
          inputType={"email"}
          placeholder={"Search for resources"}
          name="email"
          register={register}
        />
        <div className="relative">
          <IconButton
            type={"button"}
            buttonText={"filter_list"}
            backgroundStyleOn={false}
            onclick={() => {}}
            iconColor="black-65"
            outlined
            backgroundStyle
          />
          {/* {filterOn && (
              <CloseClickOutside onClose={() => {}}>
                <div className="absolute top-12 right-0 z-20 bg-white w-60 h-52 rounded-xl shadow-md">
                  Notification Dropdown
                </div>
              </CloseClickOutside>
            )} */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => (
            <>
              <button
                onClick={() => setSelect(tab.id)}
                className={` px-7 py-2 rounded-md text-Grey ${
                  select == tab.id
                    ? "bg-primary text-white font-semibold "
                    : "border"
                }`}
              >
                {tab.name}
              </button>
            </>
          ))}
        </div>
        <div>
          {select == 1 ? (
            <></>
          ) : select == 2 ? (
            <FileHolder
              fileType={"pdf"}
              fileTitle={"File Title"}
              fileSize={"2.5mb"}
              onClick={() => {}}
            />
          ) : select == 3 ? (
            <LinkHolder
              linkTitle="YouTube"
              linkURL="https://youtube.com"
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ) : select == 4 ? (
            <VideoHolder
              thumbnail={googleImg}
              videoTitle={"Video Title"}
              videoSize={"2.5mb"}
              onClick={() => {}}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnResources;
