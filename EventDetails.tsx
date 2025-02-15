import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { SchoolEvent } from '../types';
import { format } from 'date-fns';

interface EventDetailsProps {
  event: SchoolEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">
              {event.schoolName}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">説明会日時</dt>
              <dd className="mt-1">
                {format(event.eventDate, 'yyyy年M月d日')} {event.startTime}～
                {event.endTime}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">場所</dt>
              <dd className="mt-1">{event.location}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">参加者</dt>
              <dd className="mt-1">{event.participants}</dd>
            </div>
          </dl>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};