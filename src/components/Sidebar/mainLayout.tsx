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
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar.isOpen === false ? "lg:ml-[120px] " : "lg:ml-[300px] "
        )}
      >
        {children}
      </main>
    </>
  );
}
