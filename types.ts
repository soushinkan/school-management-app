export interface SchoolEvent {
  id: string;
  schoolName: string;
  registrationStart: Date;
  registrationEnd: Date;
  eventDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  participants: string;
}

export interface CalendarDay {
  date: Date;
  month: number;
  day: number;
  dayOfWeek: string;
}