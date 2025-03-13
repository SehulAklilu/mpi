import { useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@/components/ui/button"; // ShadCN button

const ColorPicker = () => {
  const [color, setColor] = useState("#ff0000");
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (newColor: any) => setColor(newColor.hex);

  return (
    <div className="p-4">
      <Button onClick={() => setShowPicker(!showPicker)}>
        {showPicker ? "Close" : "Pick a color"}
      </Button>

      {showPicker && (
        <div className="mt-2">
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}

      <div
        className="w-16 h-16 rounded-full mt-4"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default ColorPicker;
