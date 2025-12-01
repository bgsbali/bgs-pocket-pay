import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Globe, Banknote, QrCode, ExternalLink } from 'lucide-react';

export default function TopUp() {
  const handleOnlineTopUp = () => {
    // Deep link to BGS website top-up page
    window.open('https://bgsbali.com/topup', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="gradient-sunset text-white p-6 rounded-b-[2rem] shadow-soft">
          <h1 className="text-2xl font-bold text-center">Top Up Balance</h1>
          <p className="text-center text-white/80 text-sm mt-1">
            Add credit to your BGS Wallet
          </p>
        </div>

        <div className="px-6 py-8 space-y-4">
          {/* Top Up at Store */}
          <Card className="shadow-card border-border overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <span>Top Up at Store</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Banknote className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Cash Top Up</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visit any BGS store and tell the cashier you want to top up your wallet. Pay with cash and your balance updates instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <QrCode className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">QRIS Top Up</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      At any BGS store, you can also top up using QRIS (Indonesian digital payment). Staff will assist you.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 mt-4">
                  <p className="text-xs text-muted-foreground">
                    <strong>Available at:</strong> BGS Canggu, BGS Uluwatu, BGS Seminyak
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Up Online */}
          <Card className="shadow-card border-border overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/10 border-b border-border">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-secondary" />
                </div>
                <span>Top Up Online</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Visit the BGS website and top up your wallet using your registered email or phone number. Multiple payment methods accepted.
              </p>

              <Button
                onClick={handleOnlineTopUp}
                className="w-full gap-2"
                variant="secondary"
              >
                <Globe className="h-4 w-4" />
                Go to BGS Website
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>

              <div className="bg-muted/50 rounded-lg p-3 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Accepted:</strong> Credit/Debit Cards, Bank Transfer, E-Wallets
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="shadow-card border-border bg-accent/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-sm mb-3">Important Notes</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>• Minimum top-up: IDR 50,000</li>
                <li>• Maximum balance: IDR 10,000,000</li>
                <li>• Balance updates instantly after top-up</li>
                <li>• No fees for store top-ups</li>
                <li>• Online top-ups may have payment gateway fees</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
