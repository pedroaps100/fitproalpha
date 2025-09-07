import React, { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, User, Phone, Mail, Award, Calendar, Target } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'trial';
  plan: string;
  lastWorkout: string;
  avatar: string;
  age: number;
  goal: string;
  paymentStatus: 'paid' | 'due' | 'overdue';
}

const StudentsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Generate fake student data
  const students: Student[] = React.useMemo(() => Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    joinDate: faker.date.recent({ days: 180 }).toLocaleDateString('pt-BR'),
    status: faker.helpers.arrayElement(['active', 'inactive', 'trial']),
    plan: faker.helpers.arrayElement(['Básico', 'Premium', 'VIP']),
    lastWorkout: faker.date.recent({ days: 7 }).toLocaleDateString('pt-BR'),
    avatar: faker.image.avatar(),
    age: faker.number.int({ min: 18, max: 60 }),
    goal: faker.helpers.arrayElement(['Perda de peso', 'Hipertrofia', 'Resistência', 'Saúde']),
    paymentStatus: faker.helpers.arrayElement(['paid', 'due', 'overdue']),
  })), []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusPill = (status: 'active' | 'inactive' | 'trial') => {
    const styles = {
      active: 'bg-success/10 text-success',
      inactive: 'bg-error/10 text-error',
      trial: 'bg-warning/10 text-warning',
    };
    const labels = {
      active: 'Ativo',
      inactive: 'Inativo',
      trial: 'Trial',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
  };
  
  const getPaymentStatusPill = (status: 'paid' | 'due' | 'overdue') => {
    const styles = {
      paid: 'bg-success/10 text-success',
      due: 'bg-warning/10 text-warning',
      overdue: 'bg-error/10 text-error',
    };
    const labels = {
      paid: 'Pago',
      due: 'Pendente',
      overdue: 'Atrasado',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Gestão de Alunos</h1>
          <p className="text-text-secondary">Gerencie todos os seus alunos em um só lugar</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Aluno
        </button>
      </div>

      {/* Filters */}
      <div className="bg-surface p-6 rounded-xl shadow-card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="trial">Trial</option>
            </select>
            <button className="p-2 border border-border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-surface p-6 rounded-xl shadow-card hover:shadow-soft transition-all">
            <div className="flex items-center justify-between mb-4">
              <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
              <div className="flex items-center gap-1">
                <button onClick={() => setSelectedStudent(student)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Eye className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Trash2 className="w-4 h-4 text-error" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-text-primary mb-2 truncate">{student.name}</h3>
            <p className="text-sm text-text-secondary mb-4 truncate">{student.email}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Status:</span>
                {getStatusPill(student.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Plano:</span>
                <span className="text-sm font-medium text-text-primary">{student.plan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Último treino:</span>
                <span className="text-sm text-text-primary">{student.lastWorkout}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedStudent(student)}
              className="w-full mt-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Nenhum aluno encontrado</h3>
          <p className="text-text-secondary">Tente ajustar os filtros ou adicione seu primeiro aluno</p>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{selectedStudent.name}</h2>
                    <p className="text-text-secondary">{selectedStudent.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-text-primary mb-4">Informações de Contato</h3>
                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-text-secondary"/> {selectedStudent.email}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-text-secondary"/> {selectedStudent.phone}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-text-primary mb-4">Detalhes da Assinatura</h3>
                  <div className="space-y-3 text-sm">
                    <p className="flex items-center justify-between"><span>Plano:</span> <span className="font-medium text-text-primary">{selectedStudent.plan}</span></p>
                    <p className="flex items-center justify-between"><span>Status:</span> {getStatusPill(selectedStudent.status)}</p>
                    <p className="flex items-center justify-between"><span>Pagamento:</span> {getPaymentStatusPill(selectedStudent.paymentStatus)}</p>
                    <p className="flex items-center justify-between"><span>Membro desde:</span> <span className="font-medium text-text-primary">{selectedStudent.joinDate}</span></p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-text-primary mb-4">Atividade e Metas</h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center justify-between"><span>Idade:</span> <span className="font-medium text-text-primary">{selectedStudent.age} anos</span></p>
                  <p className="flex items-center justify-between"><span>Meta Principal:</span> <span className="font-medium text-text-primary">{selectedStudent.goal}</span></p>
                  <p className="flex items-center justify-between"><span>Último Treino:</span> <span className="font-medium text-text-primary">{selectedStudent.lastWorkout}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
                  <Edit className="w-5 h-5" /> Editar Aluno
                </button>
                <button className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Target className="w-5 h-5" /> Ver Treinos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Student Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary">Criar Novo Aluno</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
              </div>
            </div>
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Nome Completo</label>
                <input type="text" placeholder="Ex: Maria Santos" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  <input type="email" placeholder="maria.santos@email.com" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Telefone</label>
                  <input type="tel" placeholder="(11) 99999-9999" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Plano</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Básico</option>
                    <option>Premium</option>
                    <option>VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="active">Ativo</option>
                    <option value="trial">Trial</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-6">
                <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark">Criar Aluno</button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManager;
