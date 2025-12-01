import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Waves, Wallet, QrCode, ArrowUpCircle } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Redirect to wallet if already logged in
    if (user && !isLoading) {
      navigate('/wallet', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary via-primary/90 to-accent">
    <div className="min-h-screen flex flex-col bg-black/20 from-black via-black/90 to-black">  
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="animate-fade-in mb-8">
            <div className="inline-flex items-center justify-center w-24 mb-4">
            <img src="/logo-svg-black.svg" alt="BGS Logo" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Wallet App</h1>
            <p className="text-black/80 text-sm mb-1">Surf Supply & Coffee Bar</p>            
            <p className="text-black/80 text-sm">Your cashless payment companion</p>
          </div>

          {/* Features */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-soft">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Digital Wallet</p>
                  <p className="text-xs text-muted-foreground">View balance & transactions</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-secondary/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <QrCode className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">QR Payments</p>
                  <p className="text-xs text-muted-foreground">Pay in-store instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-accent/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <ArrowUpCircle className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Easy Top Up</p>
                  <p className="text-xs text-muted-foreground">Add balance at store or online</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => navigate('/auth')}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-black text-white hover:bg-white/90 shadow-soft"
          >
            Get Started
          </Button>

          <p className="text-black/70 text-xs mt-6">
            Works at all BGS locations
          </p>
        </div>
      </div>
    </div>
  );
}
