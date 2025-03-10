import { ReminderInf } from "@/Pages/Reminders";
import { Session } from "@/types/classes.type";
import { PlayerSession } from "@/types/session.type";
import { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export interface CalendarRowProps {
  firstDay: number;
  lastDayInMonth: number;
  row: number;
  currentMonth: number;
  currentYear: number;
  reminders: ReminderInf[];
  setDateFilter: Function;
  dateFilter: Date;
  classes: Session[] | PlayerSession[] | undefined;
}

const CalendarRow: React.FC<CalendarRowProps> = ({
  firstDay,
  lastDayInMonth,
  row,
  currentMonth,
  currentYear,
  reminders,
  setDateFilter,
  dateFilter,
  classes,
}) => {
  const activeDay = useState(new Date().getDate())[0];

  // Parse reminder dates into an array of Date objects for easy comparison

  // const reminderDates = reminders.map((reminder) => new Date(reminder.date));

  // const reminderDates = [
  //   ...reminders.map((reminder) => new Date(reminder.date)),
  //   ...(classes
  //     ? classes.map((session) => {
  //         const date = new Date(session.date);
  //         date.setDate(date.getDate() - 1); // Subtract one day
  //         return date;
  //       })
  //     : []),
  // ];

  const reminderDates = [
    ...reminders.map((reminder) => new Date(reminder.date)),
    ...(classes ? classes.map((session) => new Date(session.date)) : []),
  ];

  let content = [];
  const isToday = (num: number): boolean => {
    return (
      activeDay === num &&
      new Date().getMonth() === currentMonth &&
      new Date().getFullYear() === currentYear
    );
  };
  const isActiveDay = (num: number): boolean => {
    return (
      dateFilter.getDate() === num &&
      dateFilter.getMonth() === currentMonth &&
      dateFilter.getFullYear() === currentYear
    );
  };

  // First row with empty spaces

  if (!row) {
    for (let i = 0; i < firstDay; i++) {
      content.push(<td key={`empty-${i}`}></td>);
    }
    content.push(
      <ReminderTd
        handleDateClick={handleDateClick}
        day={1}
        isToday={isToday(1)}
        isActiveDay={isActiveDay(1)}
        hasReminder={isReminderDate(1)}
        // temp={true}
      />
    );
    let len = 7 - content.length;
    for (let i = 1; i <= len; i++) {
      content.push(
        <ReminderTd
          handleDateClick={handleDateClick}
          day={i + 1}
          isToday={isToday(i + 1)}
          isActiveDay={isActiveDay(i + 1)}
          hasReminder={isReminderDate(i + 1)}
          // temp={true}
        />
      );
    }

    return <>{content}</>;
  }

  // Other rows
  for (let i = 1; i <= 7; i++) {
    const day = i + (7 * row - firstDay);
    if (day <= lastDayInMonth) {
      content.push(
        <ReminderTd
          handleDateClick={handleDateClick}
          day={day}
          isToday={isToday(day)}
          isActiveDay={isActiveDay(day)}
          hasReminder={isReminderDate(day)}
        />
      );
    }
  }

  return <>{content}</>;

  // Helper function to check if a given day matches any reminder date
  function isReminderDate(day: number) {
    return reminderDates.some(
      (date) =>
        date.getDate() === day &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
    );
  }

  function handleDateClick(day: number) {
    const date = new Date(`${currentYear}-${currentMonth + 1}-${day}`);
    console.log(`${currentYear}-${currentMonth + 1}-${day}`);
    setDateFilter(date);
  }
};

const ReminderTd = ({
  day,
  isToday,
  handleDateClick,
  isActiveDay,
  hasReminder,
  temp = false,
}: {
  day: number;
  isToday: boolean;
  handleDateClick: Function;
  isActiveDay: boolean;
  hasReminder: boolean;
  temp?: boolean;
}) => {
  return (
    <td
      onClick={() => handleDateClick(day)}
      className={` ${
        temp && "bg-red-900"
      } cursor-pointer hover:bg-primary/10 relative py-1 px-2  text-center  ${
        isActiveDay ? "text-white" : "text-gray-800"
      } `}
    >
      <div
        className={`w-full  flex-1 py-1 text-center flex relative rounded-md ${
          isActiveDay
            ? "bg-gradient-to-b from-[#F8B672] to-[#F2851C] text-white shadow"
            : isToday
            ? " border border-primary shadow "
            : ""
        }  `}
      >
        <span className={`p-1 m-auto mb-1`}>{day}</span>
        {hasReminder && (
          <GoDotFill
            size={9}
            className={`absolute  ${
              isActiveDay ? "text-white" : "text-primary"
            }  left-1/2 transform -translate-x-1/2  bottom-1 text-xs`}
          />
        )}
      </div>
    </td>
  );
};

// const NormalTd = ({
//   day,
//   handleDateClick,
// }: {
//   day: number;
//   handleDateClick: Function;
// }) => {
//   return (
//     <td
//       onClick={() => handleDateClick(day)}
//       className={`cursor-pointer hover:bg-primary/10 relative py-3 px-2 md:px-3 text-center text-gray-800 `}
//     >
//       <span className={`p-1 text-gray-800`}>{day}</span>
//     </td>
//   );
// };

// const TodayTd = ({
//   day,
//   handleDateClick,
// }: {
//   day: number;
//   handleDateClick: Function;
// }) => {
//   return (
//     <td
//       onClick={() => handleDateClick(day)}
//       className={`cursor-pointer hover:bg-primary/10 relative py-1 px-2  text-center  text-white `}
//     >
//       <div className="w-full flex-1 py-1 text-center flex relative bg-primary rounded-md shadow">
//         <span className={`p-1 m-auto mb-1`}>{day}</span>
//       </div>
//     </td>
//   );
// };

export default CalendarRow;
