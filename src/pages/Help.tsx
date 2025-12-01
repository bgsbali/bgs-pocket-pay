import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Help & Support</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Contact Support */}
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
                onClick={() => window.location.href = 'https://wa.me/6285773741556'}
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium">WhatsApp Support</p>
                  <p className="text-xs text-muted-foreground">+62 857 7374 1556</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
                onClick={() => window.location.href = 'mailto:support@bgsbali.com'}
              >
                <Mail className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Email Support</p>
                  <p className="text-xs text-muted-foreground">support@bgsbali.com</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
                onClick={() => window.location.href = 'tel:+6285773741556'}
              >
                <Phone className="h-5 w-5 text-secondary" />
                <div className="text-left">
                  <p className="font-medium">Call Us</p>
                  <p className="text-xs text-muted-foreground">+62 857 7374 1556</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I top up my wallet?</AccordionTrigger>
                  <AccordionContent>
                    You can top up at any BGS store with cash or QRIS, or online through the BGS website. 
                    Visit the Top Up page in the app for detailed instructions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I pay in store?</AccordionTrigger>
                  <AccordionContent>
                    Simply open the Pay page in the app and show your QR code to the cashier. 
                    They will scan it and process your payment instantly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I use my wallet online?</AccordionTrigger>
                  <AccordionContent>
                    Yes! When shopping on the BGS website, select "Pay with BGS Wallet" at checkout. 
                    Your balance will be checked and payment processed automatically.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I withdraw or transfer money?</AccordionTrigger>
                  <AccordionContent>
                    No, BGS Wallet is a closed-loop system. You cannot withdraw funds or transfer to other users. 
                    Your balance can only be used at BGS stores or on the BGS website.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What if I need a refund?</AccordionTrigger>
                  <AccordionContent>
                    Refunds are handled manually by our staff. Contact any BGS store or our support team, 
                    and we'll adjust your balance accordingly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Is my wallet secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Your wallet uses secure authentication and your QR code can be blurred for security. 
                    The app will automatically log you out after 30 minutes of inactivity.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Where can I use BGS Wallet?</AccordionTrigger>
                  <AccordionContent>
                    BGS Wallet can be used at all BGS locations (Canggu, Uluwatu, Seminyak) 
                    and on the BGS online store at bgsbali.com
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* App Info */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm font-medium">BGS Wallet App</p>
            <p className="text-xs text-muted-foreground mt-1">Version 1.0.0 (MVP)</p>
            <p className="text-xs text-muted-foreground mt-2">
              © 2025 BGS Surf Supply & Coffee Bar
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
