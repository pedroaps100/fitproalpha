import React from 'react';
import { Users, Calendar, TrendingUp, CreditCard, MessageSquare, Target } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Alunos',
      description: 'Cadastre e acompanhe todos os seus alunos em um só lugar. Histórico completo, medidas e evolução.',
      gradient: true,
    },
    {
      icon: Target,
      title: 'Planos de Treino',
      description: 'Crie treinos personalizados com editor visual intuitivo. Templates prontos e biblioteca de exercícios.',
    },
    {
      icon: TrendingUp,
      title: 'Relatórios Analíticos',
      description: 'Acompanhe seu faturamento, performance dos alunos e métricas importantes do seu negócio.',
    },
    {
      icon: Calendar,
      title: 'Agenda Inteligente',
      description: 'Gerencie horários, aulas e compromissos. Sincronização automática e lembretes personalizados.',
    },
    {
      icon: CreditCard,
      title: 'Gestão Financeira',
      description: 'Controle de pagamentos, mensalidades e relatórios financeiros completos. Integração com meios de pagamento.',
    },
    {
      icon: MessageSquare,
      title: 'Comunicação',
      description: 'Chat integrado com alunos, notificações automáticas e sistema de feedback em tempo real.',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Tudo que Você Precisa em um Só Lugar
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ferramentas profissionais para transformar sua paixão pelo fitness em um negócio de sucesso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
