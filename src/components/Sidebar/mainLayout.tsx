import { cn } from "@/lib/utils";
import { useStore } from "@/context/use-store";
import { Sidebar } from "./sidebar";
import { useSidebarToggle } from "@/context/SidebarToggleContext";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(() => useSidebarToggle());

  if (!sidebar) return null;

  return (
    <div className="">
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh)] transition-[margin-left] ease-in-out duration-300 ",
          sidebar.isOpen === false ? "lg:ml-[120px] " : "lg:ml-[300px] "
        )}
      >
        {children}
      </main>
    </div>
  );
}
