import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient = false 
}) => {
  return (
    <div className={`p-8 rounded-xl shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 ${
      gradient 
        ? 'bg-gradient-to-br from-primary to-primary-light text-white' 
        : 'bg-surface'
    }`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
        gradient ? 'bg-white/20' : 'bg-primary/10'
      }`}>
        <Icon className={`w-6 h-6 ${gradient ? 'text-white' : 'text-primary'}`} />
      </div>
      <h3 className={`text-xl font-semibold mb-4 ${
        gradient ? 'text-white' : 'text-text-primary'
      }`}>
        {title}
      </h3>
      <p className={`leading-relaxed ${
        gradient ? 'text-white/90' : 'text-text-secondary'
      }`}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
