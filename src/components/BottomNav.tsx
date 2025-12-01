import { Link, useLocation } from 'react-router-dom';
import { Home, QrCode, ArrowUpCircle, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/wallet', label: 'Wallet', icon: Home },
    { path: '/pay', label: 'Pay', icon: QrCode },
    { path: '/topup', label: 'Top Up', icon: ArrowUpCircle },
    { path: '/transactions', label: 'History', icon: Clock },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-smooth min-w-[64px]',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
                <span className={cn('text-xs', isActive && 'font-semibold')}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
