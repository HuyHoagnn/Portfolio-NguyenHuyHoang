/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Github, Linkedin, Mail, Facebook, Phone, ExternalLink, MapPin, GraduationCap } from "lucide-react";

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
        className="text-6xl md:text-8xl font-serif text-beige"
      >
        {title}
      </motion.h2>
    </div>
    <div className="w-full h-[1px] bg-beige/10" />
  </div>
);

const Label = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-2">
    {children}
  </span>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
        <div className="flex gap-8">
          <a href="#contact" className="font-mono text-xs tracking-widest hover:text-navy transition-colors">CONTACT</a>
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
        <section id="hello" className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32">
          <div className="max-w-7xl w-full mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15vw] md:text-[12vw] leading-[0.8] font-serif text-beige mb-8"
            >
              Hello,
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-2xl md:text-4xl text-zinc-500 font-sans font-light max-w-2xl">
                I am <span className="text-navy font-medium">Nguyen Huy Hoang</span>. 
                A Software Developer who values practicality and utility.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Page 1: About */}
        <section id="about" className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32">
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="01" title="About" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif text-beige mb-2 tracking-tight">NGUYEN HUY HOANG</h3>
                  <p className="font-mono text-sm text-navy font-medium">Software Developer</p>
                </div>
                
                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-sans max-w-2xl">
                  I am a developer who values practicality and utility. My philosophy is to 
                  "Build products for use, not for novelty." I strive for clean code and efficient 
                  solutions that solve real problems.
                </p>
              </div>

              <div className="lg:col-span-5 space-y-12">
                <div>
                  <Label>Location</Label>
                  <p className="text-lg text-zinc-700 font-sans">Thai Nguyen, Vietnam</p>
                </div>
                <div>
                  <Label>Education</Label>
                  <p className="text-lg text-zinc-700 font-sans leading-snug">
                    ICTU - Information and Communication Technology University
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page 2: Skills */}
        <section id="skills" className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32">
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="02" title="Skills" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
              {[
                { label: "Favorite Stack", items: ["Next.js", "PostgreSQL", "Prisma"] },
                { label: "Languages", items: ["TypeScript", "Python", "C#", "HTML"] },
                { label: "Frameworks", items: [".NET Core", "React", "Node.js"] },
                { label: "Tools", items: ["Git", "Docker", "AI-assisted Dev"] }
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
        </section>

        {/* Page 3: Projects */}
        <section id="projects" className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32">
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="03" title="Projects" />
            
            <div className="space-y-16">
              {[
                { 
                  title: "CV Builer Pro", 
                  type: "Web Application – Online CV/Resume Builder",
                  desc: "A web-based CV builder that allows users to create, customize, preview, and download professional resumes online.",
                  link: "https://cv-builder-pro-nmbp.vercel.app/"
                },
                { 
                  title: "Comming Soon...", 
                }
              ].map((project) => (
                <div key={project.title} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-24 group">
                  <div className="lg:col-span-7">
                    <a href={project.link} target="_blank" className="inline-flex items-center gap-4 group">
                      <h3 className="text-3xl md:text-4xl font-serif text-beige group-hover:text-navy transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </a>
                    <p className="text-zinc-600 mt-4 max-w-xl leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="lg:col-span-5 flex items-end">
                    <div>
                      <Label>Type</Label>
                      <p className="text-zinc-700 font-sans">{project.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Page 4: Contact */}
        <section id="contact" className="h-screen snap-start flex flex-col justify-center px-6 md:px-12 lg:px-32">
          <div className="max-w-7xl w-full mx-auto">
            <SectionHeader number="04" title="Contact" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-7">
                <Label>Get in touch</Label>
                <a href="mailto:forsythia.vn@proton.me" className="text-3xl md:text-5xl font-serif text-beige hover:text-navy transition-colors break-all">
                  forsythia.vn@proton.me
                </a>
                <div className="mt-12">
                  <Label>Social</Label>
                  <div className="flex flex-wrap gap-8">
                    {[
                      { name: "GitHub", link: "https://github.com/HuyHoagnn" },
                      { name: "LinkedIn", link: "https://www.linkedin.com/in/ho%C3%A0ng-nguy%E1%BB%85n-huy-1221703b3/" },
                      { name: "Facebook", link: "https://www.facebook.com/nguyen.huy.hoang.798315" }
                    ].map(s => (
                      <a key={s.name} href={s.link} target="_blank" className="font-mono text-sm hover:text-navy transition-colors">
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <Label>Phone</Label>
                  <p className="text-xl text-zinc-700 font-sans">+84 333 604 993</p>
                </div>
                <div className="pt-12 lg:pt-0">
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    © 2026 NGUYEN HUY HOANG. ALL RIGHTS RESERVED.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
