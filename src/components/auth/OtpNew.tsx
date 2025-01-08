import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import otp from "../../assets/otp.svg";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignupContext } from "@/context/SignupContext";
import { useMutation } from "react-query";
import { sendOtp, verifyOTP } from "@/api/auth.api";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { OtpPayload, VerifyOtpPayload } from "@/types/auth.type";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Yout OTP must be 6 characters.",
  }),
});

export function InputOTPForm({ setCurr }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const signupCon = useSignupContext();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: (payload: VerifyOtpPayload) => verifyOTP(payload),
    onSuccess: (response) => {
      signupCon.setUserInfo({ otp: form.getValues("otp") });
      setCurr((c: number) => c + 1);
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const { mutate: reSend, isLoading: isLoading2 } = useMutation({
    mutationKey: ["sendOpt"],
    mutationFn: (payload: OtpPayload) => sendOtp(payload),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signupCon?.userInfo?.email &&
      mutate({
        otp: data.otp.toString(),
        email: signupCon.userInfo.email,
      });
  }

  const resendOtp = () => {
    if (signupCon?.userInfo?.email) {
      reSend({ email: signupCon.userInfo.email });
    }
  };

  return (
    <div>
      <img className="w-32 mx-auto" src={otp} alt="" />
      <div className="flex flex-col items-center text-sm">
        <div className="text-2xl font-semibold mt-4">OTP Verification Code</div>
        <div className="text-center  mt-2 max-w-lg text-gray-600">
          Enter the 4 digits code sent to you at
        </div>
        <div className="text-center">{signupCon?.userInfo?.email}</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 max-w-[270px] mx-auto mt-6 ">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="!gap-2">
                        <InputOTPSlot index={0} className="!border !rounded" />
                        <InputOTPSlot index={1} className="!border !rounded" />
                        <InputOTPSlot index={2} className="!border !rounded" />
                        <InputOTPSlot index={3} className="!border !rounded" />
                        <InputOTPSlot index={4} className="!border !rounded" />
                        <InputOTPSlot index={5} className="!border !rounded" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <Button type="submit">Submit</Button> */}
            <Button className=" flex items-center justify-center px-7 py-2 mt-4 shadow rounded-3xl bg-primary text-white  ">
              {isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                "Verify"
              )}
            </Button>
          </div>
          <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
            <div>Didn’t receive the code?</div>
            <div onClick={resendOtp} role="button" className="text-primary">
              {isLoading2 ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                "Resend Code"
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
