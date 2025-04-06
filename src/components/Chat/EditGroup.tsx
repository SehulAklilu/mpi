import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { FiUploadCloud } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getGroupsById } from "@/api/group-chat.api";
import axiosInstance from "@/api/axios";
import { Input } from "../ui/input";
import MultiSelectDropdown from "../MultipleDropDown";
import { getFriends } from "@/api/chat.api";
import { extractUsers } from "@/lib/utils";
import { FaTrash } from "react-icons/fa";
import { ProfileDataInterface } from "./ProfileCardNew";
import { User } from "@/types/chat.type";
const FormSchema = z.object({
  group_name: z.string(),
  avatar: z.any().optional(),
  members: z.array(z.string()).min(1, "At least one member is required"),
});
type Props = {
  groupId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onlineUsers: string[] | undefined;
};
function EditGroup({ groupId, open, setOpen, onlineUsers }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      members: [],
    },
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const queryClient = useQueryClient();
  const user_id = Cookies.get("user_id");

  const handlePhotoSend = async () => {
    if (previewImage && previewImage?.startsWith("data:image")) {
      const formData = new FormData();

      const blob = await fetch(previewImage).then((res) => res.blob());
      formData.append("photo", blob, "image.jpg"); // Name it properly
      uploadPhoto.mutate(formData);
    }
  };

  const { data: friends_data } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const updateName = useMutation(
    () =>
      axiosInstance.patch(`/api/v1/chats/group/${groupId}/name`, {
        chatName: groupName,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("group-chat");
        setOpen(false);
      },
    }
  );

  const removeMember = useMutation(
    (userIds: string[]) =>
      axiosInstance.delete(`/api/v1/chats/group/${groupId}/remove`, {
        data: { userIds },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("group-chat");
        setOpen(false);
      },
    }
  );

  const leveGroup = useMutation(
    () => axiosInstance.delete(`/api/v1/chats/group/${groupId}/leave`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("group-chat");
        setOpen(false);
      },
    }
  );

  const addUser = useMutation(
    () =>
      axiosInstance.post(`/api/v1/chats/group/${groupId}/add`, {
        userIds: form.getValues("members"),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("group-chat");
        setOpen(false);
      },
    }
  );

  const uploadPhoto = useMutation((formData: FormData) => {
    return axiosInstance.patch(
      `/api/v1/chats/group/${groupId}/photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  });

  const { data: groupChat } = useQuery({
    queryKey: ["group-chat", groupId],
    queryFn: () => getGroupsById(groupId),
    enabled: !!groupId,
    onSuccess: (res) => {
      setGroupName(res?.chatName);
    },
  });

  const friends =
    friends_data && user_id && extractUsers(friends_data, user_id);

  const getFilteredFriends = (
    friends: ProfileDataInterface[],
    users: User[]
  ) => {
    if (!friends || !users) {
      return [];
    }
    const userIds = users.map((user) => user._id);

    return friends.filter((friend) => !userIds.includes(friend.user_id));
  };

  const filteredFriends = getFilteredFriends(
    friends || [],
    groupChat?.users || []
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-x-hidden custom-scrollbar-two rounded-2xl bg-white p-6">
        <Form {...form}>
          <form className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center text-center gap-2">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-[#F0F0FF] border border-[#e3e3fd] flex items-center justify-center overflow-hidden shadow-md transition-all group-hover:scale-105 duration-200">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Uploaded preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <LuImagePlus className="text-gray-400 text-2xl" />
                          )}
                        </div>
                        <input
                          {...fieldProps}
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              onChange(file);
                              const reader = new FileReader();
                              reader.onload = () =>
                                setPreviewImage(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1 text-center" />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground max-w-sm">
                Drag/Upload Group Picture or Leave to use Your Profile Picture
              </p>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="py-2 px-5 bg-primary text-white rounded-lg font-medium shadow hover:bg-primary/90 transition"
                onClick={() => handlePhotoSend()}
              >
                Upload
              </button>
            </div>

            {/* Group Name Input */}
            <div className="flex items-center gap-2 justify-center">
              <Input
                type="text"
                id="group_name"
                placeholder="Group Name"
                className="flex-1 rounded-lg shadow-sm bg-white border border-gray-200"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button
                type="button"
                className="py-2 px-4 bg-primary text-sm text-white rounded-lg whitespace-nowrap shadow hover:bg-primary/90 transition"
                onClick={() => updateName.mutate()}
              >
                Update Name
              </button>
            </div>

            {/* Add Members */}
            <div className="flex items-start gap-2 justify-center">
              <Controller
                name="members"
                control={form.control}
                rules={{ required: "At least one member is required" }}
                render={({ field }) => (
                  <MultiSelectDropdown
                    control={form.control}
                    name="members"
                    options={filteredFriends.map((friend) => ({
                      value: friend.user_id,
                      label: friend.name,
                      image: friend.profilePicture,
                    }))}
                  />
                )}
              />
              <button
                type="button"
                className="py-2 px-4 bg-primary text-sm text-white rounded-lg whitespace-nowrap shadow hover:bg-primary/90 transition"
                onClick={() => addUser.mutate()}
              >
                Add Member
              </button>
            </div>

            {/* Group Members List */}
            <div className="space-y-3">
              {groupChat?.users?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between  p-2 rounded-lg bg-gray-50 border border-gray-400 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  {groupChat?.groupAdmin?._id === user._id ? (
                    <div>
                      <button
                        type="button"
                        className="py-1 px-3 bg-green-500 text-white rounded-md text-sm hover:bg-red-600 transition"
                      >
                        Owner
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      {onlineUsers && onlineUsers?.includes(user._id) && (
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      )}
                      {groupChat?.groupAdmin?._id === user_id && (
                        <button
                          type="button"
                          className="py-1 px-3 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
                          onClick={() => removeMember.mutate([user._id])}
                        >
                          Remove
                        </button>
                      )}
                      {user._id === user_id && (
                        <button
                          type="button"
                          className="py-1 px-3 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
                          onClick={() => leveGroup.mutate()}
                        >
                          Leave
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditGroup;
