import React, { useMemo } from 'react';
import { addDays, format, subDays, startOfDay, isSameDay, isWithinInterval } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CalendarDay } from '../types';
import { useSchoolStore } from '../store';

export const Calendar: React.FC<React.ComponentProps<'div'> & {
  onEventClick?: (event: any) => void;
}> = ({ onEventClick }) => {
  const events = useSchoolStore((state) => state.events);

  const days = useMemo(() => {
    const today = startOfDay(new Date());
    const startDate = subDays(today, 7);
    const days: CalendarDay[] = [];

    for (let i = 0; i < 50; i++) {
      const date = addDays(startDate, i);
      days.push({
        date,
        month: parseInt(format(date, 'M')),
        day: parseInt(format(date, 'd')),
        dayOfWeek: format(date, 'E', { locale: ja }),
      });
    }
    return days;
  }, []);

  const monthHeaders = useMemo(() => {
    const months: { month: number; colspan: number }[] = [];
    let currentMonth = days[0].month;
    let currentColspan = 1;

    days.forEach((day, index) => {
      if (index === 0) return;
      if (day.month === currentMonth) {
        currentColspan++;
      } else {
        months.push({ month: currentMonth, colspan: currentColspan });
        currentMonth = day.month;
        currentColspan = 1;
      }
    });
    months.push({ month: currentMonth, colspan: currentColspan });
    return months;
  }, [days]);

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse min-w-full">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="border border-gray-300 w-48 bg-gray-50" rowSpan={3}>
              学校名
            </th>
            {monthHeaders.map((header, idx) => (
              <th
                key={idx}
                className="border border-gray-300 bg-gray-50"
                colSpan={header.colspan}
              >
                {header.month}月
              </th>
            ))}
          </tr>
          <tr>
            {days.map((day, idx) => (
              <th key={idx} className="border border-gray-300 w-[30px] bg-gray-50">
                {day.day}
              </th>
            ))}
          </tr>
          <tr>
            {days.map((day, idx) => (
              <th key={idx} className="border border-gray-300 bg-gray-50">
                {day.dayOfWeek}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td
                onClick={() => onEventClick?.(event)}
                className="border border-gray-300 p-2 font-medium cursor-pointer hover:bg-gray-50"
              >
                {event.schoolName}
              </td>
              {days.map((day, idx) => {
                const isRegistrationPeriod = isWithinInterval(startOfDay(day.date), {
                  start: startOfDay(event.registrationStart),
                  end: startOfDay(event.registrationEnd),
                });
                const isEventDay = isSameDay(day.date, event.eventDate);

                return (
                  <td
                    key={idx}
                    className={`border border-gray-300 ${
                      isRegistrationPeriod ? 'bg-yellow-100' : ''
                    } ${isEventDay ? 'bg-green-100' : ''}`}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};