import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/ProductCard";
import { COURSES, type ProductWithPrice } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Filter, Loader2 } from "lucide-react";

export default function Products() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCourse = searchParams.get("course") || "all";
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const { toast } = useToast();

  const { data: products, isLoading, error } = useQuery<ProductWithPrice[]>({
    queryKey: ["/api/products-with-prices"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async (priceId: string) => {
      const response = await apiRequest("POST", "/api/checkout", { priceId });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCourse === "all") return products;
    return products.filter((p) => p.metadata?.course === selectedCourse);
  }, [products, selectedCourse]);

  const handlePurchase = (priceId: string) => {
    checkoutMutation.mutate(priceId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Revision Resources</h1>
              <p className="text-muted-foreground">
                Premium infographics, exam questions, and mark schemes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter by course:</span>
            </div>
            <Tabs value={selectedCourse} onValueChange={setSelectedCourse}>
              <TabsList>
                <TabsTrigger value="all" data-testid="tab-all">
                  All Courses
                </TabsTrigger>
                <TabsTrigger value="igcse" data-testid="tab-igcse">
                  IGCSE PE (0413)
                </TabsTrigger>
                <TabsTrigger value="as-level" data-testid="tab-as-level">
                  AS Level (8386)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-12" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-6" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Failed to load products. Please try again later.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : filteredProducts.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Products Found</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedCourse === "all"
                    ? "Products are being added. Check back soon!"
                    : "No products available for this course yet."}
                </p>
                {selectedCourse !== "all" && (
                  <Button variant="outline" onClick={() => setSelectedCourse("all")}>
                    View All Products
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} resource{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                <Badge variant="outline" className="text-sm">
                  All resources: $6.99 USD
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPurchase={handlePurchase}
                    isPending={checkoutMutation.isPending}
                  />
                ))}
              </div>
            </>
          )}

          {/* Course Info Cards */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-16 grid md:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <Badge className="bg-primary text-primary-foreground mb-3">
                    {COURSES.IGCSE_PE.code}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2">
                    {COURSES.IGCSE_PE.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete revision resources for all 4 units of the Cambridge IGCSE Physical Education syllabus.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-primary">
                      {COURSES.IGCSE_PE.units.filter((u) => u.available).length} of {COURSES.IGCSE_PE.units.length}
                    </span>{" "}
                    units available now
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="p-6">
                  <Badge className="bg-secondary text-secondary-foreground mb-3">
                    {COURSES.AS_LEVEL_SPE.code}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2">
                    {COURSES.AS_LEVEL_SPE.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive resources for all 12 units of the Cambridge AS Level Sport & Physical Education syllabus.
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-secondary">
                      {COURSES.AS_LEVEL_SPE.units.filter((u) => u.available).length} of {COURSES.AS_LEVEL_SPE.units.length}
                    </span>{" "}
                    units available now
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Loading overlay for checkout */}
      {checkoutMutation.isPending && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-8">
            <CardContent className="flex flex-col items-center gap-4 p-0">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="font-medium">Redirecting to checkout...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
