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
    <div className="flex py-[30px] border-y-[3px] border-black border-opacity-30 gap-[12px]">
      {dates.map(date => (
        <div className="px-[14px] py-[6px] border-[1px] border-black border-opacity-30 rounded-[100px] text-[20px] font-[600]" key={date.toDateString()}>{date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}</div>
      ))}
    </div>
  );
};

export default DatesBar;