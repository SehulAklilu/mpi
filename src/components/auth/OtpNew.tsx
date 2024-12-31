import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import otp from "../../assets/otp.svg";

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm({ setCurr }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("ddddddd", data);
  }

  return (
    <div>
      <img className="w-32 mx-auto" src={otp} alt="" />
      <div className="flex flex-col items-center text-sm">
        <div className="text-2xl font-semibold mt-4">OTP Verification Code</div>
        <div className="text-center  mt-2 max-w-lg text-gray-600">
          Enter the 4 digits code sent to you at
        </div>
        <div className="text-center">+12 345 678 999</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 max-w-[270px] mx-auto mt-6 ">
            <FormField
              control={form.control}
              name="pin"
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
            <Button
              onClick={() => setCurr(3)}
              className=" px-7 py-2 mt-4 shadow rounded-3xl bg-primary text-white  "
            >
              Verify
            </Button>
          </div>
          <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
            <div>Didn’t receive the code?</div>
            <div
              role="button"
              onClick={() => setCurr((c: number) => c - 1)}
              className="text-primary"
            >
              Resend code
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
