import Link from "next/link";
import { FaStore, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-pink-500 to-indigo-600 p-2 rounded-lg text-white">
              <FaStore size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Resell Hub</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            The premier marketplace for reselling high-quality items. Connecting buyers and sellers with trust, speed, and transparency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Home", "Browse Products", "Categories", "Dashboard"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-slate-400 hover:text-pink-400 text-sm transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-pink-500" /> support@resellhub.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-pink-500" /> +1 (555) 000-0000
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-pink-500" /> 123 Resell St, Tech City
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <div className="flex gap-4">
            {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="bg-slate-900 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-pink-600 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Resell Hub. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-slate-500">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}