import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { EventForm } from './components/EventForm';
import { EventDetails } from './components/EventDetails';
import { SchoolEvent } from './types';
import { Plus } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              私立高校説明会スケジュール
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              新規登録
            </button>
          </div>

          <Calendar onEventClick={setSelectedEvent} />

          <EventForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
          <EventDetails
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;