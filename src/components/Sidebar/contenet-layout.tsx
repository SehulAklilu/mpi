import { SheetMenu } from "../Sidebar/sheet-menu";
import Navbar from "../Navbar/Navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="">
      <div className="px-2">
        <SheetMenu />
      </div>

      <div className="pb-8 px-2 ">{children}</div>
    </div>
    // <>{children}</>
  );
}
