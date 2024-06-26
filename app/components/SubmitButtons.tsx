"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({title}: {title: string}) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
          Please wait...
        </Button>
      ) : (
        <Button type="submit">
          {title}
        </Button>
      )}
    </>
  )
 }