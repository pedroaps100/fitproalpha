import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Transaction {
  id: number;
  description: string;
  studentName?: string;
  category: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  status: 'paid' | 'pending' | 'overdue';
}

const FinanceManager: React.FC = () => {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Generate fake transaction data
  const transactions: Transaction[] = React.useMemo(() => Array.from({ length: 20 }, (_, index) => {
    const type = faker.helpers.arrayElement<'income' | 'expense'>(['income', 'income', 'income', 'expense']);
    return {
      id: index + 1,
      description: type === 'income' ? `Mensalidade - ${faker.helpers.arrayElement(['Plano Premium', 'Plano Básico', 'Aula Avulsa'])}` : faker.commerce.productName(),
      studentName: type === 'income' ? faker.person.fullName() : undefined,
      category: type === 'income' ? 'Mensalidade' : faker.helpers.arrayElement(['Marketing', 'Aluguel', 'Software', 'Equipamentos']),
      amount: type === 'income' ? faker.number.int({ min: 100, max: 400 }) : faker.number.int({ min: 20, max: 500 }),
      date: faker.date.recent({ days: 90 }),
      type,
      status: faker.helpers.arrayElement(['paid', 'pending', 'overdue']),
    };
  }), []);

  const totalIncome = transactions.filter(t => t.type === 'income' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense' && t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const overdueAmount = transactions.filter(t => t.status === 'overdue').reduce((sum, t) => sum + t.amount, 0);

  const getStatusPill = (status: 'paid' | 'pending' | 'overdue') => {
    const styles = {
      paid: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      overdue: 'bg-error/10 text-error',
    };
    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Atrasado',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Gestão Financeira</h1>
          <p className="text-text-secondary">Controle suas receitas, despesas e faturamento</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowExpenseModal(true)}
            className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <TrendingDown className="w-5 h-5 text-error" />
            Nova Despesa
          </button>
          <button 
            onClick={() => setShowIncomeModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Nova Receita
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-success">+5.2%</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            R$ {totalIncome.toFixed(2).replace('.',',')}
          </div>
          <div className="text-sm text-text-secondary">Faturamento Mensal</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-error rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
             <span className="text-sm font-medium text-success">+1.8%</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            R$ {totalExpenses.toFixed(2).replace('.',',')}
          </div>
          <div className="text-sm text-text-secondary">Despesas Mensais</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
             <span className="text-sm font-medium text-success">+12.1%</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            R$ {netProfit.toFixed(2).replace('.',',')}
          </div>
          <div className="text-sm text-text-secondary">Lucro Líquido</div>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
             <span className="text-sm font-medium text-error">-3.4%</span>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            R$ {overdueAmount.toFixed(2).replace('.',',')}
          </div>
          <div className="text-sm text-text-secondary">Inadimplência</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-surface p-6 rounded-xl shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Últimas Transações</h3>
           <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input type="text" placeholder="Buscar transação..." className="pl-10 pr-4 py-2 w-full border border-border rounded-lg" />
            </div>
            <button className="p-2 border border-border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Data</th>
                <th scope="col" className="px-6 py-3">Descrição</th>
                <th scope="col" className="px-6 py-3">Aluno/Categoria</th>
                <th scope="col" className="px-6 py-3">Valor</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{t.date.toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{t.description}</td>
                  <td className="px-6 py-4">{t.studentName || t.category}</td>
                  <td className={`px-6 py-4 font-medium ${t.type === 'income' ? 'text-success' : 'text-error'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2).replace('.',',')}
                  </td>
                  <td className="px-6 py-4">{getStatusPill(t.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modals */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Nova Receita</h2>
              <button onClick={() => setShowIncomeModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Descrição</label>
                <input type="text" placeholder="Ex: Mensalidade Plano Premium" className="w-full px-3 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Aluno</label>
                <input type="text" placeholder="Buscar aluno..." className="w-full px-3 py-2 border border-border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Valor (R$)</label>
                  <input type="number" placeholder="250.00" className="w-full px-3 py-2 border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Data</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-lg" />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Adicionar Receita</button>
                <button type="button" onClick={() => setShowIncomeModal(false)} className="border border-border text-text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-50">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">Nova Despesa</h2>
              <button onClick={() => setShowExpenseModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Descrição</label>
                <input type="text" placeholder="Ex: Compra de anilhas" className="w-full px-3 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Categoria</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg">
                  <option>Equipamentos</option>
                  <option>Marketing</option>
                  <option>Software</option>
                  <option>Aluguel</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Valor (R$)</label>
                  <input type="number" placeholder="500.00" className="w-full px-3 py-2 border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Data</label>
                  <input type="date" className="w-full px-3 py-2 border border-border rounded-lg" />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Adicionar Despesa</button>
                <button type="button" onClick={() => setShowExpenseModal(false)} className="border border-border text-text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-50">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceManager;
