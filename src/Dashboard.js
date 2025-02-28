import React, { useState } from 'react';
import {
  DndContext,
  useDraggable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import './Dashboard.css';
import DraggableChart from './DraggableChart';

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: '1', title: 'Sales Overview', type: 'bar', x: 0, y: 0, width: 400, height: 300 },
    { id: '2', title: 'User Growth', type: 'line', x: 420, y: 0, width: 400, height: 300 },
    { id: '3', title: 'Market Share', type: 'pie', x: 0, y: 320, width: 400, height: 300 }
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === active.id
          ? {
              ...widget,
              x: widget.x + delta.x,
              y: widget.y + delta.y
            }
          : widget
      )
    );
  };

  const handleResize = (id, width, height) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, width, height } : widget
      )
    );
  };

  return (
    <div className="dashboard">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="canvas">
          {widgets.map((widget) => (
            <DraggableChart
              key={widget.id}
              id={widget.id}
              title={widget.title}
              type={widget.type}
              x={widget.x}
              y={widget.y}
              width={widget.width}
              height={widget.height}
              onResize={handleResize}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
