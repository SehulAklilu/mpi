import { getPlayers } from "@/api/match.api";
import ProfileCard from "@/components/Players/ProfileCard";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
  email: z.string({ required_error: "Email is Required!" }).email(),
});

function Players() {
  const {
    data: players,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers("players"),
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
      relationship: "player",
    };
    invitePlayer.mutate(payload);
  };

  if (!players) {
    return;
  }

  return (
    <ContentLayout>
      <div className="bg-white min-h-[100vh] px-10 rounded-md ">
        <div className="p-4 rounded-lg">
          <Input
            type="text"
            id="full_name"
            placeholder="Search..."
            className={"py-2 w-full !rounded-lg !outline-none !bg-white"}
            startIcon={FaSearch}
          />
        </div>
        <section>
          <div className="flex items-center justify-between py-1">
            <h1>Your Players</h1>
            <span className="text-primary underline cursor-pointer text-sm">
              View All
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {players.players?.map((player) => (
              <ProfileCard key={player._id} player={player} />
            ))}
          </div>
        </section>
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

export default Players;
