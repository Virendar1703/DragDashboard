import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ChartWidget from './ChartWidget';
import 'react-resizable/css/styles.css';
import './SorTableItem.css';

const SortableItem = ({ id, title, type, width, height, onResize }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  // Manage width and height using state
  const [size, setSize] = useState({ width, height });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    overflow: "hidden",
    cursor: "grab",
    boxSizing: "border-box",
    width: "100%",
    height: "100%"
  };

  return (
    <ResizableBox
      className="chart-wrapper"
      width={size.width}
      height={size.height}
      onResizeStop={(_, { size }) => {
        setSize(size);
        onResize(id, size.width, size.height);
      }}
      minConstraints={[200, 200]}
      maxConstraints={[1200, 800]}
      resizeHandles={["se"]}
      style={{ width: size.width, height: size.height }}
    >
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div className="chart-box" style={{ width: "100%", height: "100%" }}>
          <h3>{title}</h3>
          <ChartWidget type={type} width={size.width - 40} height={size.height - 60} />
        </div>
      </div>
    </ResizableBox>
  );
};

export default SortableItem;
