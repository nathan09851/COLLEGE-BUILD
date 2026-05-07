import React from "react";
import Link from "next/link";
import { ArrowRight, X, Globe, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-24 border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="text-3xl font-serif font-bold tracking-tight">
              Xavier <span className="italic text-secondary">College</span>
            </div>
            <p className="text-slate-400 max-w-sm font-sans leading-relaxed">
              Dedicated to the pursuit of knowledge and the cultivation of 
              intellectual excellence since 1892.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <X className="w-5 h-5" />, label: "Twitter" },
                { icon: <Globe className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <Camera className="w-5 h-5" />, label: "Instagram" }
              ].map((social) => (
                <Link key={social.label} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 text-slate-400">
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Navigation</h4>
            <ul className="space-y-4 font-sans text-slate-400">
              {["Notices", "Principal's Message", "Departments", "Faculty", "Calendar", "Admissions"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-secondary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Community</h4>
            <ul className="space-y-4 font-sans text-slate-400">
              {["Photo Gallery", "Downloads", "Testimonials", "Contact Us", "Student Login"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-secondary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Find Us</h4>
              <p className="text-slate-400 leading-relaxed">
                123 Academic Way<br />
                Cambridge, MA 02138
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Contact</h4>
              <p className="text-slate-400">admissions@xavier.edu</p>
              <p className="text-xl font-bold text-white mt-2">+1 (555) 012-3456</p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span className="text-sm text-slate-500 font-sans tracking-wide">&copy; 2026 Xavier College. Formation for Transformation.</span>
          <div className="flex space-x-10 text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
