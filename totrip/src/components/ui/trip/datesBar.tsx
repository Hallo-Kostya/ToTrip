'use client'

import React from 'react';


interface DatesBarProps {
  tripStart: Date; 
  tripEnd: Date; 
}

const getDatesBetween = (start: Date, end: Date) => {
  const dates = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const DatesBar: React.FC<DatesBarProps> = ({ tripStart, tripEnd }) => {
  const dates = getDatesBetween(tripStart, tripEnd);

  return (
    <div>
      {dates.map(date => (
        <div key={date.toDateString()}>{date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}</div>
      ))}
    </div>
  );
};

export default DatesBar;