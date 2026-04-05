/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Heart, 
  Globe, 
  BookOpen, 
  Camera, 
  Calendar, 
  ChevronRight, 
  Menu, 
  X, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  Award,
  Coffee,
  Music
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Qui sommes-nous ?', href: '#about' },
    { name: 'Patrimoine', href: '#heritage' },
    { name: 'Espace Membre', href: '#members' },
    { name: 'Actualités', href: '#news' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className={`text-2xl font-bold tracking-tighter ${scrolled ? 'text-g2-green' : 'text-white'}`}>
                LEMO <span className={scrolled ? 'text-g2-yellow' : 'text-g2-yellow'}>SENEGAL</span>
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${scrolled ? 'text-stone-500' : 'text-stone-200'}`}>
                Lendira-Mona
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled ? 'text-stone-700 hover:text-g2-green' : 'text-white hover:text-g2-yellow'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-g2-green text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-forest-dark transition-all transform hover:scale-105">
                Adhérer
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-stone-900' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-stone-700 hover:bg-stone-50 hover:text-g2-green border-b border-stone-50"
                >
                  {link.name}
                </a>
              ))}
              <div className="p-4">
                <button className="w-full bg-g2-green text-white px-6 py-3 rounded-xl text-lg font-semibold">
                  Adhérer à l'association
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop" 
          alt="Gabon Forest" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-forest-dark/80"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-g2-yellow/20 text-g2-yellow text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-g2-yellow/30">
            Solidarité • Culture • Intégration
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            L'Ogooué au cœur de la <span className="text-g2-yellow italic font-display">Teranga</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            LEMO SENEGAL : Le pont fraternel unissant les fils et filles du Haut-Ogooué (G2) sous le soleil du Sénégal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-g2-green hover:bg-forest-dark text-white px-10 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2 group">
              Découvrir notre histoire
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-10 py-4 rounded-full text-lg font-bold transition-all">
              Espace Membre
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const missions = [
    {
      icon: <Heart className="text-sn-red" />,
      title: "Solidarité Active",
      desc: "Soutenir chaque membre dans les moments de joie comme dans les épreuves."
    },
    {
      icon: <Globe className="text-g2-blue" />,
      title: "Rayonnement Culturel",
      desc: "Promouvoir la richesse des traditions Altogovéennes au Sénégal."
    },
    {
      icon: <Users className="text-g2-green" />,
      title: "Intégration Réussie",
      desc: "Faciliter l'épanouissement des ressortissants du G2 dans la société sénégalaise."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-g2-green font-bold tracking-widest uppercase text-sm">Notre Identité</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 text-stone-900">
              Lendira-Mona : <br />
              <span className="text-earth-brown">L'Union qui fait notre force</span>
            </h2>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              Fondée sur les valeurs de fraternité et d'entraide, LEMO SENEGAL est bien plus qu'une association. C'est une famille pour tous les ressortissants de la province du Haut-Ogooué résidant au Sénégal.
            </p>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed">
              Du plateau Batéké aux rives de l'Ogooué, nous portons en nous l'héritage de nos ancêtres Obamba, Ndoumou, Teke et Awandji, tout en embrassant l'hospitalité légendaire du pays de la Teranga.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-stone-50 rounded-2xl">
                <div className="text-3xl font-bold text-g2-green">500+</div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Membres</div>
              </div>
              <div className="text-center p-4 bg-stone-50 rounded-2xl">
                <div className="text-3xl font-bold text-g2-yellow">15+</div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Ans d'existence</div>
              </div>
              <div className="text-center p-4 bg-stone-50 rounded-2xl">
                <div className="text-3xl font-bold text-g2-blue">G2</div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Province</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {missions.map((m, i) => (
              <div key={i} className="flex gap-6 p-8 bg-stone-50 rounded-3xl hover:shadow-xl hover:shadow-stone-200 transition-all border border-stone-100 group">
                <div className="shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Heritage = () => {
  const items = [
    {
      title: "Gastronomie",
      subtitle: "Le Bouillon de Poisson & Manioc de Moanda",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop",
      icon: <Coffee className="text-white" />
    },
    {
      title: "Artisanat",
      subtitle: "Vannerie et Masques Traditionnels",
      image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ce?q=80&w=2070&auto=format&fit=crop",
      icon: <Award className="text-white" />
    },
    {
      title: "Danses & Rythmes",
      subtitle: "L'âme des Plateaux Batéké",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
      icon: <Music className="text-white" />
    }
  ];

  return (
    <section id="heritage" className="py-24 bg-forest-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-g2-yellow font-bold tracking-widest uppercase text-sm">Cœur Culturel</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Patrimoine du Haut-Ogooué</h2>
          <p className="text-stone-400 mt-6 max-w-2xl mx-auto text-lg">
            Plongez dans les richesses de notre province, entre traditions séculaires et modernité.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative group h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="mb-4 w-12 h-12 bg-g2-green/80 backdrop-blur-md rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-g2-yellow uppercase tracking-widest mb-2">{item.title}</h3>
                <p className="text-2xl font-bold leading-tight group-hover:text-g2-yellow transition-colors">{item.subtitle}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  En savoir plus <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Members = () => {
  return (
    <section id="members" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-stone-200 overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 md:p-16">
            <span className="text-g2-blue font-bold tracking-widest uppercase text-sm">Rejoignez-nous</span>
            <h2 className="text-4xl font-bold mt-4 mb-8">Espace Membre</h2>
            <p className="text-stone-600 mb-10 text-lg">
              Devenez membre actif de LEMO SENEGAL et bénéficiez de notre réseau d'entraide, accédez à l'annuaire privé et participez aux décisions de l'association.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                "Formulaire d'adhésion en ligne",
                "Système de cotisation sécurisé",
                "Annuaire des ressortissants du G2",
                "Accès aux événements exclusifs"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-stone-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-g2-green/10 flex items-center justify-center text-g2-green">
                    <ChevronRight size={14} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all">
                Se connecter
              </button>
              <button className="bg-g2-yellow text-stone-900 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 transition-all">
                Créer un compte
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-g2-blue relative p-12 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-g2-yellow/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                  <Users className="mb-4 text-g2-yellow" />
                  <div className="text-2xl font-bold">Annuaire</div>
                  <div className="text-sm opacity-70">Réseautage G2</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                  <BookOpen className="mb-4 text-g2-yellow" />
                  <div className="text-2xl font-bold">Cotisations</div>
                  <div className="text-sm opacity-70">Gestion transparente</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                  <Calendar className="mb-4 text-g2-yellow" />
                  <div className="text-2xl font-bold">Événements</div>
                  <div className="text-sm opacity-70">Calendrier partagé</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white">
                  <Mail className="mb-4 text-g2-yellow" />
                  <div className="text-2xl font-bold">Support</div>
                  <div className="text-sm opacity-70">Assistance membres</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const News = () => {
  const posts = [
    {
      date: "17 Août 2025",
      title: "Célébration de l'Indépendance du Gabon à Dakar",
      category: "Événement",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"
    },
    {
      date: "12 Mai 2025",
      title: "Rencontre fraternelle : Le G2 se réunit à Ouakam",
      category: "Social",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
    },
    {
      date: "05 Avr 2025",
      title: "Lancement du nouveau programme de bourses d'études",
      category: "Éducation",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-sn-red font-bold tracking-widest uppercase text-sm">Vie Associative</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Actualités & Événements</h2>
          </div>
          <button className="flex items-center gap-2 font-bold text-stone-900 border-b-2 border-stone-900 pb-1 hover:text-sn-red hover:border-sn-red transition-all">
            Voir toute la galerie <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-stone-900 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="text-stone-400 text-sm font-medium mb-3">{post.date}</div>
              <h3 className="text-2xl font-bold leading-tight group-hover:text-g2-green transition-colors">
                {post.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-bold tracking-tighter">
                LEMO <span className="text-g2-yellow">SENEGAL</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-stone-500">
                Lendira-Mona
              </span>
            </div>
            <p className="text-stone-400 text-lg max-w-md leading-relaxed mb-8">
              L'association qui unit les ressortissants du Haut-Ogooué au Sénégal. Ensemble pour la solidarité et le rayonnement de notre culture.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-g2-green transition-colors cursor-pointer">
                  <Globe size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#home" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Qui sommes-nous ?</a></li>
              <li><a href="#heritage" className="hover:text-white transition-colors">Patrimoine</a></li>
              <li><a href="#members" className="hover:text-white transition-colors">Espace Membre</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Actualités</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Contact</h4>
            <ul className="space-y-6 text-stone-400">
              <li className="flex items-start gap-4">
                <MapPin className="text-g2-yellow shrink-0" size={20} />
                <span>Dakar, Sénégal <br />Quartier Amitié 2</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-g2-yellow shrink-0" size={20} />
                <span>+221 33 000 00 00</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-g2-yellow shrink-0" size={20} />
                <span>contact@lemo-senegal.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-sm">
          <p>© 2026 LEMO SENEGAL. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Heritage />
      <Members />
      <News />
      <Footer />
    </div>
  );
}
