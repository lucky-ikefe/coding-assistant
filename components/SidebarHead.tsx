import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export default function SidebarHead({
  className,
  setShowSidebar,
}: {
  className: string;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={`px-2 flex justify-between items-center ${className}`}>
      <TbLayoutSidebarLeftCollapse
        onClick={() => {
          setShowSidebar(false);
        }}
      />
      SidebarHeader
    </div>
  );
}
