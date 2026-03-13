/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Github, Linkedin, Mail, Facebook, Phone, ExternalLink, MapPin, GraduationCap, Languages, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="mb-16">
    <div className="flex items-baseline gap-4 mb-4">
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-mono text-sm font-bold text-navy"
      >
        {number}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-6xl md:text-8xl font-serif text-accent"
      >
        {title}
      </motion.h2>
    </div>
    <div className="w-full h-[1px] bg-beige/10" />
  </div>
);

const Label = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy block mb-2">
    {children}
  </span>
);

export default function App() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory selection:bg-navy selection:text-white scroll-smooth bg-ink custom-scrollbar"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs tracking-widest text-beige/40"
        >
          NGUYEN HUY HOANG / 2026
        </motion.span>
        <div className="flex gap-8 items-center">
          <button 
            onClick={toggleLanguage}
            className="font-mono text-xs tracking-widest hover:text-navy transition-colors flex items-center gap-2"
          >
            <Languages className="w-4 h-4" />
            {currentLang.toUpperCase()}
          </button>
          <a href="#contact" className="font-mono text-xs tracking-widest hover:text-navy link-underline transition-colors">{t('nav.contact')}</a>
        </div>
      </nav>

      {/* Scroll Progress Bar (Page Divider/Slider) */}
      <div className="fixed right-8 top-1/4 bottom-1/4 w-[1px] bg-beige/10 z-50">
        <motion.div 
          className="w-full bg-navy origin-top h-full"
          style={{ scaleY }}
        />
      </div>

      <main>
        {/* Page 0: Hello */}
        <motion.section 
          id="hello" 
          className="relative h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32 hero-bg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl w-full mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15vw] md:text-[12vw] leading-[0.8] font-serif text-accent mb-8"
            >
              {t('hello.title')}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p 
                className="text-2xl md:text-4xl text-beige font-sans font-light max-w-2xl"
                dangerouslySetInnerHTML={{ __html: t('hello.description') }}
              />
            </motion.div>

            {/* scroll indicator */}
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-navy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="font-mono text-xs tracking-widest mb-2">SCROLL</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.section>

        {/* Page 1: About */}
        <motion.section 
          id="about" 
          className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="01" title={t('about.title')} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif text-accent mb-2 tracking-tight">{t('about.name')}</h3>
                  <p className="font-mono text-sm text-navy font-medium">{t('about.role')}</p>
                </div>
                
                <p className="text-lg md:text-xl text-beige leading-relaxed font-sans max-w-2xl">
                  {t('about.description')}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-12">
                <div>
                  <Label>{t('about.location')}</Label>
                  <p className="text-lg text-beige font-sans">{t('about.locationValue')}</p>
                </div>
                <div>
                  <Label>{t('about.education')}</Label>
                  <p className="text-lg text-beige font-sans leading-snug">
                    {t('about.educationValue')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Page 2: Skills */}
        <motion.section 
          id="skills" 
          className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="02" title={t('skills.title')} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
              {[
                { label: t('skills.favoriteStack'), items: ["Next.js", "PostgreSQL", "Prisma"] },
                { label: t('skills.languages'), items: ["TypeScript", "Python", "C#", "HTML"] },
                { label: t('skills.frameworks'), items: [".NET Core", "React", "Node.js"] },
                { label: t('skills.tools'), items: ["Git", "Docker", "AI-assisted Dev"] }
              ].map((group) => (
                <div key={group.label}>
                  <Label>{group.label}</Label>
                  <ul className="space-y-3">
                    {group.items.map(item => (
                      <li key={item} className="text-lg text-zinc-700 font-sans">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Page 3: Projects */}
        <motion.section 
          id="projects" 
          className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="03" title={t('projects.title')} />
            
            <div className="space-y-16">
              {[
                { 
                  title: t('projects.cvBuilder.title'), 
                  type: t('projects.cvBuilder.type'),
                  desc: t('projects.cvBuilder.desc'),
                  link: "https://cv-builder-pro-nmbp.vercel.app/"
                },
                { 
                  title: t('projects.comingSoon.title'), 
                }
              ].map((project) => (
                <div key={project.title} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-24 group">
                  <div className="lg:col-span-7">
                    <a href={project.link} target="_blank" className="inline-flex items-center gap-4 group">
                      <h3 className="text-3xl md:text-4xl font-serif text-accent group-hover:text-navy transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </a>
                    <p className="text-beige mt-4 max-w-xl leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="lg:col-span-5 flex items-end">
                    <div>
                      <Label>{t('projects.typeLabel')}</Label>
                      <p className="text-zinc-700 font-sans">{project.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Page 4: Contact */}
        <motion.section 
          id="contact" 
          className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="04" title={t('contact.title')} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-7">
                <Label>{t('contact.getInTouch')}</Label>
                <a href="mailto:forsythia.vn@proton.me" className="text-3xl md:text-5xl font-serif text-accent hover:text-navy transition-colors break-all">
                  forsythia.vn@proton.me
                </a>
                <div className="mt-12">
                  <Label>{t('contact.social')}</Label>
                  <div className="flex flex-wrap gap-8">
                    {[
                      { name: "GitHub", link: "https://github.com/HuyHoagnn" },
                      { name: "LinkedIn", link: "https://www.linkedin.com/in/ho%C3%A0ng-nguy%E1%BB%85n-huy-1221703b3/" },
                      { name: "Facebook", link: "https://www.facebook.com/nguyen.huy.hoang.798315" }
                    ].map(s => (
                      <a key={s.name} href={s.link} target="_blank" className="font-mono text-sm hover:text-navy link-underline transition-colors">
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <Label>{t('contact.phone')}</Label>
                  <p className="text-beige font-sans">+84 333 604 993</p>
                </div>
                <div className="pt-12 lg:pt-0">
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    {t('contact.copyright')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
