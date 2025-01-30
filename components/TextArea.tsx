import { ChangeEventHandler } from "react";

export default function TextArea({
  name,
  id,
  value,
  onChange,
  className,
}: {
  name: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}) {
  return (
    <textarea
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      className={`w-full h-3/4 resize-none rounded-3xl p-6 scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-700 overflow-auto overflow-x-hidden outline-none ${
        className || ""
      }`}
    />
  );
}
