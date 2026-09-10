import React, { useState, useEffect } from 'react';
import { TelemetryProvider } from './context/TelemetryContext';
import { GlobalNav } from './components/navigation/GlobalNav';
import { Footer } from './components/navigation/Footer';

// Routes
import { Home } from './routes/Home';
import { System } from './routes/System';
import { Models } from './routes/Models';
import { Runtime } from './routes/Runtime';
import { Knowledge } from './routes/Knowledge';
import { Automation } from './routes/Automation';
import { Agents } from './routes/Agents';
import { Integrations } from './routes/Integrations';
import { Business } from './routes/Business';
import { Efficiency } from './routes/Efficiency';
import { Observability } from './routes/Observability';
import { Playground } from './routes/Playground';
import { Features } from './routes/Features';
import { UseCases } from './routes/UseCases';
import { Developers } from './routes/Developers';
import { Docs } from './routes/Docs';
import { Enterprise } from './routes/Enterprise';
import { Security } from './routes/Security';
import { Download } from './routes/Download';
import { Pricing } from './routes/Pricing';
import { Changelog } from './routes/Changelog';
import { Blog } from './routes/Blog';
import { Status } from './routes/Status';
import { Contact } from './routes/Contact';

export const App: React.FC = () => {
  // Path tracking with URL sync
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || window.location.pathname || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRoute = () => {
    switch (currentPath) {
      case '/system':
        return <System />;
      case '/models':
        return <Models navigate={navigate} />;
      case '/runtime':
        return <Runtime />;
      case '/knowledge':
        return <Knowledge />;
      case '/automation':
        return <Automation />;
      case '/agents':
        return <Agents />;
      case '/integrations':
        return <Integrations />;
      case '/business':
        return <Business />;
      case '/efficiency':
        return <Efficiency />;
      case '/observability':
        return <Observability />;
      case '/playground':
        return <Playground />;
      case '/features':
        return <Features />;
      case '/use-cases':
        return <UseCases />;
      case '/developers':
        return <Developers />;
      case '/docs':
        return <Docs />;
      case '/enterprise':
        return <Enterprise />;
      case '/security':
        return <Security />;
      case '/download':
        return <Download />;
      case '/pricing':
        return <Pricing navigate={navigate} />;
      case '/changelog':
        return <Changelog />;
      case '/blog':
        return <Blog />;
      case '/status':
        return <Status />;
      case '/contact':
        return <Contact />;
      case '/':
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <TelemetryProvider>
      <div className="min-h-screen bg-machine-950 text-machine-200 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative">
        {/* Ambient Top Tech Haze */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
        
        {/* Global Navigation */}
        <GlobalNav currentRoute={currentPath} navigate={navigate} />

        {/* Dynamic Route Content */}
        <main className="flex-1 relative z-10">
          {renderRoute()}
        </main>

        {/* Global Footer */}
        <Footer navigate={navigate} />
      </div>
    </TelemetryProvider>
  );
};
