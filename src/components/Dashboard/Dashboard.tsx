import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import StudentsManager from './StudentsManager';
import WorkoutManager from './WorkoutManager';
import CalendarManager from './CalendarManager';
import FinanceManager from './FinanceManager';
import ReportsManager from './ReportsManager';
import MessagesManager from './MessagesManager';
import DocumentsManager from './DocumentsManager';
import SettingsManager from './SettingsManager';

interface DashboardProps {
  onNavigateToSite: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToSite }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'students':
        return <StudentsManager />;
      case 'workouts':
        return <WorkoutManager />;
      case 'calendar':
        return <CalendarManager />;
      case 'finance':
        return <FinanceManager />;
      case 'analytics':
        return <ReportsManager />;
      case 'messages':
        return <MessagesManager />;
      case 'documents':
        return <DocumentsManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col h-screen">
        <DashboardHeader
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onBackToSite={onNavigateToSite}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
