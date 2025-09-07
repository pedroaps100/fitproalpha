import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User, 
  Tag, 
  Edit, 
  Trash2, 
  X 
} from 'lucide-react';
import { faker } from '@faker-js/faker';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Event {
  id: number;
  title: string;
  type: 'Aula' | 'Avaliação' | 'Reunião' | 'Pessoal';
  start: Date;
  end: Date;
  studentName?: string;
  notes?: string;
}

// Generate fake data
const generateEvents = (date: Date): Event[] => {
  const monthStart = startOfMonth(date);
  return Array.from({ length: 25 }, (_, i) => {
    const eventDate = faker.date.between({ from: monthStart, to: endOfMonth(monthStart) });
    const start = faker.date.recent({ refDate: eventDate });
    start.setHours(faker.number.int({ min: 7, max: 19 }), 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration
    
    return {
      id: i + 1,
      title: faker.helpers.arrayElement(['Treino Funcional', 'Musculação', 'Avaliação Física', 'Reunião de Alinhamento', 'Cardio HIIT']),
      type: faker.helpers.arrayElement(['Aula', 'Avaliação', 'Reunião', 'Pessoal']),
      start,
      end,
      studentName: faker.helpers.maybe(() => faker.person.fullName()),
      notes: faker.lorem.sentence(),
    };
  });
};

const CalendarManager: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(() => generateEvents(currentDate));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    setEvents(generateEvents(newDate));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setEvents(generateEvents(newDate));
  };
  
  const handleToday = () => {
    const newDate = new Date();
    setCurrentDate(newDate);
    setEvents(generateEvents(newDate));
  };

  const getEventTypeStyle = (type: Event['type']) => {
    switch (type) {
      case 'Aula': return 'bg-primary/80 border-primary';
      case 'Avaliação': return 'bg-success/80 border-success';
      case 'Reunião': return 'bg-warning/80 border-warning';
      case 'Pessoal': return 'bg-purple-500/80 border-purple-500';
      default: return 'bg-gray-500/80 border-gray-500';
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Agenda</h1>
          <p className="text-text-secondary">Visualize e gerencie seus compromissos</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleToday}
            className="border border-border text-text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Hoje
          </button>
          <div className="flex items-center border border-border rounded-lg">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-50 rounded-l-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 text-sm font-medium text-text-primary capitalize">
              {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
            </span>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-50 rounded-r-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Evento
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {/* Weekday Headers */}
        {weekdays.map(day => (
          <div key={day} className="bg-surface text-center py-2 text-sm font-medium text-text-secondary">
            {day}
          </div>
        ))}
        
        {/* Day Cells */}
        {days.map(day => {
          const dayEvents = events.filter(e => format(e.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
          return (
            <div 
              key={day.toString()} 
              className={`bg-surface p-2 flex flex-col gap-1 overflow-y-auto ${
                !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
              }`}
            >
              <span className={`self-start text-sm font-medium ${
                isToday(day) 
                  ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center' 
                  : 'text-text-primary'
              }`}>
                {format(day, 'd')}
              </span>
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <button 
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left text-xs text-white p-1.5 rounded border-l-4 ${getEventTypeStyle(event.type)}`}
                  >
                    <p className="font-semibold truncate">{event.title}</p>
                    <p className="truncate">{format(event.start, 'HH:mm')}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{selectedEvent.title}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getEventTypeStyle(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-text-secondary" />
                <p>{format(selectedEvent.start, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-text-secondary" />
                <p>Das {format(selectedEvent.start, 'HH:mm')} às {format(selectedEvent.end, 'HH:mm')}</p>
              </div>
              {selectedEvent.studentName && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-text-secondary" />
                  <p>Aluno: {selectedEvent.studentName}</p>
                </div>
              )}
              {selectedEvent.notes && (
                <div>
                  <h3 className="font-medium mb-2">Observações</h3>
                  <p className="text-sm text-text-secondary bg-gray-50 p-3 rounded-lg">{selectedEvent.notes}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-border flex items-center gap-4">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"><Edit className="w-4 h-4"/> Editar</button>
              <button className="border border-error text-error px-6 py-2 rounded-lg font-medium flex items-center gap-2"><Trash2 className="w-4 h-4"/> Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Novo Evento</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X/></button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Título</label>
                <input type="text" placeholder="Ex: Aula de Funcional" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Data</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Horário</label>
                  <input type="time" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Tipo</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Aula</option>
                    <option>Avaliação</option>
                    <option>Reunião</option>
                    <option>Pessoal</option>
                  </select>
              </div>
              <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Aluno (Opcional)</label>
                  <input type="text" placeholder="Buscar aluno..." className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Observações</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Salvar Evento</button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="border border-border text-text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-50">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarManager;
