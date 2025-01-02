import { useState, useEffect } from "react";
import IconAndButton from "../components/Button/IconAndButton";
import IconButton from "../components/Button/IconButton";
import BasicInput from "../components/Inputs/BasicInput";
import { useForm } from "react-hook-form";
import CloseClickOutside from "../components/Additionals/ClickOutside";
import JournalCard, { JournalCardProps } from "../components/Card/JournalCard";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios.ts";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

interface FilterInf {
  search: string | null;
  // Add more properties here if your backend provides more fields
}

const Journal = () => {
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [journals, setJournals] = useState<JournalCardProps[]>([]);
  // const { register, handleSubmit } = useForm();
  const [filters, setFilters] = useState<FilterInf>({
    search: null,
  });
  const navigate = useNavigate();

  const { isLoading, data: result } = useQuery(
    "journals",
    () => axios.get("/api/v1/journals"),
    {
      onSuccess(data) {
        console.log(data, "Journals");
        setJournals(data.data || []);
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading journals"
        );
      },
    }
  );

  useEffect(() => {
    function filterData() {
      if (!result) return;
      if (!filters.search || filters.search.length < 1) {
        setJournals(result.data);
      }
      const filteredData = result.data.filter((d: JournalCardProps) =>
        d.title
          .toLowerCase()
          .includes(filters.search ? filters.search.toLowerCase() : "")
      );
      setJournals(filteredData);
    }
    filterData();
  }, [filters]);

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
        <div className="flex pt-1 flex-row gap-3 my-auto relative mt5">
          <Input
            className=""
            onChange={({ target }) =>
              setFilters((fil) => ({ ...fil, search: target.value }))
            }
            placeholder="Search with title..."
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
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 ">
        {journals.map((journal) => (
          <JournalCard key={journal._id} journal={journal} />
        ))}
        {isLoading &&
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map(() => {
            return <Skeleton className="h-32 bg-primary" />;
          })}
      </div>
    </div>
  );
};

export default Journal;
