import React, { useState } from "react";
import { Coordinates } from "@dnd-kit/utilities";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

// Define the structure for each box
interface Box {
  id: string;
  coords: Coordinates;
  bg: string;
}

const App: React.FC = () => {
  // Store boxes to display in state
  const [boxes, setBoxes] = useState<Box[]>([
    { id: "1", coords: { x: 0, y: 0 }, bg: "#3498db " },
    { id: "2", coords: { x: 300, y: 300 }, bg: "#f4d03f" },
    { id: "3", coords: { x: 600, y: 600 }, bg: "#82e0aa" },
  ]);

  // This function is triggered whenever a drag event ends. It moves dragged
  // element into its new position
  const handleDragEnd = (id: string, delta: Coordinates) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id
          ? {
              ...box,
              coords: {
                x: box.coords.x + delta.x,
                y: box.coords.y + delta.y,
              },
            }
          : box,
      ),
    );
  };

  return (
    <DndContext
      onDragEnd={({ delta, active }) => {
        console.log(delta, active);
        handleDragEnd(active.id as string, delta);
      }}
    >
      <div className="main">
        {boxes.map((box) => (
          <DraggableBox
            key={box.id}
            id={box.id}
            top={box.coords.y}
            left={box.coords.x}
            bg={box.bg}
          />
        ))}
      </div>
    </DndContext>
  );
};

// Draggable boxes
interface DraggableBoxProps {
  id: string;
  top: number;
  left: number;
  bg: string;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ id, top, left, bg }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    top: top,
    left: left,
    position: "absolute",
    background: bg,
  };

  return (
    <div
      className="box"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    ></div>
  );
};

export default App;
