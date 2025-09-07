import React, { useState } from 'react';
import { User, Lock, Bell, Link as LinkIcon, Sun, Moon, Camera } from 'lucide-react';

type SettingsTab = 'profile' | 'account' | 'notifications' | 'integrations' | 'appearance';

const SettingsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'account', label: 'Conta e Segurança', icon: Lock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'integrations', label: 'Integrações', icon: LinkIcon },
    { id: 'appearance', label: 'Aparência', icon: Sun },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Configurações</h1>
        <p className="text-text-secondary">Gerencie suas preferências e configurações da conta</p>
      </div>

      <div className="flex gap-8">
        {/* Settings Navigation */}
        <aside className="w-1/4">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <main className="w-3/4">
          <div className="bg-surface p-8 rounded-xl shadow-card">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const ProfileSettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-text-primary mb-2">Perfil Público</h2>
    <p className="text-text-secondary mb-8">Essas informações serão exibidas publicamente.</p>
    
    <form className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img src="https://i.pravatar.cc/150?u=joao" alt="João Silva" className="w-24 h-24 rounded-full" />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">João Silva</h3>
          <p className="text-sm text-text-secondary">Personal Trainer</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Nome Completo</label>
          <input type="text" defaultValue="João Silva" className="w-full px-3 py-2 border border-border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
          <input type="email" defaultValue="joao.silva@fitpro.com" className="w-full px-3 py-2 border border-border rounded-lg" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
        <textarea rows={4} defaultValue="Personal trainer com 5 anos de experiência, focado em treinos de força e hipertrofia." className="w-full px-3 py-2 border border-border rounded-lg"></textarea>
      </div>
      <div className="pt-4 border-t border-border text-right">
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Salvar Alterações</button>
      </div>
    </form>
  </div>
);

const AccountSettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-text-primary mb-2">Conta e Segurança</h2>
    <p className="text-text-secondary mb-8">Gerencie sua senha e a segurança da sua conta.</p>
    
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Alterar Senha</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Senha Atual</label>
            <input type="password" className="w-full md:w-2/3 px-3 py-2 border border-border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Nova Senha</label>
            <input type="password" className="w-full md:w-2/3 px-3 py-2 border border-border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Confirmar Nova Senha</label>
            <input type="password" className="w-full md:w-2/3 px-3 py-2 border border-border rounded-lg" />
          </div>
          <div className="pt-2">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Alterar Senha</button>
          </div>
        </form>
      </div>
      <div className="pt-8 border-t border-border">
        <h3 className="text-lg font-semibold mb-4">Excluir Conta</h3>
        <p className="text-text-secondary mb-4">Esta ação é irreversível. Todos os seus dados, incluindo alunos, treinos e informações financeiras, serão permanentemente excluídos.</p>
        <button className="border border-error text-error px-6 py-2 rounded-lg font-medium hover:bg-error/5">Excluir Minha Conta</button>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-text-primary mb-2">Notificações</h2>
    <p className="text-text-secondary mb-8">Escolha como você quer ser notificado.</p>
    
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div>
          <h4 className="font-medium">Novos Alunos</h4>
          <p className="text-sm text-text-secondary">Receber notificação quando um novo aluno se cadastra.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div>
          <h4 className="font-medium">Pagamentos Recebidos</h4>
          <p className="text-sm text-text-secondary">Receber notificação quando um pagamento é confirmado.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div>
          <h4 className="font-medium">Novas Mensagens</h4>
          <p className="text-sm text-text-secondary">Receber notificação para novas mensagens de alunos.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    </div>
  </div>
);

const IntegrationSettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-text-primary mb-2">Integrações</h2>
    <p className="text-text-secondary mb-8">Conecte o FitPRO com outras ferramentas que você usa.</p>
    
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div className="flex items-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" className="w-10 h-10" />
          <div>
            <h4 className="font-medium">Google Calendar</h4>
            <p className="text-sm text-text-secondary">Sincronize sua agenda do FitPRO com o Google Calendar.</p>
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Conectar</button>
      </div>
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div className="flex items-center gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="w-16 h-10" />
          <div>
            <h4 className="font-medium">Stripe</h4>
            <p className="text-sm text-text-secondary">Receba pagamentos online dos seus alunos.</p>
          </div>
        </div>
        <button className="border border-border text-text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-50">Gerenciar</button>
      </div>
    </div>
  </div>
);

const AppearanceSettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-text-primary mb-2">Aparência</h2>
    <p className="text-text-secondary mb-8">Personalize a aparência da plataforma.</p>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">Tema</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-4 border-2 border-primary rounded-lg text-left">
          <div className="flex items-center gap-3">
            <Sun className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-medium">Claro</h4>
              <p className="text-sm text-text-secondary">Tema padrão</p>
            </div>
          </div>
        </button>
        <button className="p-4 border border-border rounded-lg text-left hover:border-primary">
          <div className="flex items-center gap-3">
            <Moon className="w-6 h-6 text-text-secondary" />
            <div>
              <h4 className="font-medium">Escuro</h4>
              <p className="text-sm text-text-secondary">Ideal para ambientes com pouca luz</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
);

export default SettingsManager;
