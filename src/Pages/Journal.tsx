import { useState, useEffect } from "react";
import IconAndButton from "../components/Button/IconAndButton";
import IconButton from "../components/Button/IconButton";
import BasicInput from "../components/Inputs/BasicInput";
import { useForm } from "react-hook-form";
import CloseClickOutside from "../components/Additionals/ClickOutside";
import JournalCard, { JournalCardProps } from "../components/Notes/JournalCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios.ts";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
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
    <ContentLayout>
      <div className="flex flex-col  px-2 pt-1 gap-11  font-raleway ">
        {/* <div className="flex flex-row justify-between pr-7 relative ">
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
      </div> */}
        <Link
          to="/newJournal"
          className="bg-gradient-to-b z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
        >
          <CiEdit className="text-white text-2xl" />
        </Link>
        <div className="text-xl font-semibold pt-4">Journals</div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3 pb-32">
          {journals.map((journal) => (
            <JournalCard key={journal._id} journal={journal} />
          ))}
          {isLoading &&
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map(() => {
              return (
                <Skeleton className="h-[40vh] z-10 rounded-xl bg-white">
                  <Skeleton className="w-full h-[10vh] rounded-t-xl bg-primary " />
                </Skeleton>
              );
            })}
        </div>
      </div>
    </ContentLayout>
  );
};

export default Journal;
