"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";

import { useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { type State, UpdateUserSettings } from "@/app/actions";
import { SubmitButton } from "../SubmitButtons";

interface SettingsFormProps {
  firstName: string;
  lastName: string;
  email: string;
};

export function SettingsForm({firstName, lastName, email}: SettingsFormProps) {
  const initialState: State = {
    status: undefined,
    message: "",
  }
  const [state, formAction] = useFormState(UpdateUserSettings, initialState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message);
    } else if (state?.status === "success") {
      toast.success(state.message);
      redirect("/");
    }
  }, [state]);


  return (
    <form className="bg-slate-100" action={formAction}>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-purple-800">
          Settings
        </CardTitle>
        <CardDescription className="text-sm font-semibold text-slate-700">
          Update your account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label className="font-semibold text-lg text-blue-900">
            First Name
          </Label>
          <Input type="text" name="firstName" defaultValue={firstName}/>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="font-semibold text-lg text-blue-900">
            Last Name
          </Label>
          <Input type="text" name="lastName" defaultValue={lastName}/>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="font-semibold text-lg text-blue-900">
            Email
          </Label>
          <Input type="email" name="email" disabled defaultValue={email}/>
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton title="Update Settings"/>
      </CardFooter>
    </form>
  )
};