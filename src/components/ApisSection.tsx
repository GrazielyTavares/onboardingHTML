import React, { useState } from 'react';
import { Api } from '../types';
import { Search, ExternalLink, Copy, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const APIS: Api[] = [
  {
    id: '1',
    name: 'API de Clientes',
    description: 'API para gerenciamento de dados de clientes da Vivo',
    documentation: 'https://api.vivo.com.br/docs/clientes',
    category: 'internal',
    status: 'active'
  },
  {
    id: '2',
    name: 'API de Pagamentos',
    description: 'Integração com gateway de pagamentos para processamento de transações',
    documentation: 'https://api.vivo.com.br/docs/pagamentos',
    category: 'internal',
    status: 'active'
  },
  {
    id: '3',
    name: 'API de Notificações',
    description: 'Serviço para envio de notificações via e-mail, SMS e push',
    documentation: 'https://api.vivo.com.br/docs/notificacoes',
    category: 'internal',
    status: 'active'
  },
  {
    id: '4',
    name: 'API de Produtos',
    description: 'Catálogo de produtos e serviços oferecidos pela Vivo',
    documentation: 'https://api.vivo.com.br/docs/produtos',
    category: 'internal',
    status: 'active'
  },
  {
    id: '5',
    name: 'API de Autenticação',
    description: 'Serviço centralizado de autenticação e autorização',
    documentation: 'https://api.vivo.com.br/docs/auth',
    category: 'internal',
    status: 'active'
  },
  {
    id: '6',
    name: 'API de Parceiros',
    description: 'Integração com serviços de parceiros externos',
    documentation: 'https://api.vivo.com.br/docs/parceiros',
    category: 'partner',
    status: 'active'
  },
  {
    id: '7',
    name: 'API de Geolocalização',
    description: 'Serviços de localização e mapas',
    documentation: 'https://api.vivo.com.br/docs/geo',
    category: 'external',
    status: 'active'
  },
  {
    id: '8',
    name: 'API de Analytics (Legado)',
    description: 'Sistema de análise de dados para relatórios gerenciais',
    documentation: 'https://api.vivo.com.br/docs/analytics',
    category: 'internal',
    status: 'deprecated'
  },
  {
    id: '9',
    name: 'API de Recomendações',
    description: 'Sistema de recomendações baseado em IA',
    documentation: 'https://api.vivo.com.br/docs/recommendations',
    category: 'internal',
    status: 'beta'
  }
];

const ApisSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center text-green-700 bg-green-100 rounded-full px-2 py-0.5 text-xs">
            <CheckCircle size={12} className="mr-1" />
            Ativa
          </div>
        );
      case 'deprecated':
        return (
          <div className="flex items-center text-red-700 bg-red-100 rounded-full px-2 py-0.5 text-xs">
            <XCircle size={12} className="mr-1" />
            Descontinuada
          </div>
        );
      case 'beta':
        return (
          <div className="flex items-center text-amber-700 bg-amber-100 rounded-full px-2 py-0.5 text-xs">
            <RefreshCw size={12} className="mr-1" />
            Beta
          </div>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'internal':
        return (
          <div className="bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 text-xs">
            Interna
          </div>
        );
      case 'external':
        return (
          <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs">
            Externa
          </div>
        );
      case 'partner':
        return (
          <div className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs">
            Parceiro
          </div>
        );
      default:
        return null;
    }
  };

  const filteredApis = APIS
    .filter(api => 
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      api.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(api => 
      (activeCategory === 'all' || api.category === activeCategory) && 
      (activeStatus === 'all' || api.status === activeStatus)
    );

  return (
    <div className="fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">APIs e Integrações</h2>
        <p className="text-gray-600">
          Conheça todas as APIs disponíveis para uso em suas aplicações.
          Aqui você encontra documentação, exemplos e status de cada API.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-end gap-4 mb-6">
        <div className="w-full md:flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar APIs..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <select 
            className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="all">Todas categorias</option>
            <option value="internal">Internas</option>
            <option value="external">Externas</option>
            <option value="partner">Parceiros</option>
          </select>
        </div>
        
        <div className="w-full md:w-auto">
          <select 
            className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
          >
            <option value="all">Todos status</option>
            <option value="active">Ativas</option>
            <option value="beta">Beta</option>
            <option value="deprecated">Descontinuadas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  API
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApis.map((api) => (
                <tr key={api.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{api.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{api.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryBadge(api.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(api.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="text-gray-600 hover:text-purple-900"
                        onClick={() => handleCopyUrl(api.documentation, api.id)}
                      >
                        {copiedId === api.id ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <a 
                        href={api.documentation} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-md text-xs font-medium flex items-center"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Docs
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredApis.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-600">
                    Nenhuma API encontrada para a sua busca.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-medium text-purple-900 mb-2">Acessos às APIs</h3>
        <p className="text-gray-700 mb-4">
          Para utilizar as APIs internas da Vivo, você precisará de credenciais de acesso.
          Entre em contato com o time de APIs para solicitar suas chaves de acesso.
        </p>
        <a 
          href="#" 
          className="inline-flex items-center px-4 py-2 bg-purple-700 text-white font-medium rounded-md hover:bg-purple-800 transition-colors"
        >
          Solicitar Acesso
        </a>
      </div>
    </div>
  );
};

export default ApisSection;