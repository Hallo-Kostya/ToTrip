import React, { useState } from 'react';
import DatesBar from '@/components/ui/trip/datesBar';
import Subtrip from '@/components/ui/trip/subtrip';
import { createSubtrip, getSubtripDetails } from '@/services/subtripService';

interface TripHeadlinesProps {
  tripStart: Date;
  tripEnd: Date;
  tripId: number;
}

const TripHeadlines: React.FC<TripHeadlinesProps> = ({ tripStart, tripEnd, tripId }) => {
  const dateList = generateDateList(tripStart, tripEnd);
  const [subtrips, setSubtrips] = useState<Record<number, any>>({});
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);

  const handleDateClick = async (dateIndex: number) => {
    const dateStr = dateList[dateIndex].toISOString().split('T')[0];
    const placesIds = [];
  
    if (!subtrips[dateIndex]) {
      try {
        const response = await createSubtrip(tripId, dateStr, placesIds);
        if (response.data && response.data.subtrip) {
          const newSubtripId = response.data.subtrip.id;
          setSubtrips((prev) => ({
            ...prev,
            [dateIndex]: { id: newSubtripId, ...response.data.subtrip },
          }));
          setActiveDateIndex(dateIndex);
        } else {
          console.error('Ответ от сервера не содержит данные о subtrip');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          console.warn('Subtrip уже существует. Получаем существующий сабтрип.');
          try {
            const existingSubtrip = await getSubtripDetails(tripId, dateStr);
            setSubtrips((prev) => ({
              ...prev,
              [dateIndex]: existingSubtrip.data,
            }));
            setActiveDateIndex(dateIndex);
          } catch (detailError) {
            console.error('Ошибка при получении существующего subtrip:', detailError);
          }
        } else {
          console.error('Ошибка при создании subtrip:', error);
        }
      }
    } else {
      setActiveDateIndex(dateIndex);
    }
  };

  return (
    <section className="flex flex-col w-full">
      <DatesBar
        tripStart={tripStart}
        tripEnd={tripEnd}
        onDateClick={handleDateClick}
        activeDateIndex={activeDateIndex}
      />
      <div className="flex flex-col mt-10">
        {activeDateIndex !== null && subtrips[activeDateIndex] && (
          <Subtrip 
            subtrip={subtrips[activeDateIndex]} 
            onDeleteSubtrip={(id) => setSubtrips((prev) => {
              const newSubtrips = { ...prev };
              delete newSubtrips[activeDateIndex];
              return newSubtrips;
            })}
            onUpdateSubtrip={() => handleDateClick(activeDateIndex)}
          />
        )}
      </div>
    </section>
  );
};

const generateDateList = (start: Date, end: Date) => {
  const dates = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
export default TripHeadlines;