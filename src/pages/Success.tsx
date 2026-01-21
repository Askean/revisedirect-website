import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ArrowRight, Mail } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Payment Successful!
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your revision resources are now ready for download.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              What happens next?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                You will receive an email with your download link
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                Your resources include infographics, exam questions, and mark schemes
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                Check the free YouTube and Podcast content for each unit
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto gap-2" data-testid="button-success-browse">
                Browse More Resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full sm:w-auto gap-2" data-testid="button-success-home">
                Return to Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Having issues? Contact us at{" "}
            <a href="mailto:contact@revisedirect.com" className="text-primary hover:underline">
              contact@revisedirect.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
