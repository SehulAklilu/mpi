import AuthWrapper from "../auth/AuthWrapper";
import logo from "../../assets/logo/new-logo.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  profile_img: z.string(),
});
import { LuImagePlus } from "react-icons/lu";

function Profile() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("sssssss", data);
  }
  return (
    <AuthWrapper>
      <div>
        <img className="w-52 mx-auto" src={logo} alt="" />
        <div className="flex flex-col items-center my-4">
          <div className="text-3xl font-semibold mt-4">Setup your Profile</div>
          <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
            Let Friends on MindSight can recognize you
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 max-w-sm mx-auto   mt-5">
              <FormField
                control={form.control}
                name="profile_img"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex justify-center items-center">
                        <div className="w-20 h-20 rounded-full bg-[#F0F0FF]  border border-[#e3e3fd] flex items-center justify-center overflow-hidden">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Uploaded preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <LuImagePlus />
                          )}
                        </div>

                        <input
                          {...fieldProps}
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(event) => {
                            const file =
                              event.target.files && event.target.files[0];
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
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="full_name"
                        placeholder="Enter your password"
                        className={"rounded-3xl shadow bg-[#F0F0FF] "}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="last_name"
                        placeholder="Confirm your password "
                        className={"rounded-3xl  shadow bg-[#F0F0FF]"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className=" px-7 py-2 mt-4 shadow rounded-3xl bg-primary text-white ">
                Get Started
              </Button>
              <Button className=" px-7  border-none rounded-3x bg-transparent text-black hover:bg-gray-200 hover:sahdow hover:rounded-3xl ">
                Skip
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default Profile;
