import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, Info } from 'lucide-react';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';

export default function Pay() {
  const { user } = useAuth();
  const [isBlurred, setIsBlurred] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const qrValue = `BGS_WALLET:${user?.qrCodeUrl}:${user?.id}`;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-black/90 text-white p-6 rounded-b-[2rem] shadow-soft">
          <h1 className="text-2xl font-bold text-center">Pay in Store</h1>
          <p className="text-center text-white/80 text-sm mt-1">
            Show this QR code to the cashier
          </p>
        </div>

        {/* QR Code */}
        <div className="px-6 py-8">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              The cashier will scan your QR code at checkout. Make sure you have sufficient balance.
            </AlertDescription>
          </Alert>

          <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <div 
              className="bg-white p-6 rounded-2xl flex items-center justify-center relative"
              onTouchStart={() => setIsBlurred(true)}
              onTouchEnd={() => setIsBlurred(false)}
              onMouseDown={() => setIsBlurred(true)}
              onMouseUp={() => setIsBlurred(false)}
              onMouseLeave={() => setIsBlurred(false)}
            >
              <div className={`transition-all duration-200 ${isBlurred ? 'blur-lg' : ''}`}>
                <QRCodeSVG
                  key={refreshKey}
                  value={qrValue}
                  size={240}
                  level="H"
                  includeMargin={false}
                  style={{ width: '100%', height: 'auto', maxWidth: '240px' }}
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-muted-foreground mb-4">
                Tap and hold to blur QR code for security
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh QR Code
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="bg-muted/50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">How to Pay</h3>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Show this QR code to the cashier</li>
                <li>Cashier scans using iPad POS</li>
                <li>Payment confirmed instantly</li>
                <li>Receipt appears in your history</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
