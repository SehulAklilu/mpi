import { cn } from "@/lib/utils";
import { useStore } from "@/context/use-store";
import { Button } from "@/components/ui/button";
import Menu from "./menu";
import { useSidebarToggle } from "@/context/SidebarToggleContext";
import { SidebarToggle } from "./sidebar-toggler";
import new_logo from "../../assets/logo/new-logo.svg";

export function Sidebar() {
  const sidebar = useStore(() => useSidebarToggle());

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full bg-white lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[100px] bg-white " : "w-72 bg-white "
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full bg-white flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <a
            href="/dashboard"
            className="flex items-center justify-center gap-2"
          >
            <img className="w-52 " src={new_logo} alt="Mpi logo" />

            {/* <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
            </h1> */}
          </a>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
