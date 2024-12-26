import { Button } from "../ui/button";

const SettingsNav = ({
  curr,
  setCurr,
}: {
  curr: number;
  setCurr: Function;
}) => {
  const navDatas = ["profile", "Account", "Payment"];
  return (
    <div className="flex gap-5">
      {navDatas.map((name, ind) => (
        <Button
          key={ind}
          onClick={() => setCurr(ind)}
          className={` px-7 py-1 rounded-md  ${
            curr == ind ? "bg-primary text-white font-semibold " : "border text-gray-700"
          }`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default SettingsNav
