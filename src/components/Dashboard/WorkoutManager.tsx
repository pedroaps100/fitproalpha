import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Target, 
  Clock, 
  Users,
  Dumbbell,
  Play,
  Copy,
  Calendar
} from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rest: string;
  notes?: string;
}

interface Workout {
  id: number;
  name: string;
  category: string;
  duration: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  exercises: Exercise[];
  assignedStudents: number;
  createdDate: string;
  lastUsed: string;
  description: string;
}

const WorkoutManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Generate sample exercises
  const generateExercises = (): Exercise[] => {
    const exerciseNames = [
      'Supino reto', 'Agachamento', 'Levantamento terra', 'Rosca direta',
      'Desenvolvimento', 'Remada curvada', 'Leg press', 'Flexão de braço',
      'Abdominal', 'Prancha', 'Burpee', 'Mountain climber'
    ];
    
    return Array.from({ length: faker.number.int({ min: 4, max: 8 }) }, (_, index) => ({
      id: index + 1,
      name: faker.helpers.arrayElement(exerciseNames),
      sets: faker.number.int({ min: 3, max: 5 }),
      reps: faker.helpers.arrayElement(['8-12', '10-15', '12-20', '15-25']),
      weight: `${faker.number.int({ min: 10, max: 100 })}kg`,
      rest: `${faker.number.int({ min: 30, max: 120 })}s`,
      notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 })
    }));
  };

  // Generate sample workouts
  const workouts: Workout[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: faker.helpers.arrayElement([
      'Treino Força Superior', 'Treino Pernas Completo', 'Cardio HIIT',
      'Treino Funcional', 'Push Pull Legs', 'Treino Iniciante',
      'Hipertrofia Braços', 'Core Training', 'Mobilidade Geral',
      'Treino Resistência', 'Upper Body', 'Lower Body'
    ]),
    category: faker.helpers.arrayElement(['Força', 'Cardio', 'Funcional', 'Hipertrofia', 'Mobilidade']),
    duration: faker.number.int({ min: 30, max: 90 }),
    difficulty: faker.helpers.arrayElement(['Iniciante', 'Intermediário', 'Avançado']),
    exercises: generateExercises(),
    assignedStudents: faker.number.int({ min: 0, max: 25 }),
    createdDate: faker.date.recent({ days: 60 }).toLocaleDateString('pt-BR'),
    lastUsed: faker.date.recent({ days: 30 }).toLocaleDateString('pt-BR'),
    description: faker.lorem.sentences(2)
  }));

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || workout.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || workout.difficulty === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-success/10 text-success';
      case 'Intermediário': return 'bg-warning/10 text-warning';
      case 'Avançado': return 'bg-error/10 text-error';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Força': return '💪';
      case 'Cardio': return '❤️';
      case 'Funcional': return '🏃';
      case 'Hipertrofia': return '🔥';
      case 'Mobilidade': return '🧘';
      default: return '🎯';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Planos de Treino</h1>
          <p className="text-text-secondary">Crie e gerencie treinos personalizados para seus alunos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Copy className="w-5 h-5" />
            Importar Treino
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Treino
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface p-6 rounded-xl shadow-card mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todas as Categorias</option>
              <option value="Força">Força</option>
              <option value="Cardio">Cardio</option>
              <option value="Funcional">Funcional</option>
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Mobilidade">Mobilidade</option>
            </select>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todas as Dificuldades</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <button className="p-2 border border-border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {workouts.length}
          </div>
          <div className="text-sm text-text-secondary">
            Total de Treinos
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {workouts.reduce((sum, w) => sum + w.assignedStudents, 0)}
          </div>
          <div className="text-sm text-text-secondary">
            Alunos Atribuídos
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length)}min
          </div>
          <div className="text-sm text-text-secondary">
            Duração Média
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {workouts.reduce((sum, w) => sum + w.exercises.length, 0)}
          </div>
          <div className="text-sm text-text-secondary">
            Total de Exercícios
          </div>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-surface p-6 rounded-xl shadow-card hover:shadow-soft transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getCategoryIcon(workout.category)}</div>
                <div>
                  <h3 className="font-semibold text-text-primary">{workout.name}</h3>
                  <p className="text-sm text-text-secondary">{workout.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setSelectedWorkout(workout)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Ver detalhes"
                >
                  <Eye className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Editar">
                  <Edit className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Duplicar">
                  <Copy className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Excluir">
                  <Trash2 className="w-4 h-4 text-error" />
                </button>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {workout.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Dificuldade:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Duração:</span>
                <span className="text-sm font-medium text-text-primary">{workout.duration}min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Exercícios:</span>
                <span className="text-sm font-medium text-text-primary">{workout.exercises.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Alunos:</span>
                <span className="text-sm font-medium text-text-primary">{workout.assignedStudents}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Aplicar
              </button>
              <button className="px-3 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Nenhum treino encontrado</h3>
          <p className="text-text-secondary">Tente ajustar os filtros ou crie seu primeiro treino</p>
        </div>
      )}

      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{selectedWorkout.name}</h2>
                  <p className="text-text-secondary">{selectedWorkout.category} • {selectedWorkout.difficulty}</p>
                </div>
                <button 
                  onClick={() => setSelectedWorkout(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedWorkout.duration}min</div>
                  <div className="text-sm text-text-secondary">Duração</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedWorkout.exercises.length}</div>
                  <div className="text-sm text-text-secondary">Exercícios</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{selectedWorkout.assignedStudents}</div>
                  <div className="text-sm text-text-secondary">Alunos</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Exercícios</h3>
                <div className="space-y-4">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">
                          {index + 1}. {exercise.name}
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-text-secondary">Séries:</span>
                          <span className="ml-2 font-medium">{exercise.sets}</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Repetições:</span>
                          <span className="ml-2 font-medium">{exercise.reps}</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Peso:</span>
                          <span className="ml-2 font-medium">{exercise.weight}</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Descanso:</span>
                          <span className="ml-2 font-medium">{exercise.rest}</span>
                        </div>
                      </div>
                      {exercise.notes && (
                        <div className="mt-2 text-sm text-text-secondary">
                          <strong>Observações:</strong> {exercise.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Aplicar a Aluno
                </button>
                <button className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Copy className="w-5 h-5" />
                  Duplicar Treino
                </button>
                <button className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Workout Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary">Criar Novo Treino</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Nome do Treino
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Treino Força Superior"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Categoria
                    </label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Selecione uma categoria</option>
                      <option value="Força">Força</option>
                      <option value="Cardio">Cardio</option>
                      <option value="Funcional">Funcional</option>
                      <option value="Hipertrofia">Hipertrofia</option>
                      <option value="Mobilidade">Mobilidade</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Dificuldade
                    </label>
                    <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">Selecione a dificuldade</option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Duração (minutos)
                  </label>
                  <input
                    type="number"
                    placeholder="60"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descreva o objetivo e características do treino..."
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Criar Treino
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutManager;
