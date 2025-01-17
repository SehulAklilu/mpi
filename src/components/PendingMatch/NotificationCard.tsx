import React from "react";

interface NotificationCardProps {
  name: string;
  role: string;
  message: string;
  status: "pending" | "accepted";
  onAccept?: () => void;
  onDecline?: () => void;
  onMessage?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  name,
  role,
  message,
  status,
  onAccept,
  onDecline,
  onMessage,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-4 bg-white shadow-md rounded-lg border border-gray-200 gap-4 w-full max-w-full overflow-hidden">
      {/* Left Section: Avatar + Info */}
      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
        {/* Placeholder Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="flex-1">
          <p className="font-medium text-lg">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex gap-2 flex-wrap justify-start sm:justify-end w-full sm:w-auto">
        {status === "pending" ? (
          <>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full sm:w-auto"
            >
              Accept
            </button>
            <button
              onClick={onDecline}
              className="px-4 py-2 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-100 w-full sm:w-auto"
            >
              Decline
            </button>
          </>
        ) : (
          <button
            onClick={onMessage}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full sm:w-auto"
          >
            Message
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
