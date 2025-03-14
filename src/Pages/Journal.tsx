import { useState, useEffect } from "react";
import JournalCard, { JournalCardProps } from "../components/Notes/JournalCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { FaX } from "react-icons/fa6";
import { LoaderCircle } from "lucide-react";
import folderImage from "../assets/pngwing.com.png";
import { extractDateTime, formatDateTime } from "@/lib/utils";
import { FaFolderOpen } from "react-icons/fa6";
import { IoChevronBackSharp } from "react-icons/io5";

interface FilterInf {
  search: string | null;
  // Add more properties here if your backend provides more fields
}

export interface FolderInterface {
  createdAt: string;
  name: string;
  updatedAt: string;
  user: string;
  _id: string;
}

const Journal = () => {
  const [journals, setJournals] = useState<JournalCardProps[]>([]);
  const [folders, setFolders] = useState<FolderInterface[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<
    FolderInterface | undefined
  >(undefined);
  const [active, setActive] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

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

  const createFolder = useMutation(
    (name: string) => axios.post("/api/v1/folders", { name }),
    {
      onSuccess(data) {
        toast.success("Folder created successfully!");
        queryClient.invalidateQueries("getfolders");
        setIsOpen(false);
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string" ? err.response?.data : "Error"
        );
      },
    }
  );

  const foldersQuery = useQuery(
    "getfolders",
    () => axios.get("/api/v1/folders"),
    {
      onSuccess(data) {
        setFolders(data?.data);
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string" ? err.response?.data : "Error"
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
      <div className="flex flex-col  px-2 pt-1 gap-4  font-raleway ">
        <div className="flex flex-row justify-between items-center pr-7 relative ">
          <div className="text-xl font-semibold pl-4 sm:pl-0">Journals</div>

          <div className="flex pt-1 flex-row  relative ">
            <Input
              className=""
              onChange={({ target }) =>
                setFilters((fil) => ({ ...fil, search: target.value }))
              }
              placeholder="Search with title..."
            />
            {/* <div className="relative">
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
            </div> */}
          </div>
        </div>
        <div className="w-full px-4 flex gap-4 bg-gray-100 py-1 ">
          {["All", "Folder"].map((value) => (
            <button
              className={`px-4 py-2 border rounded-lg ${
                active == value ? "bg-primary text-white" : "bg-gray-300"
              } `}
              key={value}
              onClick={() => {
                setActive(value);
                setSelectedFolder(undefined);
              }}
            >
              {value}
            </button>
          ))}
        </div>
        <Link
          to={`/journal/new`}
          className="bg-gradient-to-b z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
        >
          <CiEdit className="text-white text-2xl" />
        </Link>

        <div>
          {active === "All" ? (
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3 pb-32">
              {[...journals].reverse().map((journal) => (
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
          ) : (
            <div>
              <div className="w-full flex items-center justify-between pr-4 ">
                <div>
                  {selectedFolder && (
                    <div className="flex gap-2 items-center">
                      <IoChevronBackSharp
                        className="text-lg cursor-pointer"
                        onClick={() => setSelectedFolder(undefined)}
                      />
                      <FaFolderOpen className="text-xl text-primary " />
                      <h1 className="text-xl font-semibold">
                        {selectedFolder.name}
                      </h1>
                    </div>
                  )}
                </div>
                <button
                  className="py-2 px-4 rounded-md bg-primary text-white"
                  onClick={() => setIsOpen(true)}
                >
                  Add Folder
                </button>
              </div>
              <div>
                {selectedFolder ? (
                  <div className="border p-2 rounded-md bg-white min-h-[70vh] mt-2">
                    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-3 pb-32">
                      {[...journals]
                        .reverse()
                        .filter(
                          (journal) =>
                            journal?.folderId?._id === selectedFolder._id
                        )
                        .map((journal) => (
                          <JournalCard key={journal._id} journal={journal} />
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 pb-32">
                    {[...folders].reverse().map((folder) => (
                      <div
                        className="w-40 flex flex-col justify-center items-center border border-primary rounded-md cursor-pointer"
                        onClick={() => setSelectedFolder(folder)}
                      >
                        <img
                          className="w-30 h-20 object-cover "
                          src={folderImage}
                        />
                        <p className="py-1 font-medium text-center">
                          {folder.name}
                        </p>
                        <p className="text-xs text-center">
                          {extractDateTime(folder.createdAt)?.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {foldersQuery.isLoading &&
                  [2, 2, 2, 2, 2, 2].map(() => {
                    return (
                      <Skeleton className="h-[10vh] z-10 rounded-xl bg-white">
                        <Skeleton className="w-full h-[10vh] rounded-t-xl bg-primary " />
                      </Skeleton>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="min-h-[30vh] text-sm bg-white overflow-auto flex flex-col">
            <div className="flex justify-between w-full ">
              <div className="w-fit font-semibold text-lg">Create a Folder</div>
              <AlertDialogCancel className="border p-1 w-fit">
                <FaX />
              </AlertDialogCancel>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 flex-col">
                <div>Folder Name</div>
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <AlertDialogCancel className="border p-2 w-full rounded-full">
                  Cancel
                </AlertDialogCancel>
                <Button
                  onClick={() => {
                    content && createFolder.mutate(content);
                  }}
                  className="bg-primary flex items-center justify-center gap-2 py-2 text-lg text-white rounded-full w-full"
                >
                  Add
                  {createFolder.isLoading && (
                    <LoaderCircle
                      style={{
                        animation: "spin 1s linear infinite",
                        fontSize: "2rem",
                        color: "#FFFFFF",
                      }}
                    />
                  )}
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ContentLayout>
  );
};

export default Journal;
