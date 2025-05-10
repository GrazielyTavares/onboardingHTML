import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Mail, Phone, Search, Users } from 'lucide-react';

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Carlos Mendes',
    role: 'Diretor de Tecnologia',
    department: 'Tecnologia',
    avatar: 'https://i.pravatar.cc/150?img=60',
    email: 'carlos.mendes@vivo.com.br',
    level: 'director'
  },
  {
    id: '2',
    name: 'Renata Silva',
    role: 'Gerente de Desenvolvimento',
    department: 'Tecnologia',
    avatar: 'https://i.pravatar.cc/150?img=32',
    email: 'renata.silva@vivo.com.br',
    level: 'manager',
    isDirectManager: true
  },
  {
    id: '3',
    name: 'Lucas Oliveira',
    role: 'Tech Lead Frontend',
    department: 'Desenvolvimento',
    avatar: 'https://i.pravatar.cc/150?img=12',
    email: 'lucas.oliveira@vivo.com.br',
    level: 'manager'
  },
  {
    id: '4',
    name: 'Juliana Costa',
    role: 'Desenvolvedora Frontend Sênior',
    department: 'Desenvolvimento',
    avatar: 'https://i.pravatar.cc/150?img=23',
    email: 'juliana.costa@vivo.com.br',
    level: 'peer'
  },
  {
    id: '5',
    name: 'Ricardo Martins',
    role: 'Desenvolvedor Frontend Pleno',
    department: 'Desenvolvimento',
    avatar: 'https://i.pravatar.cc/150?img=53',
    email: 'ricardo.martins@vivo.com.br',
    level: 'peer'
  },
  {
    id: '6',
    name: 'Marina Santos',
    role: 'Desenvolvedora Frontend Júnior',
    department: 'Desenvolvimento',
    avatar: 'https://i.pravatar.cc/150?img=41',
    email: 'marina.santos@vivo.com.br',
    level: 'peer'
  },
  {
    id: '7',
    name: 'Fernando Lima',
    role: 'UX/UI Designer',
    department: 'Design',
    avatar: 'https://i.pravatar.cc/150?img=67',
    email: 'fernando.lima@vivo.com.br',
    level: 'peer'
  },
  {
    id: '8',
    name: 'Carla Sousa',
    role: 'Product Owner',
    department: 'Produto',
    avatar: 'https://i.pravatar.cc/150?img=25',
    email: 'carla.sousa@vivo.com.br',
    level: 'peer'
  }
];

const TeamSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const directors = TEAM_MEMBERS.filter(member => member.level === 'director');
  const managers = TEAM_MEMBERS.filter(member => member.level === 'manager');
  const peers = TEAM_MEMBERS.filter(member => member.level === 'peer');

  const filteredMembers = TEAM_MEMBERS.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Conheça sua Equipe</h2>
        <p className="text-gray-600">
          Aqui está o organograma da sua equipe e estrutura hierárquica. 
          Conheça seus colegas de trabalho e liderança.
        </p>
      </div>

      <div className="relative flex mb-6">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome, cargo ou departamento..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <Users size={18} className="text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-900">Resultados da busca</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredMembers.map(member => (
              <div 
                key={member.id} 
                className="team-card bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.department}</p>
                    </div>
                  </div>
                  {hoveredMember === member.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                      <a 
                        href={`mailto:${member.email}`} 
                        className="flex items-center text-sm text-gray-600 hover:text-purple-700"
                      >
                        <Mail size={14} className="mr-1" />
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-600">Nenhum membro encontrado para a sua busca.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Organograma</h2>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              <div className="flex flex-col items-center">
                {directors.map(director => (
                  <div key={director.id} className="mb-6 text-center">
                    <div className="inline-block">
                      <div className="flex flex-col items-center team-card p-4 rounded-lg border border-purple-200 bg-purple-50 hover:shadow-md transition-all">
                        <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-purple-200 mb-2">
                          <img 
                            src={director.avatar} 
                            alt={director.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <h3 className="font-medium text-gray-900">{director.name}</h3>
                        <p className="text-sm text-gray-600">{director.role}</p>
                      </div>
                    </div>
                    
                    <div className="w-px h-8 bg-gray-300 mx-auto my-2"></div>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                      {managers.map(manager => (
                        <div key={manager.id} className="flex flex-col items-center">
                          <div className={`team-card p-4 rounded-lg border ${manager.isDirectManager ? 'border-purple-200 bg-purple-50' : 'border-gray-200'} hover:shadow-md transition-all`}>
                            <div className={`h-14 w-14 rounded-full overflow-hidden ${manager.isDirectManager ? 'border-2 border-purple-200' : ''} mb-2`}>
                              <img 
                                src={manager.avatar} 
                                alt={manager.name} 
                                className="h-full w-full object-cover" 
                              />
                            </div>
                            <h3 className="font-medium text-gray-900">{manager.name}</h3>
                            <p className="text-sm text-gray-600">{manager.role}</p>
                          </div>
                          
                          {manager.isDirectManager && (
                            <>
                              <div className="w-px h-8 bg-gray-300 mx-auto my-2"></div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
                                {peers.map(peer => (
                                  <div key={peer.id} className="flex flex-col items-center team-card p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                                    <div className="h-12 w-12 rounded-full overflow-hidden mb-2">
                                      <img 
                                        src={peer.avatar} 
                                        alt={peer.name} 
                                        className="h-full w-full object-cover" 
                                      />
                                    </div>
                                    <h3 className="font-medium text-sm text-gray-900">{peer.name}</h3>
                                    <p className="text-xs text-gray-600">{peer.role}</p>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Sua Gerente</h2>
            </div>
            
            <div className="p-6">
              {managers.filter(m => m.isDirectManager).map(manager => (
                <div key={manager.id} className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-2 border-purple-200">
                    <img 
                      src={manager.avatar} 
                      alt={manager.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{manager.name}</h3>
                    <p className="text-purple-800 font-medium mb-4">{manager.role}</p>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-700">
                        Responsável pela equipe de desenvolvimento frontend, com mais de 10 anos de experiência em tecnologia 
                        e gestão de equipes ágeis.
                      </p>
                      <p className="text-gray-700">
                        Sua gerente fará reuniões regulares de 1:1 para acompanhar sua jornada e desenvolvimento na Vivo.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={`mailto:${manager.email}`} 
                        className="flex items-center justify-center sm:justify-start text-purple-700 hover:text-purple-900 px-4 py-2 border border-purple-300 rounded-md"
                      >
                        <Mail size={18} className="mr-2" />
                        Enviar e-mail
                      </a>
                      <button className="flex items-center justify-center sm:justify-start text-purple-700 hover:text-purple-900 px-4 py-2 border border-purple-300 rounded-md">
                        <Phone size={18} className="mr-2" />
                        Agendar conversa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamSection;