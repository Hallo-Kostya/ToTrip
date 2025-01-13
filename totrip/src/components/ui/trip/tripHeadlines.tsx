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
    const placesIds: number[] = [];
  
    try {
      const createResponse = await createSubtrip(tripId, dateStr, placesIds);
  
      if (createResponse.status === 201 && createResponse.data.subtrip) {
        const detailResponse = await getSubtripDetails(tripId, dateStr);
        if (detailResponse.status === 200 && detailResponse.data.subtrip) {
          setSubtrips((prev) => ({
            ...prev,
            [dateIndex]: detailResponse.data.subtrip,
          }));
        }
      }
    } catch (error: any) {

      if (error.response?.status === 500) {
        try {
          const detailResponse = await getSubtripDetails(tripId, dateStr);
          if (detailResponse.status === 200 && detailResponse.data.subtrip) {
            setSubtrips((prev) => ({
              ...prev,
              [dateIndex]: detailResponse.data.subtrip,
            }));
          }
        } catch (detailError: any) {
          console.error('Ошибка получения деталей существующей подпоездки:', detailError);
        }
      } else {
        console.error('Ошибка обработки createSubtrip:', error.message);
      }
    }
  
    setActiveDateIndex(dateIndex);
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
            tripId={tripId}
            subtrip={subtrips[activeDateIndex]}
            onDeleteSubtrip={(id) => {
              setSubtrips((prev) => {
                const newSubtrips = { ...prev };
                delete newSubtrips[activeDateIndex];
                return newSubtrips;
              });
            }}
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