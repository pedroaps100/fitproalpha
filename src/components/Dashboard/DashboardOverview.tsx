import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Target, MessageSquare } from 'lucide-react';
import { faker } from '@faker-js/faker';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Alunos Ativos',
      value: '84',
      change: '+12%',
      positive: true,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${faker.finance.amount(8000, 15000, 0)}`,
      change: '+8%',
      positive: true,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Aulas Hoje',
      value: '12',
      change: '+2',
      positive: true,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Taxa de Retenção',
      value: '92%',
      change: '+5%',
      positive: true,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentActivities = [
    {
      type: 'student',
      message: 'Nova aluna cadastrada: Maria Santos',
      time: '2 min atrás',
    },
    {
      type: 'workout',
      message: 'Treino "Força Superior" atualizado',
      time: '15 min atrás',
    },
    {
      type: 'payment',
      message: 'Pagamento recebido de Carlos Silva',
      time: '1h atrás',
    },
    {
      type: 'message',
      message: 'Nova mensagem de Ana Costa',
      time: '2h atrás',
    },
  ];

  const upcomingClasses = [
    {
      time: '09:00',
      student: 'Pedro Oliveira',
      type: 'Treino Funcional',
    },
    {
      time: '10:30',
      student: 'Ana Costa',
      type: 'Musculação',
    },
    {
      time: '14:00',
      student: 'Carlos Silva',
      type: 'Cardio',
    },
    {
      time: '16:00',
      student: 'Maria Santos',
      type: 'Treino Funcional',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Bem-vindo de volta, João! 👋
        </h1>
        <p className="text-text-secondary">
          Aqui está um resumo do seu negócio hoje
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-surface p-6 rounded-xl shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.positive ? 'text-success' : 'text-error'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.title}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            Atividades Recentes
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">{activity.message}</p>
                  <p className="text-xs text-text-secondary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <h3 className="text-xl font-semibold text-text-primary mb-6">
            Próximas Aulas
          </h3>
          <div className="space-y-4">
            {upcomingClasses.map((classItem, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">
                  {classItem.time}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{classItem.student}</p>
                  <p className="text-xs text-text-secondary">{classItem.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
