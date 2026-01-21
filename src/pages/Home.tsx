import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  CheckCircle2,
  Youtube,
  Podcast,
  Zap,
  Target,
  Award,
  Clock
} from "lucide-react";
import { COURSES } from "@shared/schema";
import exampleInfographic from "@assets/1_DEOXYGENATED_BLOOD_ENTERS_Deoxygenated_blood_from_the_body_r_1768842952459.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/80 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoLTZ2LTJoNnYtNmgydjZoNnYyaC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 py-[5px] md:py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium">
                <Zap className="h-4 w-4 text-accent" />
                <span>Cambridge IGCSE & AS Level PE Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Smart. Fast.{" "}
                <span className="text-accent">Exam-Ready.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl">
                Premium revision resources designed to help you ace your Cambridge 
                Physical Education exams. Detailed infographics, exam-style questions, 
                and comprehensive mark schemes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-accent text-accent-foreground border-accent-border w-full sm:w-auto gap-2" data-testid="button-hero-browse">
                    Browse Resources
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href="https://www.youtube.com/@ReviseDirect"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 bg-white/10 border-white/30 text-white" data-testid="button-hero-youtube">
                    <Youtube className="h-4 w-4" />
                    Free Videos
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-white/80 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>$6.99 per unit</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-primary/30 rounded-2xl blur-2xl"></div>
              <img
                src={exampleInfographic}
                alt="Example infographic showing heart anatomy"
                className="relative rounded-xl shadow-2xl border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">What You Get</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Revision Package
            </h2>
            <p className="text-muted-foreground text-lg">
              Each unit includes everything you need to master the content and prepare for your exams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover-elevate">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Detailed Infographics</h3>
                <p className="text-muted-foreground">
                  Visual summaries that break down complex topics into easy-to-understand diagrams and flowcharts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Exam-Style Questions</h3>
                <p className="text-muted-foreground">
                  Practice questions designed to mirror the format and difficulty of actual Cambridge exams
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-elevate">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Mark Schemes & Answers</h3>
                <p className="text-muted-foreground">
                  Complete mark schemes showing exactly what examiners look for in top-scoring answers
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="inline-block bg-muted/50">
              <CardContent className="py-4 px-6 flex items-center gap-4 flex-wrap justify-center">
                <span className="text-muted-foreground">Plus free for every unit:</span>
                <div className="flex items-center gap-2 text-destructive">
                  <Youtube className="h-5 w-5" />
                  <span className="font-medium">Explainer Video</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Podcast className="h-5 w-5" />
                  <span className="font-medium">Podcast Episode</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Our Courses</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cambridge PE Qualifications
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive resources for both IGCSE and AS Level Physical Education
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* IGCSE PE Card */}
            <Card className="overflow-visible hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <Badge className="bg-primary text-primary-foreground mb-2">
                      {COURSES.IGCSE_PE.code}
                    </Badge>
                    <h3 className="text-xl font-semibold">{COURSES.IGCSE_PE.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">4 Units</p>
                    <p className="font-semibold text-primary">$6.99 each</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {COURSES.IGCSE_PE.units.map((unit) => (
                    <div
                      key={unit.number}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {unit.number}
                        </span>
                        <span className="text-sm">{unit.name}</span>
                      </div>
                      {unit.available ? (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/products?course=igcse">
                  <Button className="w-full gap-2" data-testid="button-view-igcse">
                    View IGCSE Resources
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* AS Level Card */}
            <Card className="overflow-visible hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div>
                    <Badge className="bg-secondary text-secondary-foreground mb-2">
                      {COURSES.AS_LEVEL_SPE.code}
                    </Badge>
                    <h3 className="text-xl font-semibold">{COURSES.AS_LEVEL_SPE.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">12 Units</p>
                    <p className="font-semibold text-primary">$6.99 each</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                  {COURSES.AS_LEVEL_SPE.units.map((unit) => (
                    <div
                      key={unit.number}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {unit.number}
                        </span>
                        <span className="text-sm">{unit.name}</span>
                      </div>
                      {unit.available ? (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/products?course=as-level">
                  <Button className="w-full gap-2" variant="secondary" data-testid="button-view-as-level">
                    View AS Level Resources
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Why ReviseDirect</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Success
            </h2>
            <p className="text-muted-foreground text-lg">
              Our resources are designed by experienced educators who understand what it takes to excel
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Instant Access",
                description: "Download immediately after purchase. Start revising right away.",
              },
              {
                icon: Target,
                title: "Exam-Focused",
                description: "Every resource is aligned with Cambridge syllabus requirements.",
              },
              {
                icon: Award,
                title: "Quality Content",
                description: "Professional infographics and carefully crafted questions.",
              },
              {
                icon: CheckCircle2,
                title: "Complete Answers",
                description: "Full mark schemes show you exactly how to score top marks.",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="pt-6 pb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Exam-Ready?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Join students who are already using ReviseDirect to achieve their best grades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-accent text-accent-foreground border-accent-border gap-2" data-testid="button-cta-browse">
                Browse All Resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
