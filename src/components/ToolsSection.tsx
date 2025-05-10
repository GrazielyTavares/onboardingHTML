import React, { useState } from 'react';
import { Download, ExternalLink, Check, AlertCircle, Clock, Search, Filter } from 'lucide-react';
import { Tool } from '../types';

const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'VS Code',
    description: 'Editor de código para desenvolvimento frontend e backend',
    icon: '💻',
    downloadLink: 'https://code.visualstudio.com/download',
    requiresLicense: false,
    category: 'development'
  },
  {
    id: '2',
    name: 'Adobe XD',
    description: 'Ferramenta de design para prototipagem de interfaces',
    icon: '🎨',
    downloadLink: 'https://www.adobe.com/products/xd.html',
    requiresLicense: true,
    licenseRequestStatus: 'approved',
    category: 'design'
  },
  {
    id: '3',
    name: 'Slack',
    description: 'Ferramenta de comunicação e colaboração de equipes',
    icon: '💬',
    downloadLink: 'https://slack.com/downloads',
    requiresLicense: true,
    licenseRequestStatus: 'approved',
    category: 'communication'
  },
  {
    id: '4',
    name: 'JetBrains WebStorm',
    description: 'IDE avançada para desenvolvimento web',
    icon: '🚀',
    downloadLink: 'https://www.jetbrains.com/webstorm/download',
    requiresLicense: true,
    licenseRequestStatus: 'pending',
    category: 'development'
  },
  {
    id: '5',
    name: 'Figma',
    description: 'Ferramenta de design e prototipagem colaborativa',
    icon: '✏️',
    downloadLink: 'https://www.figma.com/downloads',
    requiresLicense: true,
    licenseRequestStatus: 'not-requested',
    category: 'design'
  },
  {
    id: '6',
    name: 'Jira',
    description: 'Plataforma de gerenciamento de projetos ágeis',
    icon: '📊',
    requiresLicense: true,
    licenseRequestStatus: 'approved',
    category: 'project-management'
  },
  {
    id: '7',
    name: 'Git',
    description: 'Sistema de controle de versão',
    icon: '🔄',
    downloadLink: 'https://git-scm.com/downloads',
    requiresLicense: false,
    category: 'development'
  },
  {
    id: '8',
    name: 'Postman',
    description: 'Plataforma para testar e documentar APIs',
    icon: '📡',
    downloadLink: 'https://www.postman.com/downloads/',
    requiresLicense: false,
    category: 'development'
  }
];

const ToolsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getLicenseStatusIcon = (status?: string) => {
    switch (status) {
      case 'approved':
        return <Check size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-amber-500" />;
      case 'denied':
        return <AlertCircle size={16} className="text-red-600" />;
      case 'not-requested':
        return <AlertCircle size={16} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getLicenseStatusText = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'Licença aprovada';
      case 'pending':
        return 'Aprovação pendente';
      case 'denied':
        return 'Licença negada';
      case 'not-requested':
        return 'Solicitar licença';
      default:
        return '';
    }
  };

  const filteredTools = TOOLS
    .filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(tool => 
      activeFilter === 'all' || tool.category === activeFilter
    );

  return (
    <div className="fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Ferramentas Necessárias</h2>
        <p className="text-gray-600">
          Aqui estão todas as ferramentas que você precisará instalar e configurar para começar a trabalhar.
          Para ferramentas que exigem licença, você pode solicitar diretamente por aqui.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ferramentas..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <Filter size={18} className="text-gray-400 mr-2" />
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="all">Todas categorias</option>
            <option value="development">Desenvolvimento</option>
            <option value="design">Design</option>
            <option value="communication">Comunicação</option>
            <option value="project-management">Gerenciamento</option>
            <option value="other">Outros</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div 
            key={tool.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                    {tool.icon}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
              {tool.requiresLicense && (
                <div className="flex items-center mb-3 text-sm">
                  {getLicenseStatusIcon(tool.licenseRequestStatus)}
                  <span className="ml-2 text-gray-600">
                    {getLicenseStatusText(tool.licenseRequestStatus)}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                {tool.downloadLink ? (
                  <a 
                    href={tool.downloadLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-900"
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </a>
                ) : (
                  <a 
                    href="#" 
                    className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-900"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Acessar
                  </a>
                )}
                
                {tool.requiresLicense && tool.licenseRequestStatus !== 'approved' && (
                  <button 
                    className={`text-sm font-medium rounded-md px-3 py-1 ${
                      tool.licenseRequestStatus === 'pending' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    }`}
                    disabled={tool.licenseRequestStatus === 'pending'}
                  >
                    {tool.licenseRequestStatus === 'pending' ? 'Em análise' : 'Solicitar acesso'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTools.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600">Nenhuma ferramenta encontrada para a sua busca.</p>
        </div>
      )}
    </div>
  );
};

export default ToolsSection;