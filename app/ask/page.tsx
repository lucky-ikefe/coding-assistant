import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";

export default function AskQuestion() {
  return (
    <div className="flex justify-center h-full">
      <div className="flex h-full flex-col justify-center items-center space-y-10 w-3/4">
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-1/5">
          <label htmlFor="question">Ask your question</label>
          <TextArea id="question" name="question" />
        </div>
        <Button>Ask Question</Button>
      </div>
    </div>
  );
}
