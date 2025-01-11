import React from 'react';

interface DatesBarProps {
  tripStart: Date;
  tripEnd: Date;
  onDateClick: (dateIndex: number) => void;
  activeDateIndex: number | null;
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

const DatesBar: React.FC<DatesBarProps> = ({
  tripStart,
  tripEnd,
  onDateClick,
  activeDateIndex,
}) => {
  const dates = getDatesBetween(tripStart, tripEnd);

  return (
    <div className="flex py-[30px] border-y-[3px] border-black border-opacity-30 gap-[12px]">
      {dates.map((date, index) => (
        <div
          key={date.toDateString()}
          className={`px-[14px] py-[6px] border-[1px] border-black border-opacity-30 rounded-[100px] text-[20px] font-[600] ${
            activeDateIndex === index ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => onDateClick(index)}
        >
          {date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
        </div>
      ))}
    </div>
  );
};

export default DatesBar;