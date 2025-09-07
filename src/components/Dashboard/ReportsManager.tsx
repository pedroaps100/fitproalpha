import React, { useState } from 'react';
import { Download, Calendar, DollarSign, Users, TrendingUp, TrendingDown, PieChart, BarChart2 } from 'lucide-react';
import { faker } from '@faker-js/faker';

const ReportsManager: React.FC = () => {
  const [dateRange, setDateRange] = useState('last_30_days');

  const kpiData = {
    totalRevenue: faker.finance.amount(15000, 25000, 2, 'R$ '),
    newStudents: faker.number.int({ min: 5, max: 20 }),
    churnRate: `${faker.number.float({ min: 1, max: 5, precision: 1 })}%`,
    classesCompleted: faker.number.int({ min: 150, max: 300 }),
  };

  const popularPlansData = [
    { name: 'Premium', value: 65, color: 'bg-primary' },
    { name: 'Básico', value: 25, color: 'bg-primary-light' },
    { name: 'VIP', value: 10, color: 'bg-blue-300' },
  ];

  const studentEngagementData = Array.from({ length: 5 }, () => ({
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    lastClass: faker.date.recent({ days: 10 }).toLocaleDateString('pt-BR'),
    completedClasses: faker.number.int({ min: 8, max: 20 }),
    status: 'high' as const,
  })).concat(Array.from({ length: 3 }, () => ({
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    lastClass: faker.date.recent({ days: 45, refDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }).toLocaleDateString('pt-BR'),
    completedClasses: faker.number.int({ min: 1, max: 5 }),
    status: 'low' as const,
  })));

  const monthlyRevenueData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return {
      month: d.toLocaleDateString('pt-BR', { month: 'short' }),
      revenue: faker.number.int({ min: 8000, max: 15000 }),
    };
  });
  const maxRevenue = Math.max(...monthlyRevenueData.map(d => d.revenue));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Relatórios e Análises</h1>
          <p className="text-text-secondary">Acompanhe a performance do seu negócio com dados detalhados</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-9 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="last_7_days">Últimos 7 dias</option>
              <option value="last_30_days">Últimos 30 dias</option>
              <option value="last_90_days">Últimos 90 dias</option>
              <option value="all_time">Todo o período</option>
            </select>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center"><DollarSign className="w-6 h-6 text-white" /></div>
                <span className="text-sm font-medium text-success">+7.2%</span>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{kpiData.totalRevenue}</div>
            <div className="text-sm text-text-secondary">Faturamento Total</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"><Users className="w-6 h-6 text-white" /></div>
                <span className="text-sm font-medium text-success">+15%</span>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{kpiData.newStudents}</div>
            <div className="text-sm text-text-secondary">Novos Alunos</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center"><TrendingDown className="w-6 h-6 text-white" /></div>
                <span className="text-sm font-medium text-success">-0.5%</span>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{kpiData.churnRate}</div>
            <div className="text-sm text-text-secondary">Taxa de Churn</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center"><TrendingUp className="w-6 h-6 text-white" /></div>
                <span className="text-sm font-medium text-success">+20%</span>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{kpiData.classesCompleted}</div>
            <div className="text-sm text-text-secondary">Aulas Realizadas</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            Faturamento Mensal
          </h3>
          <div className="h-64 flex items-end gap-4">
            {monthlyRevenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-md transition-all"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  title={`R$ ${data.revenue.toFixed(2)}`}
                ></div>
                <span className="text-xs text-text-secondary capitalize">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Plans Chart */}
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Planos Mais Populares
          </h3>
          <div className="h-64 flex items-center justify-around gap-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9155" className="stroke-current text-gray-200" strokeWidth="3.8" fill="transparent" />
                <circle cx="18" cy="18" r="15.9155" className="stroke-current text-primary" strokeWidth="3.8" fill="transparent" strokeDasharray="65, 100" />
                <circle cx="18" cy="18" r="15.9155" className="stroke-current text-primary-light" strokeWidth="3.8" fill="transparent" strokeDasharray="25, 100" strokeDashoffset="-65" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-text-primary">
                  {popularPlansData.reduce((acc, p) => acc + p.value, 0) > 0 ? '100%' : '0%'}
                </span>
                <span className="text-sm text-text-secondary">Total</span>
              </div>
            </div>
            <ul className="space-y-3">
              {popularPlansData.map((plan) => (
                <li key={plan.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                  <span className="text-sm text-text-secondary">{plan.name}</span>
                  <span className="font-medium text-text-primary">{plan.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Student Engagement Table */}
      <div className="bg-surface p-6 rounded-xl shadow-card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Engajamento dos Alunos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <h4 className="font-medium text-success mb-3">Mais Engajados</h4>
            <ul className="space-y-3">
              {studentEngagementData.filter(s => s.status === 'high').map(student => (
                <li key={student.name} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{student.name}</p>
                    <p className="text-xs text-text-secondary">{student.completedClasses} aulas no período</p>
                  </div>
                  <span className="text-xs text-text-secondary">Última aula: {student.lastClass}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-error mb-3">Menos Engajados</h4>
            <ul className="space-y-3">
              {studentEngagementData.filter(s => s.status === 'low').map(student => (
                <li key={student.name} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{student.name}</p>
                    <p className="text-xs text-text-secondary">{student.completedClasses} aulas no período</p>
                  </div>
                   <span className="text-xs text-text-secondary">Última aula: {student.lastClass}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsManager;
