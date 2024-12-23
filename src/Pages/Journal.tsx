import { useState, useEffect  } from "react";
import axios from "axios";
import IconAndButton from "../components/Button/IconAndButton";
import IconButton from "../components/Button/IconButton";
import BasicInput from "../components/Inputs/BasicInput";
import { useForm } from "react-hook-form";
import CloseClickOutside from "../components/Additionals/ClickOutside";
import JournalCard from "../components/Card/JournalCard";
import { useNavigate } from "react-router-dom";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  // Add more properties here if your backend provides more fields
}

const Journal = () => {
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get("http://194.5.159.228:3000/api/v1/journals");
        setJournals(response.data); // Assuming the API response directly returns the list of journals
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="flex flex-col gap-11 relative font-raleway ">
      <div className="flex flex-row justify-between pr-7 relative ">
        <IconAndButton
          type={"button"}
          buttonText={"edit"}
          backgroundStyleOn={false}
          onclick={() => navigate("/newJournal")}
          iconColor="black-65"
          buttonText2="New Journal"
          outlined
          bgcolor="primary"
        />
        <div className="flex flex-row gap-3 my-auto relative">
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
              onclick={() => setFilterOn(true)}
              iconColor="black-65"
              outlined
              backgroundStyle
            />
            {filterOn && (
              <CloseClickOutside onClose={() => setFilterOn(false)}>
                <div className="absolute top-12 right-0 z-20 bg-white w-60 h-52 rounded-xl shadow-md">
                  Notification Dropdown
                </div>
              </CloseClickOutside>
            )}
          </div>
        </div>
      </div>
      <div>
        {journals.map((journal) => (
          <JournalCard key={journal.id} title={journal.title} content={journal.content} date={journal.date} />
        ))}
      </div>
    </div>
  );
};

export default Journal;
