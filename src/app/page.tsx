import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, BookOpen, Users, Bell, Calendar, Image as ImageIcon, Download, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32 border-b border-slate-100">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <Badge variant="outline" className="mb-6 px-4 py-1 text-xs font-bold uppercase tracking-widest text-secondary border-secondary/30 bg-secondary/5">
                Established 1892
              </Badge>
              <h1 className="headline-xl mb-8 text-slate-900 leading-[1.1]">
                Formation for <br />
                <span className="text-secondary">Transformation.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
                Empowering the next generation of scholars with a rigorous curriculum, 
                holistic development, and a commitment to intellectual integrity.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  href="#departments" 
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-secondary hover:bg-secondary/90 text-white px-8 h-14 text-base font-bold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20"
                  )}
                >
                  Explore Programs
                </Link>
                <Link 
                  href="/contact" 
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-slate-200 text-slate-700 hover:bg-slate-100 px-8 h-14 text-base font-bold uppercase tracking-wider bg-white"
                  )}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Grid */}
        <section id="departments" className="py-24 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <Badge variant="outline" className="mb-4 border-slate-200 text-slate-500 uppercase tracking-widest font-bold">
                  Academic Excellence
                </Badge>
                <h2 className="headline-lg text-slate-900">Our Departments</h2>
              </div>
              <Link href="/departments" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 transition-all border-b-2 border-transparent hover:border-secondary pb-1">
                View All Departments <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Theoretical Physics",
                  category: "Sciences",
                  desc: "Exploring the fundamental laws of the universe through rigorous mathematical modeling and experimentation.",
                  href: "/departments/physics",
                  icon: <BookOpen className="w-5 h-5 text-secondary" />
                },
                {
                  title: "Modern Philosophy",
                  category: "Humanities",
                  desc: "Analyzing contemporary thought, ethics, and the human condition in a rapidly changing technological landscape.",
                  href: "/departments/english",
                  icon: <Users className="w-5 h-5 text-secondary" />
                },
                {
                  title: "Computer Science",
                  category: "Technology",
                  desc: "Building the digital future with cutting-edge programming skills and computational thinking.",
                  href: "/departments/computer-science",
                  icon: <ArrowRight className="w-5 h-5 text-secondary" />
                }
              ].map((dept, idx) => (
                <Card key={idx} className="group border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 border-none shadow-sm">
                  <CardHeader>
                    <div className="mb-4 flex justify-between items-center">
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20">{dept.category}</Badge>
                      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        {dept.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-serif group-hover:text-secondary transition-colors leading-tight">{dept.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 font-sans leading-relaxed">{dept.desc}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={dept.href} className="text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-secondary transition-colors flex items-center gap-2">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News - Notices Section */}
        <section id="news" className="py-24 bg-slate-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <Badge variant="outline" className="mb-4 border-slate-200 text-slate-500 uppercase tracking-widest font-bold">
                  Institutional Updates
                </Badge>
                <h2 className="headline-lg text-slate-900">Latest from the College</h2>
              </div>
              <Link href="/notices" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 transition-all border-b-2 border-transparent hover:border-secondary pb-1">
                View All Notices <Bell className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {[
                  {
                    date: "May 06, 2026",
                    title: "New Research Initiative in Sustainable Urban Development",
                    tag: "Research"
                  },
                  {
                    date: "April 28, 2026",
                    title: "Annual Alumni Gala: Celebrating a Century of Innovation",
                    tag: "Event"
                  },
                  {
                    date: "April 15, 2026",
                    title: "Dean's List Announced for Spring Semester 2026",
                    tag: "Academic"
                  }
                ].map((item, idx) => (
                  <Card key={idx} className="group cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border-none bg-white overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-6 sm:p-8 gap-6">
                        <div className="hidden sm:flex flex-col items-center justify-center min-w-[100px] border-r border-slate-100 pr-6">
                          <span className="text-secondary font-bold text-lg leading-none">{item.date.split(" ")[1].replace(",", "")}</span>
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter mt-1">{item.date.split(" ")[0]}</span>
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2 text-[10px] font-black uppercase tracking-widest border-slate-100 text-slate-400">{item.tag}</Badge>
                          <h3 className="text-xl sm:text-2xl font-serif group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principal's Message */}
        <section className="py-24 bg-white relative">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-slate-300/50 relative group">
                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center relative">
                    <Avatar className="w-64 h-64 border-8 border-white shadow-2xl">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-slate-200 text-6xl">MF</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent text-white z-20">
                    <h3 className="text-2xl font-bold mb-1">Dr. Maria Fernandes</h3>
                    <p className="text-secondary font-serif italic">Principal</p>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#b7131d_2px,transparent_1px)] [background-size:12px_12px] opacity-20" />
              </div>
              <div className="lg:col-span-7">
                <Badge variant="outline" className="mb-4 border-slate-200 text-slate-500 uppercase tracking-widest font-bold">
                  Leadership
                </Badge>
                <h2 className="headline-lg mb-8 text-slate-900">Formation for <br /><span className="italic text-secondary">Transformation</span></h2>
                <div className="prose prose-lg max-w-none text-slate-600 font-sans leading-relaxed">
                  <p className="mb-6">
                    Dear Students,
                  </p>
                  <p className="mb-6">
                    It is my privilege to welcome you to Xavier College, a premier institution committed to academic excellence and holistic development. Our college has been a beacon of knowledge since 1892, nurturing young minds into responsible citizens.
                  </p>
                  <p className="mb-6">
                    At Xavier, we believe in the power of education to change lives. Our dedicated faculty and vibrant campus life discover your potential and pursue your dreams.
                  </p>
                </div>
                <Link 
                  href="/principal-message" 
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "mt-8 group border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 h-14 text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  )}
                >
                  Read Full Message <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="py-24 bg-slate-50 relative overflow-hidden border-y border-slate-100">
          <div className="container-custom relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Academic Calendar", category: "Plan Ahead", desc: "View important dates and events", href: "/academic-calendar", icon: <Calendar className="w-8 h-8" /> },
                { title: "Faculty Directory", category: "Our Team", desc: "Meet our distinguished faculty", href: "/faculty", icon: <Users className="w-8 h-8" /> },
                { title: "Photo Gallery", category: "Visual Journey", desc: "Explore campus life and events", href: "/gallery", icon: <ImageIcon className="w-8 h-8" /> },
                { title: "Downloads", category: "Resources", desc: "Forms, syllabus, and documents", href: "/downloads", icon: <Download className="w-8 h-8" /> }
              ].map((link, idx) => (
                <Link key={idx} href={link.href} className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-secondary hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                  <Badge variant="secondary" className="mb-4 bg-secondary/10 text-secondary border-none text-[10px] uppercase font-black group-hover:bg-secondary group-hover:text-white transition-colors">{link.category}</Badge>
                  <div className="mb-4 text-slate-400 group-hover:text-secondary transition-colors">
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-secondary transition-colors">{link.title}</h3>
                  <p className="text-slate-500 text-sm">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <Badge variant="outline" className="mb-4 border-slate-200 text-slate-500 uppercase tracking-widest font-bold">
                  Success Stories
                </Badge>
                <h2 className="headline-lg text-slate-900">Voices of Excellence</h2>
              </div>
              <Link href="/testimonials" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 transition-all border-b-2 border-transparent hover:border-secondary pb-1">
                View All Testimonials <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  name: "Rahul Desai",
                  role: "Software Engineer at Google, Batch 2020",
                  quote: "My years at Xavier College were transformative. The faculty's dedication and the practical approach to learning prepared me exceptionally well for the tech industry.",
                  initials: "RD"
                },
                {
                  name: "Priya Sharma",
                  role: "Research Scientist at ISRO, Batch 2018",
                  quote: "The physics department at Xavier is world-class. The well-equipped laboratories and Dr. Kumar's guidance gave me a strong foundation for my career at ISRO.",
                  initials: "PS"
                }
              ].map((t, idx) => (
                <div key={idx} className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-200 -z-0" />
                  <div className="relative z-10">
                    <blockquote className="text-xl text-slate-700 font-serif italic leading-relaxed mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                        <AvatarFallback className="bg-secondary text-white font-bold">{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-900">{t.name}</p>
                        <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
