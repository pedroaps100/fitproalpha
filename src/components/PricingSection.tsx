import React from 'react';
import { Check, Star } from 'lucide-react';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 47',
      period: '/mês',
      description: 'Perfeito para personal trainers iniciantes',
      features: [
        'Até 30 alunos',
        'Planos de treino básicos',
        'Agenda simples',
        'Relatórios básicos',
        'Suporte por email',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: 'R$ 97',
      period: '/mês',
      description: 'Ideal para profissionais estabelecidos',
      features: [
        'Alunos ilimitados',
        'Editor avançado de treinos',
        'Agenda inteligente',
        'Relatórios completos',
        'Gestão financeira',
        'Chat com alunos',
        'Integração de pagamentos',
        'Suporte prioritário',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'R$ 197',
      period: '/mês',
      description: 'Para academias e grandes operações',
      features: [
        'Múltiplos profissionais',
        'Dashboard de gestão',
        'API personalizada',
        'White label',
        'Relatórios avançados',
        'Suporte dedicado',
        'Treinamento da equipe',
        'Customizações especiais',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Planos que Crescem com Você
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Escolha o plano ideal para o seu momento profissional. Cancele a qualquer momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-surface rounded-2xl p-8 shadow-card hover:shadow-soft transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-primary scale-105 transform' 
                  : 'hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <p className="text-text-secondary mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                plan.popular
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-gray-100 text-text-primary hover:bg-gray-200'
              }`}>
                Começar Agora
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Todos os planos incluem 14 dias de teste gratuito
          </p>
          <button className="text-primary font-medium hover:text-primary-dark">
            Agendar Demonstração Personalizada →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
