import { create } from 'zustand';
import { SchoolEvent } from './types';

interface SchoolStore {
  events: SchoolEvent[];
  addEvent: (event: SchoolEvent) => void;
}

export const useSchoolStore = create<SchoolStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event].sort(
        (a, b) => new Date(a.registrationEnd).getTime() - new Date(b.registrationEnd).getTime()
      ),
    })),
}));