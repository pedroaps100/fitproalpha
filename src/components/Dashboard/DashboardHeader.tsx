import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  onBackToSite: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar, onBackToSite }) => {
  return (
    <header className="bg-surface border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar alunos, treinos..."
              className="pl-10 pr-4 py-2 w-80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBackToSite}
            className="text-sm text-text-secondary hover:text-primary"
          >
            ← Voltar ao Site
          </button>
          
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-text-primary">João Silva</div>
              <div className="text-text-secondary">Personal Trainer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
