import React, { useState } from 'react';
import { Check, Clock, AlertCircle, BookOpen, FileText, Award, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import ProgressBar from './ProgressBar';

const COURSES: Course[] = [
  {
    id: '1',
    title: 'Boas-vindas à Vivo',
    description: 'Conheça nossa história, valores e cultura organizacional',
    duration: '2 horas',
    type: 'mandatory',
    status: 'completed',
    progress: 100,
    dueDate: '2023-05-20'
  },
  {
    id: '2',
    title: 'Segurança da Informação',
    description: 'Aprenda as melhores práticas de segurança e proteção de dados',
    duration: '3 horas',
    type: 'mandatory',
    status: 'completed',
    progress: 100,
    dueDate: '2023-05-25'
  },
  {
    id: '3',
    title: 'Código de Ética',
    description: 'Entenda os valores e comportamentos esperados na Vivo',
    duration: '1.5 horas',
    type: 'mandatory',
    status: 'in-progress',
    progress: 60,
    dueDate: '2023-06-05'
  },
  {
    id: '4',
    title: 'Benefícios Vivo',
    description: 'Conheça todos os benefícios oferecidos pela empresa',
    duration: '1 hora',
    type: 'mandatory',
    status: 'not-started',
    progress: 0,
    dueDate: '2023-06-10'
  },
  {
    id: '5',
    title: 'React Avançado',
    description: 'Aprenda técnicas avançadas de desenvolvimento com React',
    duration: '8 horas',
    type: 'technical',
    status: 'not-started',
    progress: 0,
    dueDate: '2023-06-30'
  },
  {
    id: '6',
    title: 'APIs REST',
    description: 'Princípios de design e implementação de APIs REST',
    duration: '4 horas',
    type: 'technical',
    status: 'not-started',
    progress: 0,
    dueDate: '2023-07-10'
  }
];

const TrackSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mandatory' | 'technical' | 'soft-skills'>('all');
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check size={20} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={20} className="text-amber-500" />;
      case 'not-started':
        return <AlertCircle size={20} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'mandatory':
        return <AlertCircle size={18} className="text-purple-600" />;
      case 'technical':
        return <BookOpen size={18} className="text-blue-600" />;
      case 'soft-skills':
        return <Award size={18} className="text-amber-600" />;
      default:
        return <FileText size={18} className="text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mandatory':
        return 'Obrigatório';
      case 'technical':
        return 'Técnico';
      case 'soft-skills':
        return 'Soft Skills';
      default:
        return type;
    }
  };

  const filteredCourses = activeFilter === 'all' 
    ? COURSES 
    : COURSES.filter(course => course.type === activeFilter);

  const completedCount = COURSES.filter(course => course.status === 'completed').length;
  const totalCount = COURSES.length;
  const completedPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Progresso Total</h3>
            <span className="text-sm font-medium text-purple-900">{completedCount}/{totalCount} cursos</span>
          </div>
          <ProgressBar progress={completedPercentage} />
          <p className="text-sm text-gray-600 mt-2">
            Continue sua jornada para concluir o processo de integração
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Próxima tarefa</h3>
          <p className="text-sm text-gray-600 mb-4">Código de Ética</p>
          <ProgressBar progress={60} />
          <div className="flex justify-end mt-4">
            <button className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-900">
              Continuar <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Deadline</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2 text-purple-600" />
            <span>15 dias restantes para completar tarefas obrigatórias</span>
          </div>
          <div className="mt-4 flex items-center">
            <div className="h-2 flex-1 bg-purple-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="ml-2 text-sm font-medium text-purple-900">75%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Trilha de Integração</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'all' 
                    ? 'bg-purple-100 text-purple-900' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveFilter('mandatory')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'mandatory' 
                    ? 'bg-purple-100 text-purple-900' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Obrigatórios
              </button>
              <button 
                onClick={() => setActiveFilter('technical')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'technical' 
                    ? 'bg-purple-100 text-purple-900' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Técnicos
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-shrink-0">
                {getStatusIcon(course.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <div className="flex items-center bg-gray-100 px-2 py-0.5 rounded text-xs">
                    {getCategoryIcon(course.type)}
                    <span className="ml-1">{getTypeLabel(course.type)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span className="mr-4">{course.duration}</span>
                  <span>Vencimento: {new Date(course.dueDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="md:w-1/4">
                {course.status !== 'not-started' && (
                  <ProgressBar progress={course.progress} />
                )}
              </div>
              
              <div className="flex-shrink-0">
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    course.status === 'completed'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                  disabled={course.status === 'completed'}
                >
                  {course.status === 'completed' && 'Concluído'}
                  {course.status === 'in-progress' && 'Continuar'}
                  {course.status === 'not-started' && 'Iniciar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackSection;