import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import ChartWidget from './ChartWidget';
import './DraggableChart.css';

const DraggableChart = ({ id, title, type, x, y, width, height, onResize }) => {
  // Manage width and height using state
  const [size, setSize] = useState({ width, height });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const handleResize = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const doDrag = (event) => {
      const newWidth = startWidth + (event.clientX - startX);
      const newHeight = startHeight + (event.clientY - startY);

      setSize({
        width: Math.max(200, Math.min(newWidth, 1200)), // Min 200, Max 1200
        height: Math.max(200, Math.min(newHeight, 800)), // Min 200, Max 800
      });
    };

    const stopDrag = () => {
      onResize(id, size.width, size.height);
      window.removeEventListener('mousemove', doDrag);
      window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);
  };

  const style = {
    transform: `translate(${x + (transform?.x || 0)}px, ${y + (transform?.y || 0)}px)`,
    position: 'absolute',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: '#fff',
    width: `${size.width}px`,
    height: `${size.height}px`,
    overflow: 'hidden'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="chart-wrapper">
        <div className="chart-box" style={{ width: '100%', height: '100%' }}>
          <h3>{title}</h3>
          <ChartWidget type={type} width={size.width - 40} height={size.height - 60} />
        </div>
        <span className="resize-handle" onMouseDown={handleResize}>⇲</span>
      </div>
    </div>
  );
};

export default DraggableChart;
