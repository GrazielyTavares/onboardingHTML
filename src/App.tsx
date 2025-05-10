import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TrackSection from './components/TrackSection';
import ToolsSection from './components/ToolsSection';
import TeamSection from './components/TeamSection';
import DocsSection from './components/DocsSection';
import ApisSection from './components/ApisSection';
import { UserContext } from './context/UserContext';
import { Section } from './types';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('track');
  const [user] = useState({
    name: 'Ana Silva',
    role: 'Desenvolvedora Frontend',
    department: 'Digital',
    progress: 45,
    joinDate: '2023-05-15',
    avatar: 'https://i.pravatar.cc/150?img=5'
  });

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'track':
        return <TrackSection />;
      case 'tools':
        return <ToolsSection />;
      case 'team':
        return <TeamSection />;
      case 'docs':
        return <DocsSection />;
      case 'apis':
        return <ApisSection />;
      default:
        return <TrackSection />;
    }
  };

  return (
    <UserContext.Provider value={{ user }}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {activeSection === 'track' && 'Trilha de Integração'}
                  {activeSection === 'tools' && 'Ferramentas Necessárias'}
                  {activeSection === 'team' && 'Equipe e Organograma'}
                  {activeSection === 'docs' && 'Documentação'}
                  {activeSection === 'apis' && 'APIs e Integrações'}
                </h1>
                <p className="text-gray-600 mt-1">
                  Bem-vindo(a) ao Vivo Onboarding, {user.name}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-purple-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden bg-purple-100">
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;