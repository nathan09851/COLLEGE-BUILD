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
          <div className="hidden md:flex space-x-12">
            <Link href="#departments" className="label-caps text-primary hover:opacity-70 transition-opacity underline-offset-8 decoration-2 underline">Academics</Link>
            <Link href="/apply" className="label-caps text-primary hover:opacity-70 transition-opacity">Admissions</Link>
            <Link href="#news" className="label-caps text-primary hover:opacity-70 transition-opacity">News</Link>
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
              <Link href="#" className="label-caps text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">View All Departments</Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-minimal">
                <span className="label-caps text-secondary mb-4 block">Sciences</span>
                <h3 className="text-2xl mb-4">Theoretical Physics</h3>
                <p className="text-primary/70 font-sans mb-8">Exploring the fundamental laws of the universe through rigorous mathematical modeling and experimentation.</p>
                <Link href="#" className="label-caps text-primary hover:opacity-60">Learn More &rarr;</Link>
              </div>
              
              <div className="card-minimal">
                <span className="label-caps text-secondary mb-4 block">Humanities</span>
                <h3 className="text-2xl mb-4">Modern Philosophy</h3>
                <p className="text-primary/70 font-sans mb-8">Analyzing contemporary thought, ethics, and the human condition in a rapidly changing technological landscape.</p>
                <Link href="#" className="label-caps text-primary hover:opacity-60">Learn More &rarr;</Link>
              </div>
              
              <div className="card-minimal">
                <span className="label-caps text-secondary mb-4 block">Arts</span>
                <h3 className="text-2xl mb-4">Architectural Design</h3>
                <p className="text-primary/70 font-sans mb-8">Blending functional structure with aesthetic modernist principles to create the spaces of the future.</p>
                <Link href="#" className="label-caps text-primary hover:opacity-60">Learn More &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News - Ruled List */}
        <section id="news" className="section-gap bg-surface">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="label-caps text-primary/60 mb-4 block">Institutional Updates</span>
              <h2 className="headline-lg mb-16">Latest from the College</h2>
              
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
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="text-2xl font-serif font-semibold tracking-tight mb-8">
                Xavier <span className="italic text-secondary">College</span>
              </div>
              <p className="text-white/60 max-w-sm mb-8 font-sans">
                Dedicated to the pursuit of knowledge and the cultivation of 
                intellectual excellence since 1892.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="label-caps text-white hover:text-secondary">Twitter</Link>
                <Link href="#" className="label-caps text-white hover:text-secondary">LinkedIn</Link>
                <Link href="#" className="label-caps text-white hover:text-secondary">Instagram</Link>
              </div>
            </div>
            
            <div>
              <h4 className="label-caps text-white/40 mb-6">Navigation</h4>
              <ul className="space-y-4 font-sans text-white/80">
                <li><Link href="#departments" className="hover:text-secondary">Academics</Link></li>
                <li><Link href="/apply" className="hover:text-secondary">Apply Now</Link></li>
                <li><Link href="#news" className="hover:text-secondary">News</Link></li>
                <li><Link href="/contact" className="hover:text-secondary">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="label-caps text-white/40 mb-6">Contact</h4>
              <ul className="space-y-4 font-sans text-white/80">
                <li>123 Academic Way<br />Cambridge, MA 02138</li>
                <li>+1 (555) 012-3456</li>
                <li><Link href="/contact" className="hover:text-secondary">admissions@xavier.edu</Link></li>
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
