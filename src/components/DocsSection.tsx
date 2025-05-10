import React, { useState } from 'react';
import { Document } from '../types';
import { Search, FileText, ExternalLink, BookOpen, Star, StarOff, Bookmark } from 'lucide-react';

const DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Manual do Colaborador',
    description: 'Guia completo com informações essenciais para novos colaboradores',
    url: '#',
    category: 'company',
    isImportant: true
  },
  {
    id: '2',
    title: 'Políticas de Segurança da Informação',
    description: 'Normas e procedimentos para garantir a segurança dos dados',
    url: '#',
    category: 'policy',
    isImportant: true
  },
  {
    id: '3',
    title: 'Guia de Desenvolvimento Frontend',
    description: 'Boas práticas e padrões para desenvolvimento frontend na Vivo',
    url: '#',
    category: 'technical',
    isImportant: false
  },
  {
    id: '4',
    title: 'Arquitetura de Microsserviços',
    description: 'Documentação da arquitetura de microsserviços utilizada nos projetos',
    url: '#',
    category: 'technical',
    isImportant: false
  },
  {
    id: '5',
    title: 'Processo de Desenvolvimento Ágil',
    description: 'Fluxo de trabalho e metodologias ágeis adotadas pela empresa',
    url: '#',
    category: 'process',
    isImportant: true
  },
  {
    id: '6',
    title: 'Benefícios e Plano de Carreira',
    description: 'Informações sobre benefícios, plano de carreira e desenvolvimento profissional',
    url: '#',
    category: 'company',
    isImportant: false
  },
  {
    id: '7',
    title: 'Guia de Acessibilidade',
    description: 'Diretrizes para garantir acessibilidade em todas as interfaces',
    url: '#',
    category: 'technical',
    isImportant: false
  },
  {
    id: '8',
    title: 'Código de Ética e Conduta',
    description: 'Princípios éticos e comportamentos esperados na Vivo',
    url: '#',
    category: 'policy',
    isImportant: true
  }
];

const DocsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'company':
        return <Bookmark size={16} className="text-purple-600" />;
      case 'technical':
        return <FileText size={16} className="text-blue-600" />;
      case 'process':
        return <BookOpen size={16} className="text-green-600" />;
      case 'policy':
        return <BookOpen size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'company':
        return 'Empresa';
      case 'technical':
        return 'Técnico';
      case 'process':
        return 'Processos';
      case 'policy':
        return 'Políticas';
      default:
        return category;
    }
  };

  const filteredDocs = DOCUMENTS
    .filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(doc => 
      activeCategory === 'all' || 
      activeCategory === 'important' ? doc.isImportant : 
      activeCategory === 'favorites' ? favorites.includes(doc.id) : 
      doc.category === activeCategory
    );

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Documentação da Vivo</h2>
            <p className="text-gray-600">
              Aqui você encontra toda a documentação importante para seu trabalho.
              Os documentos marcados com estrela são considerados leitura essencial para todos os colaboradores.
            </p>
          </div>
        </div>
        
        <div className="md:w-1/4">
          <div className="bg-purple-700 p-6 rounded-lg shadow-sm border border-purple-800 text-white h-full">
            <div className="flex items-center mb-2">
              <ExternalLink size={20} className="mr-2" />
              <h2 className="text-lg font-semibold">Link Rápido</h2>
            </div>
            <p className="text-purple-200 mb-4">
              Acesse nossa base de conhecimento completa
            </p>
            <a 
              href="#" 
              className="block bg-white text-purple-900 font-medium px-4 py-2 rounded-md text-center hover:bg-purple-100 transition-colors"
            >
              Base de Conhecimento
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Categorias</h3>
            </div>
            
            <div className="p-2">
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'all' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={18} className="mr-2" />
                    Todos os documentos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveCategory('important')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'important' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Star size={18} className="mr-2" />
                    Leitura essencial
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveCategory('favorites')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'favorites' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Bookmark size={18} className="mr-2" />
                    Meus favoritos
                  </button>
                </li>
                <li className="pt-2 mt-2 border-t border-gray-200">
                  <p className="px-4 py-1 text-xs text-gray-500 uppercase font-medium">Categorias</p>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveCategory('company')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'company' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Bookmark size={18} className="mr-2 text-purple-600" />
                    Empresa
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveCategory('technical')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'technical' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={18} className="mr-2 text-blue-600" />
                    Técnico
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveCategory('process')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'process' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BookOpen size={18} className="mr-2 text-green-600" />
                    Processos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveCategory('policy')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeCategory === 'policy' 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BookOpen size={18} className="mr-2 text-red-600" />
                    Políticas
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Documentos</h2>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredDocs.map((doc) => (
                <div 
                  key={doc.id} 
                  className="p-5 hover:bg-gray-50 transition-colors flex items-start justify-between"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{doc.title}</h3>
                        {doc.isImportant && (
                          <div className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                            Essencial
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                      <div className="flex items-center mt-2">
                        <div className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                          {getCategoryLabel(doc.category)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <button 
                      className="text-gray-500 hover:text-purple-600"
                      onClick={() => toggleFavorite(doc.id)}
                    >
                      {favorites.includes(doc.id) ? (
                        <Star size={20} className="fill-current text-yellow-500" />
                      ) : (
                        <StarOff size={20} />
                      )}
                    </button>
                    <a 
                      href={doc.url} 
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium text-sm px-4 py-2 rounded-md flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Acessar
                    </a>
                  </div>
                </div>
              ))}
              
              {filteredDocs.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-gray-600">Nenhum documento encontrado para a sua busca.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsSection;