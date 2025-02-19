import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueries, useQuery } from "react-query";
import {
  createAnnouncements,
  getAnnouncements,
  getMyAnnouncements,
  MyAnnouncementsResponse,
} from "@/api/chat.api";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const TodayAnnouncementCard: React.FC<MyAnnouncementsResponse> = ({
  id,
  title,
  description,
  category,
  showButton,
  editAnnouncement,
}) => {
  return (
    <div
      className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4 border border-gray-200 hover:border hover:border-primary hover:shadow-sm hover:shadow-primary cursor-pointer"
      onClick={() => editAnnouncement && editAnnouncement(id)}
    >
      <div className="w-12 h-12 rounded-full bg-gray-300"></div>
      <div className="flex-1 flex justify-between">
        <div className="flex-1">
          <div className="">
            <h3 className="text-lg font-medium text-[#152946]">{title}</h3>

            <p className="text-gray-700 mt-2 text-sm">{description}</p>
          </div>
          {showButton ? (
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">
              Show in Matches
            </button>
          ) : null}
        </div>
        <div className="flex flex-col items-end justify-between">
          <span className="border border-primary px-3 py-1 text-sm rounded-full shadow shadow-primary">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "First Name must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "First Name must be at least 3 characters.",
  }),
  category: z.string(),
});

type CategorizedAnnouncements = {
  Today: MyAnnouncementsResponse[];
  Yesterday: MyAnnouncementsResponse[];
  "Last Week": MyAnnouncementsResponse[];
  "Last Month": MyAnnouncementsResponse[];
  Older: MyAnnouncementsResponse[];
};

const Announcements: React.FC = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    Today: true,
  });
  const [onEdit, setOnEdit] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const { isLoading, mutate } = useMutation({
    mutationKey: ["createAnnouncements"],
    mutationFn: createAnnouncements,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      setIsOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const onSubmit = (payload: z.infer<typeof FormSchema>) => {
    mutate(payload);
  };

  const editAnnouncement = (id: string) => {
    const announcement = announcements?.find(
      (announcement) => announcement.id === id
    );
    if (announcement) {
      setIsOpen(true);
      setOnEdit(true);
      form.setValue("title", announcement.title);
      form.setValue("description", announcement.description);
      form.setValue("category", announcement.category);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isLoading: isGettingAnnouncement, data: announcements } = useQuery({
    queryKey: ["Announcement"],
    queryFn: getMyAnnouncements,
  });

  function categorizeAnnouncements(
    announcements: MyAnnouncementsResponse[]
  ): CategorizedAnnouncements {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const categories: CategorizedAnnouncements = {
      Today: [],
      Yesterday: [],
      "Last Week": [],
      "Last Month": [],
      Older: [],
    };

    announcements.forEach((item) => {
      const createdAt = new Date(item.createdAt);

      if (createdAt.toDateString() === today.toDateString()) {
        categories.Today.push(item);
      } else if (createdAt.toDateString() === yesterday.toDateString()) {
        categories.Yesterday.push(item);
      } else if (createdAt > lastWeek) {
        categories["Last Week"].push(item);
      } else if (createdAt > lastMonth) {
        categories["Last Month"].push(item);
      } else {
        categories.Older.push(item);
      }
    });

    return categories;
  }

  const categorizedAnnouncements: CategorizedAnnouncements | null =
    announcements ? categorizeAnnouncements(announcements) : null;

  return (
    <div className=" mx-auto p-4 space-y-4">
      <Input
        type="text"
        id="full_name"
        placeholder="Search..."
        className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
        startIcon={FaSearch}
      />
      <div className="flex items-center justify-end">
        <button
          className="py-2 px-4 rounded-lg text-white bg-primary border border-white hover:bg-orange-500 "
          onClick={() => setIsOpen(true)}
        >
          Create Announcement
        </button>
      </div>
      {categorizedAnnouncements &&
        Object.entries(categorizedAnnouncements)
          .filter(([title, items]) => items.length > 0) // Hides empty categories
          .map(([title, items]) => (
            <div key={title} className="p-2 rounded-lg">
              <div
                className="flex justify-between items-center cursor-pointer p-2"
                onClick={() => toggleSection(title)}
              >
                <h2 className="text-lg text-[#152946] font-semibold">
                  {title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                    {items.length > 99 ? "99+" : items.length}
                  </div>
                  {openSections[title] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {openSections[title] && items.length > 0 && (
                <div className="space-y-2">
                  {items
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    ) // Sort items by `createdAt`
                    .map((item, index) => (
                      <TodayAnnouncementCard
                        key={index}
                        {...item}
                        showButton={title === "Today"}
                        editAnnouncement={(id: string) => editAnnouncement(id)}
                      />
                    ))}
                </div>
              )}
              <hr />
            </div>
          ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="">
          <DialogTitle className="text-lg">Create Announcement</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="title"
                        placeholder="Title"
                        className={"shadow !bg-white "}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label className="font-medium">Description</label>
                <textarea
                  id="description"
                  placeholder="Description..."
                  rows={2}
                  className="w-full border !rounded-lg p-2"
                  {...form.register("description")}
                />
              </div>

              {/* <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={"shadow !h-10 !py-4 !px-4 !bg-white"}
                      >
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">Match</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="mt-6 w-full">
                  <button
                    className="py-2 px-4 rounded-lg w-full text-white bg-primary border border-white hover:bg-orange-500 "
                    onClick={() => setIsOpen(true)}
                  >
                    {isLoading ? (
                      <LoaderCircle
                        style={{
                          animation: "spin 1s linear infinite",
                          fontSize: "2rem",
                          color: "#FFFFFF",
                        }}
                      />
                    ) : (
                      <span></span>
                    )}
                  </button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
