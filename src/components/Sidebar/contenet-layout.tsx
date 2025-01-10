import Navbar from "../Navbar/Navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="">
      <Navbar common={true} commonHeader={title} />
      <div className="pb-8 px-2 ">{children}</div>
    </div>
    // <>{children}</>
  );
}
