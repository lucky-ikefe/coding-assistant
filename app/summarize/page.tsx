import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";

export default function Summarizer() {
  return (
    <div className="flex justify-center h-full">
      <div className="flex h-full flex-col justify-center items-center space-y-10 w-3/4">
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-2/5">
          <label htmlFor="code">Enter code to summarize</label>
          <TextArea id="code" name="code" />
        </div>
        <Button>Summarize Code</Button>
      </div>
    </div>
  );
}
