import React from "react";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";

function ChatComponent() {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="grid-cols-4">
          <div className="sticky top-0 p-4 rounded-lg">
            <Input
              type="text"
              id="full_name"
              placeholder="Enter your first name here"
              className={"py-6 rounded-full"}
              startIcon={FaSearch}
            />
          </div>
        </div>
        <div className="grid-cols-8"></div>
      </div>
    </div>
  );
}

export default ChatComponent;
