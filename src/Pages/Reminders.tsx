import { useState } from "react";
import Calendar from "react-calendar"; // Install: npm install react-calendar
import "react-calendar/dist/Calendar.css"; // Default styles for the calendar
import Button from "../components/Button/Button"; // Reuse your Button component

const Reminders = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reminders, setReminders] = useState([
    { id: 1, title: "Team Meeting", date: "2024-11-13", description: "Discuss project updates." },
    { id: 2, title: "Doctor Appointment", date: "2024-11-15", description: "Annual check-up." },
    { id: 3, title: "Submit Report", date: "2024-11-20", description: "Submit monthly performance report." },
  ]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const filteredReminders = reminders.filter((reminder) => {
    return new Date(reminder.date).toDateString() === selectedDate?.toDateString();
  });

  return (
    <div className="remindersContainer flex flex-row font-raleway">
      

      {/* Middle Section: Calendar */}
      <div className="w-2/3 flex flex-col items-center justify-center bg-gray-50 h-screen">
        <div className="p-16 bg-white shadow-md rounded-lg">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Reminders for {selectedDate?.toDateString() || "Select a date"}</h3>
          <div className="flex flex-col gap-4 mt-2">
            {filteredReminders.length > 0 ? (
              filteredReminders.map((reminder) => (
                <div key={reminder.id} className="p-4 border rounded-lg shadow-sm">
                  <h4 className="text-base font-semibold">{reminder.title}</h4>
                  <p className="text-sm font-light">{reminder.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm font-light">No reminders for this date.</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Reminders */}
      <div className="w-1/3 bg-white h-screen rounded-tr-lg rounded-br-lg shadow-l-gray-40 flex flex-col p-6 gap-4">
        <h3 className="text-lg font-semibold">Reminders</h3>
        <div className="flex flex-col gap-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="p-4 border rounded-lg shadow-sm">
              <h4 className="text-base font-semibold">{reminder.title}</h4>
              <p className="text-sm font-light">{reminder.date}</p>
              <p className="text-xs font-extralight">{reminder.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
