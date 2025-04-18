import { MenuIcon, PanelsTopLeft } from "lucide-react";
import new_logo from "../../assets/logo/mpi_logo.png";

import { Button } from "@/components/ui/button";
import Menu from "./menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function SheetMenu() {
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={34} className="text-[#F2851C] " />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center  pt-1"
            variant="link"
            asChild
          >
            <a href="/" className="flex items-center">
              <img src={new_logo} alt="new logo" className="w-52" />
            </a>
          </Button>
        </SheetHeader>
        <Menu isOpen isNotiOpen={isNotiOpen} setIsNotiOpen={setIsNotiOpen} />
      </SheetContent>
    </Sheet>
  );
}
