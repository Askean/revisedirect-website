import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, BookOpen, FileText, Youtube, Podcast, Clock } from "lucide-react";
import type { ProductWithPrice } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithPrice;
  onPurchase?: (priceId: string) => void;
  isPending?: boolean;
}

export function ProductCard({ product, onPurchase, isPending }: ProductCardProps) {
  const price = product.prices[0];
  const isAvailable = product.metadata?.available === "true";
  const course = product.metadata?.course;
  const unitNumber = product.metadata?.unitNumber;
  const youtubeUrl = product.metadata?.youtubeUrl;
  const podbeanUrl = product.metadata?.podbeanUrl;

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <Card className="flex flex-col h-full overflow-visible hover-elevate transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {course && (
              <Badge variant="outline" className="text-xs">
                {course === "igcse" ? "IGCSE PE" : "AS Level SPE"}
              </Badge>
            )}
            {unitNumber && (
              <Badge variant="secondary" className="text-xs">
                Unit {unitNumber}
              </Badge>
            )}
          </div>
          {isAvailable ? (
            <Badge className="bg-primary text-primary-foreground">
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-lg mt-3 line-clamp-2">
          {product.name}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {product.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Infographic</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>Exam Questions</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>Mark Scheme</span>
          </div>
        </div>

        {(youtubeUrl || podbeanUrl) && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Free:</span>
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-destructive hover:underline"
                data-testid={`link-youtube-${product.id}`}
              >
                <Youtube className="h-4 w-4" />
                Video
              </a>
            )}
            {podbeanUrl && (
              <a
                href={podbeanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
                data-testid={`link-podcast-${product.id}`}
              >
                <Podcast className="h-4 w-4" />
                Podcast
              </a>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between gap-2 flex-wrap">
        <div className="text-2xl font-bold text-primary">
          {price ? formatPrice(price.unit_amount, price.currency) : "$6.99"}
        </div>
        {isAvailable && price ? (
          <Button
            onClick={() => onPurchase?.(price.id)}
            disabled={isPending}
            className="gap-2"
            data-testid={`button-buy-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
            {isPending ? "Processing..." : "Buy Now"}
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <Clock className="h-4 w-4 mr-2" />
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
