import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-primary/10">
        <div className="container-custom flex justify-between items-center h-20">
          <Link href="/" className="text-xl font-serif font-semibold tracking-tight text-primary">
            Xavier <span className="italic">College</span>
          </Link>
          <div className="hidden lg:flex space-x-8">
            <Link href="/departments" className="label-caps text-primary hover:opacity-70 transition-opacity">Academics</Link>
            <Link href="/faculty" className="label-caps text-primary hover:opacity-70 transition-opacity">Faculty</Link>
            <Link href="/notices" className="label-caps text-primary hover:opacity-70 transition-opacity">Notices</Link>
            <Link href="/academic-calendar" className="label-caps text-primary hover:opacity-70 transition-opacity">Calendar</Link>
            <Link href="/apply" className="label-caps text-primary hover:opacity-70 transition-opacity">Admissions</Link>
            <Link href="/contact" className="label-caps text-primary hover:opacity-70 transition-opacity">Contact</Link>
          </div>
          <Link href="/apply" className="btn-primary">Apply Now</Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-gap bg-surface">
          <div className="container-custom">
            <div className="max-w-4xl">
              <span className="label-caps text-secondary mb-6 block">Established 1892</span>
              <h1 className="headline-xl mb-8">
                Academic Excellence through <br />
                <span className="italic">Modernist Clarity.</span>
              </h1>
              <p className="text-xl text-primary/80 max-w-2xl mb-12 font-sans leading-relaxed">
                Empowering the next generation of scholars with a rigorous curriculum 
                and a commitment to intellectual integrity in an ever-evolving world.
              </p>
              <div className="flex gap-6">
                <Link href="#departments" className="btn-primary">Explore Programs</Link>
                <Link href="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Grid */}
        <section id="departments" className="section-gap">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="label-caps text-primary/60 mb-4 block">Academic Excellence</span>
                <h2 className="headline-lg">Our Departments</h2>
              </div>
              <Link href="/departments" className="label-caps text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">View All Departments</Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/departments/physics" className="card-minimal group hover:border-primary/30 transition-all">
                <span className="label-caps text-secondary mb-4 block">Sciences</span>
                <h3 className="text-2xl mb-4 group-hover:text-secondary transition-colors">Theoretical Physics</h3>
                <p className="text-primary/70 font-sans mb-8">Exploring the fundamental laws of the universe through rigorous mathematical modeling and experimentation.</p>
                <span className="label-caps text-primary group-hover:opacity-60">Learn More &rarr;</span>
              </Link>
              
              <Link href="/departments/english" className="card-minimal group hover:border-primary/30 transition-all">
                <span className="label-caps text-secondary mb-4 block">Humanities</span>
                <h3 className="text-2xl mb-4 group-hover:text-secondary transition-colors">Modern Philosophy</h3>
                <p className="text-primary/70 font-sans mb-8">Analyzing contemporary thought, ethics, and the human condition in a rapidly changing technological landscape.</p>
                <span className="label-caps text-primary group-hover:opacity-60">Learn More &rarr;</span>
              </Link>
              
              <Link href="/departments/computer-science" className="card-minimal group hover:border-primary/30 transition-all">
                <span className="label-caps text-secondary mb-4 block">Technology</span>
                <h3 className="text-2xl mb-4 group-hover:text-secondary transition-colors">Computer Science</h3>
                <p className="text-primary/70 font-sans mb-8">Building the digital future with cutting-edge programming skills and computational thinking.</p>
                <span className="label-caps text-primary group-hover:opacity-60">Learn More &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest News - Notices Section */}
        <section id="news" className="section-gap bg-surface">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="label-caps text-primary/60 mb-4 block">Institutional Updates</span>
                <h2 className="headline-lg">Latest from the College</h2>
              </div>
              <Link href="/notices" className="label-caps text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">View All Notices</Link>
            </div>
            <div className="max-w-3xl">
              
              <div className="border-t border-primary/10">
                <div className="ruled-list-item group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="label-caps text-secondary mb-2 block">May 06, 2026</span>
                      <h3 className="text-3xl group-hover:italic transition-all">New Research Initiative in Sustainable Urban Development</h3>
                    </div>
                    <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
                  </div>
                </div>
                
                <div className="ruled-list-item group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="label-caps text-secondary mb-2 block">April 28, 2026</span>
                      <h3 className="text-3xl group-hover:italic transition-all">Annual Alumni Gala: Celebrating a Century of Innovation</h3>
                    </div>
                    <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
                  </div>
                </div>
                
                <div className="ruled-list-item group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="label-caps text-secondary mb-2 block">April 15, 2026</span>
                      <h3 className="text-3xl group-hover:italic transition-all">Dean's List Announced for Spring Semester 2026</h3>
                    </div>
                    <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principal's Message */}
        <section className="section-gap">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="aspect-[3/4] bg-primary/10 rounded-lg mb-6 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-4xl">👨‍🏫</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif mb-2">Dr. Maria Fernandes</h3>
                  <p className="text-secondary">Principal</p>
                  <p className="text-primary/60 text-sm mt-2">Ph.D. in English Literature</p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <span className="label-caps text-primary/60 mb-4 block">Leadership</span>
                <h2 className="headline-lg mb-8">Principal's Message</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-primary/80 leading-relaxed mb-6">
                    Dear Students,
                  </p>
                  <p className="text-primary/80 leading-relaxed mb-6">
                    It is my privilege to welcome you to St. Xavier's College, a premier institution of higher learning committed to academic excellence and holistic development. Our college has been a beacon of knowledge, nurturing young minds and transforming them into responsible citizens who contribute meaningfully to society.
                  </p>
                  <p className="text-primary/80 leading-relaxed mb-6">
                    At Xavier, we believe in the power of education to change lives. Our dedicated faculty, state-of-the-art infrastructure, and vibrant campus life create an environment where students can discover their potential and pursue their dreams.
                  </p>
                  <p className="text-primary/80 leading-relaxed">
                    Formation for Transformation - this is not just our motto, but our commitment to every student who walks through our doors.
                  </p>
                </div>
                <Link href="/principal-message" className="btn-secondary inline-block mt-8">
                  Read Full Message
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="section-gap bg-surface">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/academic-calendar" className="card-minimal group">
                <span className="label-caps text-secondary mb-4 block">Plan Ahead</span>
                <h3 className="text-xl mb-2 group-hover:text-secondary transition-colors">Academic Calendar</h3>
                <p className="text-primary/70 text-sm">View important dates and events</p>
              </Link>
              <Link href="/faculty" className="card-minimal group">
                <span className="label-caps text-secondary mb-4 block">Our Team</span>
                <h3 className="text-xl mb-2 group-hover:text-secondary transition-colors">Faculty Directory</h3>
                <p className="text-primary/70 text-sm">Meet our distinguished faculty</p>
              </Link>
              <Link href="/gallery" className="card-minimal group">
                <span className="label-caps text-secondary mb-4 block">Visual Journey</span>
                <h3 className="text-xl mb-2 group-hover:text-secondary transition-colors">Photo Gallery</h3>
                <p className="text-primary/70 text-sm">Explore campus life and events</p>
              </Link>
              <Link href="/downloads" className="card-minimal group">
                <span className="label-caps text-secondary mb-4 block">Resources</span>
                <h3 className="text-xl mb-2 group-hover:text-secondary transition-colors">Downloads</h3>
                <p className="text-primary/70 text-sm">Forms, syllabus, and documents</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-gap">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="label-caps text-primary/60 mb-4 block">Success Stories</span>
                <h2 className="headline-lg">What Our Community Says</h2>
              </div>
              <Link href="/testimonials" className="label-caps text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">View All</Link>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-minimal">
                <blockquote className="text-lg text-primary/80 leading-relaxed mb-6 italic">
                  "My years at Xavier College were transformative. The faculty's dedication and the practical approach to learning prepared me exceptionally well for the tech industry."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">👨‍💼</span>
                  </div>
                  <div>
                    <p className="font-medium">Rahul Desai</p>
                    <p className="text-sm text-primary/60">Software Engineer at Google, Batch 2020</p>
                  </div>
                </div>
              </div>
              <div className="card-minimal">
                <blockquote className="text-lg text-primary/80 leading-relaxed mb-6 italic">
                  "The physics department at Xavier is world-class. The well-equipped laboratories and Dr. Kumar's guidance gave me a strong foundation for my career at ISRO."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">👩‍🔬</span>
                  </div>
                  <div>
                    <p className="font-medium">Priya Sharma</p>
                    <p className="text-sm text-primary/60">Research Scientist at ISRO, Batch 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-serif font-semibold tracking-tight mb-8">
                Xavier <span className="italic text-secondary">College</span>
              </div>
              <p className="text-white/60 max-w-sm mb-8 font-sans">
                Dedicated to the pursuit of knowledge and the cultivation of 
                intellectual excellence since 1892.
              </p>
              <p className="text-white/40 text-sm">Formation for Transformation</p>
            </div>
            
            <div>
              <h4 className="label-caps text-white/40 mb-6">Quick Links</h4>
              <ul className="space-y-3 font-sans text-white/80">
                <li><Link href="/notices" className="hover:text-secondary">Notices & Announcements</Link></li>
                <li><Link href="/principal-message" className="hover:text-secondary">Principal's Message</Link></li>
                <li><Link href="/departments" className="hover:text-secondary">Academic Departments</Link></li>
                <li><Link href="/faculty" className="hover:text-secondary">Faculty Directory</Link></li>
                <li><Link href="/academic-calendar" className="hover:text-secondary">Academic Calendar</Link></li>
                <li><Link href="/apply" className="hover:text-secondary">Admissions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-white/40 mb-6">Resources</h4>
              <ul className="space-y-3 font-sans text-white/80">
                <li><Link href="/gallery" className="hover:text-secondary">Photo Gallery</Link></li>
                <li><Link href="/downloads" className="hover:text-secondary">Downloads</Link></li>
                <li><Link href="/testimonials" className="hover:text-secondary">Testimonials</Link></li>
                <li><Link href="/contact" className="hover:text-secondary">Contact Us</Link></li>
                <li><Link href="/login" className="hover:text-secondary">Student Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-white/40 mb-6">Contact</h4>
              <ul className="space-y-3 font-sans text-white/80">
                <li>123 Academic Way<br />Cambridge, MA 02138</li>
                <li>+1 (555) 012-3456</li>
                <li><Link href="/contact" className="hover:text-secondary">admissions@xavier.edu</Link></li>
                <li className="pt-2 flex gap-4">
                  <Link href="#" className="hover:text-secondary">Twitter</Link>
                  <Link href="#" className="hover:text-secondary">LinkedIn</Link>
                  <Link href="#" className="hover:text-secondary">Instagram</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/10 flex justify-between items-center">
            <span className="text-sm text-white/40 font-sans">&copy; 2026 Xavier College. All rights reserved.</span>
            <div className="flex space-x-8 text-sm text-white/40 font-sans">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
