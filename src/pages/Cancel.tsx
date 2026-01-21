import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Payment Cancelled
          </h1>
          
          <p className="text-muted-foreground mb-8">
            No worries! Your payment was not processed. 
            You can try again whenever you're ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <Button className="w-full sm:w-auto gap-2" data-testid="button-cancel-browse">
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full sm:w-auto gap-2" data-testid="button-cancel-help">
                <HelpCircle className="h-4 w-4" />
                Need Help?
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Having issues with payment? Contact us at{" "}
            <a href="mailto:contact@revisedirect.com" className="text-primary hover:underline">
              contact@revisedirect.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
