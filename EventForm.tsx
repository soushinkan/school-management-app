import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useSchoolStore } from '../store';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
  schoolName: '',
  registrationStart: '',
  registrationEnd: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  location: '',
  participants: '',
};

export const EventForm: React.FC<EventFormProps> = ({ isOpen, onClose }) => {
  const addEvent = useSchoolStore((state) => state.addEvent);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      id: crypto.randomUUID(),
      ...formData,
      registrationStart: new Date(formData.registrationStart),
      registrationEnd: new Date(formData.registrationEnd),
      eventDate: new Date(formData.eventDate),
    });
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">新規登録</Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                学校名
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.schoolName}
                onChange={(e) =>
                  setFormData({ ...formData, schoolName: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  申し込み開始日
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.registrationStart}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationStart: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  申し込み締切日
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.registrationEnd}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationEnd: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  説明会当日
                </label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.eventDate}
                  onChange={(e) =>
                    setFormData({ ...formData, eventDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  開始時間
                </label>
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  終了時間
                </label>
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                場所
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                参加者
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.participants}
                onChange={(e) =>
                  setFormData({ ...formData, participants: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                登録
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};