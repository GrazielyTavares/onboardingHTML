import { useContext } from 'react';
import { BookOpen, Briefcase, FileCog, Users, FileText, Menu, X } from 'lucide-react';
import { Section } from '../types';
import { UserContext } from '../context/UserContext';
import VivoLogo from './VivoLogo';
import ProgressRing from './ProgressRing';
import { useState } from 'react';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const { user } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'track' as Section, label: 'Trilha', icon: BookOpen },
    { id: 'tools' as Section, label: 'Ferramentas', icon: Briefcase },
    { id: 'team' as Section, label: 'Equipe', icon: Users },
    { id: 'docs' as Section, label: 'Docs', icon: FileText },
    { id: 'apis' as Section, label: 'APIs', icon: FileCog },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <VivoLogo size={32} />
          <span className="ml-2 text-xl font-bold text-purple-900">Vivo Onboarding</span>
        </div>
        <button 
          onClick={toggleMobileMenu} 
          className="p-2 rounded-md text-gray-600 hover:text-purple-900 hover:bg-purple-50"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside 
        className={`
          bg-white border-r border-gray-200 w-full md:w-64 flex-shrink-0 overflow-y-auto
          transition-all duration-300 ease-in-out z-30
          ${isMobileMenuOpen ? 'fixed inset-0 h-full' : 'hidden md:block'}
        `}
      >
        <div className="p-6">
          <div className="flex items-center mb-8">
            <VivoLogo size={32} />
            <span className="ml-2 text-xl font-bold text-purple-900">Vivo Onboarding</span>
          </div>

          <div className="mb-8 bg-purple-50 rounded-lg p-4 flex items-center space-x-4">
            <div className="relative">
              <ProgressRing 
                progress={user.progress} 
                size={60} 
                strokeWidth={6} 
                circleColor="#f3e8ff" 
                progressColor="#660099" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-900">{user.progress}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Progresso</h3>
              <p className="text-sm text-gray-600">Continue sua jornada</p>
            </div>
          </div>

          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 p-3 rounded-md transition-all
                      ${activeSection === item.id 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-900'}
                    `}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'track' && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-purple-600"></div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 mt-auto hidden md:block">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-purple-100">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full object-cover" 
              />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;