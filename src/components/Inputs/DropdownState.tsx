import MaterialIcon from "../Icon/MaterialIcon";
import { FC, Fragment, MouseEventHandler } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IState } from "country-state-city"; // Assuming you only need ICountry from this import

interface DropdownProps {
  label: string;
  options: IState[];
  selected: IState | undefined;
  setSelected: (value: IState | undefined) => void;
  name: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onOtherSubmit: MouseEventHandler<HTMLButtonElement>;
  containerStyle?: string;
  iconName?: string;
  outline?: boolean;
}

const DropdownState: FC<DropdownProps> = ({
  label,
  options,
  selected,
  setSelected,
  containerStyle,
  iconName,
  outline,
}) => {
  return (
    <>
      <div className={`${containerStyle}`}>
        <p className="font-medium xs-phone:text-xs  text-sm">{label}</p>
        <div className=" w-[22rem] xs-phone:w-[17rem] ">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full flex flex-row cursor-default rounded-md bg-none border border-black-50 xs-phone:py-1 py-2 px-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <MaterialIcon
                  className="text-xl text-black-75 "
                  outline={outline}
                  icon={iconName ?? ""}
                />
                <div className="my-auto">
                  <span className="block truncate">
                    {selected?.name || `Select ${label}`}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MaterialIcon icon="arrow_drop_down" />
                  </span>
                </div>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {options.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <MaterialIcon icon="check" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </>
  );
};
export default DropdownState;
