import { getChildren } from "@/api/children.api";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { invite, InvitePayload } from "@/api/children.api";
import { toast } from "react-toastify";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { Button } from "@/components/ui/button";

interface CardProps {
  id: string;
  firstName: string;
  avatar: string;
  email: string;
  lastName: string;
}
const FormSchema = z.object({
  email: z.string({ required_error: "Email is Required!" }).email(),
});

interface CardProps {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

const PlayerCard: React.FC<CardProps> = ({
  id,
  firstName,
  lastName,
  avatar,
  email,
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      onClick={() => navigate(`/children/${id}`)}
      className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-64 hover:shadow-primary cursor-pointer transition-shadow duration-300"
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
        />
      </div>

      {/* Player Info */}
      <div className="text-center">
        <h3 className="text-md sm:text-lg font-semibold">
          {firstName} {lastName}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">{email}</p>
        <p className="mt-2 text-xs sm:text-sm text-primary">UTSA #18</p>
      </div>
    </div>
  );
};

const PlayerCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64">
      {/* Profile Image Skeleton */}
      <div className="flex justify-center mb-4">
        <Skeleton className="w-24 h-24 rounded-full" />
      </div>

      {/* Player Info Skeleton */}
      <div className="text-center">
        <Skeleton className="w-3/4 h-4 mb-2" /> {/* Name Skeleton */}
        <Skeleton className="w-1/2 h-3 mb-2" /> {/* Email Skeleton */}
        <Skeleton className="w-1/2 h-3" /> {/* UTSA #18 Skeleton */}
      </div>
    </div>
  );
};

function ChildrenPage() {
  const {
    data: childrens,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
  });

  const [isOpen, setIsOpen] = useState(false);
  type FormValues = z.infer<typeof FormSchema>;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const invitePlayer = useMutation({
    mutationKey: ["invitePlayer"],
    mutationFn: (payload: InvitePayload) => invite(payload),
    onSuccess: (response) => {
      toast.success(getAxiosSuccessMessage(response));
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(getAxiosErrorMessage(error));
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload: InvitePayload = {
      email: data.email,
      relationship: "child",
    };
    invitePlayer.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 mt-20">
        {[1, 2, 3].map((value) => (
          <PlayerCardSkeleton key={value} />
        ))}
      </div>
    );
  }

  return (
    <ContentLayout>
      <h1 className="text-2xl font-semibold px-2 my-4">Players</h1>
      <div className="flex gap-4 mx-4 flex-wrap">
        {childrens?.players?.map((children) => (
          <PlayerCard
            id={children._id}
            lastName={children.lastName}
            firstName={children.firstName}
            avatar={children.avatar}
            email={children.emailAddress.email}
          />
        ))}
      </div>
      <div
        className="bg-gradient-to-b z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FaPlusCircle className="text-white text-2xl" />
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <DialogContent className="">
          <DialogTitle className="text-lg">Invite A Player</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        className="py-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end my-2">
                <Button className="py-2  px-4 flex gap-2 bg-primary text-white rounded-md">
                  Invite
                  {invitePlayer.isLoading && (
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
}

export default ChildrenPage;
