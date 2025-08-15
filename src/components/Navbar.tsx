import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  const navLinkClasses = (path: string) =>
    cn(
      'flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md text-sm font-medium',
      location.pathname === path && 'bg-muted text-foreground'
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" fill="none"></rect><path d="M138.7,176.9l-10.4,20.8a8,8,0,0,1-14.6-7.4l22.2-44.3a8,8,0,0,1,14.2,0l22.2,44.3a8,8,0,0,1-14.6,7.4l-10.4-20.8Z" opacity="0.2"></path><path d="M48,80H208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M48,128H208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M104,224l-13.4-26.7a8,8,0,0,0-14.2,0L63,224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M193,224l-13.4-26.7a8,8,0,0,0-14.2,0L152,224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M171.5,147.1l-22.2-44.3a8,8,0,0,0-14.2,0l-22.2,44.3a8,8,0,0,0,7.3,11.2h34.2A8,8,0,0,0,171.5,147.1Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><rect x="40" y="40" width="176" height="184" rx="16" transform="translate(256 40) rotate(90)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect></svg>
            <span className="hidden font-bold sm:inline-block">ПокерТрекер</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link to="/session" className={navLinkClasses('/session')}>
              <PlayCircle className="h-4 w-4" />
              Сессия
            </Link>
            <Link to="/" className={navLinkClasses('/')}>
              <Home className="h-4 w-4" />
              Дашборд
            </Link>
            <Link to="/settings" className={navLinkClasses('/settings')}>
              <Settings className="h-4 w-4" />
              Настройки
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
