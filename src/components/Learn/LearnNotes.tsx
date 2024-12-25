import { useForm } from "react-hook-form";
import CloseClickOutside from "../Additionals/ClickOutside";
import IconButton from "../Button/IconButton";
import BasicInput from "../Inputs/BasicInput";
import NotesCard from "../Card/NotesCard";

const LearnNotes = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-3 my-auto relative justify-end">
        <BasicInput
          iconName={"search"}
          outline={true}
          inputType={"email"}
          placeholder={"Search for your notes"}
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
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 ">
        <NotesCard
          color="#F2851C"
          notesTitle={"Notes Title"}
          notesDesc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cum voluptatem ex quod Aliquid, ea"
          }
        />
        <NotesCard
          color="#2D63E3"
          notesTitle={"Notes Title"}
          notesDesc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cum voluptatem ex quod Aliquid, ea"
          }
        />
      </div>
    </div>
  );
};

export default LearnNotes;
