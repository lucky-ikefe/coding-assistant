import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import React from "react";

export default function CreateFunction() {
  return (
    <div className="flex justify-center h-full">
      <div className="flex h-full  flex-col justify-center items-center w-3/4">
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-1/5">
          <label htmlFor="language">
            Which Programming Language do you want to create your function in:
          </label>
          <input
            type="text"
            id="language"
            className="outline-none rounded-xl px-4 py-2"
          />
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-1/3">
          <label htmlFor="functionDescription">Describe the function:</label>
          <TextArea id="functionDescription" name="functionDescription" />
        </div>
        <Button className="mt-6">Create Function</Button>
      </div>
    </div>
  );
}
