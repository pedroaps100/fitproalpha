import React from 'react';
import { Dumbbell, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Produto',
      links: [
        'Recursos',
        'Preços',
        'Integrações',
        'Atualizações',
        'Demos',
      ],
    },
    {
      title: 'Empresa',
      links: [
        'Sobre nós',
        'Carreiras',
        'Blog',
        'Imprensa',
        'Parceiros',
      ],
    },
    {
      title: 'Suporte',
      links: [
        'Central de Ajuda',
        'Documentação',
        'Contato',
        'Status',
        'Comunidade',
      ],
    },
    {
      title: 'Legal',
      links: [
        'Privacidade',
        'Termos',
        'Cookies',
        'Licenças',
        'Segurança',
      ],
    },
  ];

  return (
    <footer className="bg-text-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">FitPRO</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A plataforma completa para personal trainers que querem transformar sua paixão em um negócio de sucesso.
            </p>
            <div className="flex items-center gap-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                contato@fitpro.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                (11) 9 9999-9999
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                São Paulo, SP
              </div>
            </div>
            <div className="text-sm text-gray-300">
              © 2025 FitPRO. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
