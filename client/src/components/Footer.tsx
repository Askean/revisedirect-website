import { Link } from "wouter";
import { Mail, Youtube, Podcast } from "lucide-react";
import logoUrl from "@assets/revisedirectlogo_1768842936073.png";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img 
                src={logoUrl} 
                alt="ReviseDirect Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-muted-foreground max-w-md">
              Premium revision resources for Cambridge IGCSE and AS Level Physical Education. 
              Get exam-ready with our detailed infographics, exam-style questions, mark schemes, 
              and worksheets.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.youtube.com/@ReviseDirect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://revisedirect.podbean.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-podbean"
              >
                <Podcast className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@revisedirect.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?course=igcse" className="text-muted-foreground hover:text-foreground transition-colors">
                  IGCSE PE (0413)
                </Link>
              </li>
              <li>
                <Link href="/products?course=as-level" className="text-muted-foreground hover:text-foreground transition-colors">
                  AS Level SPE (8386)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} ReviseDirect. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            contact@revisedirect.com
          </p>
        </div>
      </div>
    </footer>
  );
}
