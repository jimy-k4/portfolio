"use client"

import BackgroundGrid from "@/components/ui/backgroundGrid"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ExternalLink, Github, Globe, Linkedin, Mail, Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const contactInfo = {
  email: "jllinaresmauri@gmail.com",
  linkedin: "https://www.linkedin.com/in/juan-llinares-mauri/",
  github: "https://www.github.com/jlm109-ua",
}

const translations = {
  en: {
    nav: {
      main: "Main",
      trajectory: "Trajectory",
      projects: "Projects",
    },
    main: {
      greeting: "Hi, I'm",
      name: "Juan Llinares",
      aka: "a.k.a. Jimy",
      title: "Computer Engineer",
      description:
        "Passionate about creating and inspired by what I have yet to master. Ignorance is just a state of transition.",
      cta: "My Projects",
      scrollDown: "Scroll Down",
    },
    trajectory: {
      title: "Professional Trajectory",
      subtitle: "A concise overview of my work experience and career milestones.",
      experiences: [
        {
          role: "Full Stack",
          company: "gtt - Gestión Tributaria Territorial S.A.",
          period: "2025 - Present",
          description:
            "Implementing software solutions for tax management, working in an agile and collaborative team. Specialized in C#, PL/SQL, TypeScript and JavaScript.",
          achievements: [
            "Development of automated tests in TypeScript and JavaScript using Playwright.",
            "Participation in the development of the “SIT” national project (Tax Information and Management System) for Spain and the “SITN” international project for Costa Rica and Honduras, working with multiple languages.",
            "Design and creation of tables and packages in databases using PL/SQL.",
            "Effective and agile collaboration using a hybrid SCRUM and Kanban method in work teams with version control across all projects."
          ],
          show: true,
        },
        {
          role: "eduroam IT Support",
          company: "University of Alicante",
          period: "2023 - 2025",
          description:
            "Providing assistance to students at the University of Alicante and others with access to the eduroam network. Learned from real user problems and developed effective solutions.",
          achievements: [
            "Cross-platform support: Windows, macOS, Linux, Android, iOS, ChromeBook",
            "Multilingual support",
            "Real-time problem resolution",
          ],
          show: true,
        },
        {
          role: "Delivery Driver",
          company: "Telepizza & Burger King",
          period: "2022 - 2025",
          description:
            "Provided food to the customers from Villajoyosa, Benidorm and Finestrat.",
          achievements: [
            "Customer satisfaction",
            "Time management",
            "Route optimization",
          ],
          show: false,
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A selection of my work.",
      items: [
        {
          title: "Web for aruateam",
          description:
            "Web platform for the drift team aruateam, including CMS, Backend, and Frontend.",
          tech: ["React", "Node.js", "Supabase", "Tailwind"],
          image: "/images/aruateam.png",
          link: "https://new-aruateam-frontend.vercel.app/",
          repo: "#",
        },
        {
          title: "Particle Life Simulation",
          description:
            "2D particle life simulation where particles interact with each other and the environment. Developed in collaboration with a friend.",
          tech: ["React", "JavaScript", "p5.js", "HTML", "CSS"],
          image: "/images/particle-life.png",
          link: "https://particle-life-arua.vercel.app/",
          repo: "https://github.com/jlm109-ua/particle-life"
        },
        {
          title: "Memoji-my",
          description:
            "A simple web game where you have to find the matching pairs of emojis. You'll never find the same pair twice!",
          tech: ["React", "JavaScript", "HTML", "CSS", "Next.js", "Dicebear"],
          image: "/images/memojimy.png",
          link: "https://memoji-my.vercel.app/",
          repo: "https://github.com/jlm109-ua/memoji-my",
        },
      ],
    },
    contact: {
      title: "Let's Connect",
      description: "Ready to collaborate on your next project?",
      getInTouch: "Get in Touch",
    },
  },
  es: {
    nav: {
      main: "Inicio",
      trajectory: "Trayectoria",
      projects: "Proyectos",
    },
    main: {
      greeting: "Hola, soy",
      name: "Juan Llinares",
      aka: "a.k.a. Jimy",
      title: "Ingeniero Informático",
      description:
        "Apasionado de crear e inspirado por lo que aún no domino. El desconocimiento es un simple estado de transición.",
      cta: "Proyectos",
      scrollDown: "Desplázate",
    },
    trajectory: {
      title: "Trayectoria Profesional",
      subtitle: "Una visión concisa de mi experiencia laboral e hitos profesionales.",
      experiences: [
        {
          role: "Full Stack",
          company: "gtt - Gestión Tributaria Territorial S.A.",
          period: "2025 - Presente",
          description:
            "Implementando soluciones de software para la gestión tributaria, trabajando en un equipo ágil y colaborativo. Especializado en C#, PL/SQL, TypeScript y JavaScript.",
          achievements: [
            "Desarrollo de pruebas automatizadas en TypeScript y JavaScript utilizando Playwright.",
            "Participación en el desarrollo del proyecto nacional “SIT” (Sistema de Información y gestión Tributario) e internacional “SITN”, trabajando con múltiples lenguajes, para los países España, Costa Rica y Honduras.",
            "Diseño y creación de tablas y paquetes en bases de datos mediante PL/SQL.",
            "Colaboración eficaz y ágil usando híbrido de SCRUM y Kanban en equipos de trabajo con control de versiones en todos los proyectos."
          ],
          show: true,
        },
        {
          role: "Soporte IT eduroam",
          company: "Universidad de Alicante",
          period: "2023 - 2025",
          description:
            "Prestando ayuda a los alumnos de la Universidad de Alicante y otras con el acceso a la red eduroam. Aprendí de los problemas reales de los usuarios y desarrollé soluciones efectivas.",
          achievements: [
            "Multiplataforma: Windows, macOS, Linux, Android, iOS, chromeBook",
            "Apoyo multilingüe",
            "Resolución de problemas en tiempo real",
          ],
          show: true,
        },
        {
          role: "Repartidor",
          company: "Telepizza & Burger King",
          period: "2022 - 2025",
          description:
            "Proporcioné comida a los clientes de Villajoyosa, Benidorm y Finestrat.",
          achievements: [
            "Satisfacción del cliente",
            "Gestión del tiempo",
            "Optimización de rutas",
          ],
          show: false,
        },
      ],
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Una selección de mis trabajos.",
      items: [
        {
          title: "Web para aruateam",
          description:
            "Plataforma web para el equipo de drift aruateam, con CMS, Backend y Frontend.",
          tech: ["React", "Node.js", "Supabase", "Tailwind"],
          image: "/images/aruateam.png",
          link: "https://new-aruateam-frontend.vercel.app/",
          repo: "#",
        },
        {
          title: "Simulación Particle Life",
          description:
            "Simulación de vida de partículas en 2D, donde las partículas interactúan entre sí y con el entorno. Desarrollado en conjunto con un amigo.",
          tech: ["React", "JavaScript", "p5.js", "HTML", "CSS"],
          image: "/images/particle-life.png",
          link: "https://particle-life-arua.vercel.app/",
          repo: "https://github.com/jlm109-ua/particle-life"
        },
        {
          title: "Memoji-my",
          description:
            "Un simple juego web donde tienes que encontrar los pares de emojis coincidentes. ¡Nunca encontrarás el mismo par dos veces!",
          tech: ["React", "JavaScript", "HTML", "CSS", "Next.js", "Dicebear"],
          image: "/images/memojimy.png",
          link: "https://memoji-my.vercel.app/",
          repo: "https://github.com/jlm109-ua/memoji-my",
        },
      ],
    },
    contact: {
      title: "Conectemos",
      description: "¿Listo para colaborar en tu próximo proyecto?",
      getInTouch: "Contáctame",
    },
  },
}

export default function Portfolio() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("main")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "es"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const c = contactInfo;
  const t = translations[language]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
    setActiveSection(sectionId)
  }

  return (
    <>
      <BackgroundGrid />
      <div className="min-h-screen text-zinc-100">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-xl">JL</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`text-sm font-medium transition-colors hover:text-zinc-300 ${activeSection === key ? "text-zinc-100" : "text-zinc-400"
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-zinc-400 hover:text-black">
                  <Globe className="h-4 w-4 mr-2 hover:text-black" />
                  {language.toUpperCase()}
                </Button>

                {/* Mobile menu button */}
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-zinc-100 w-full text-left"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Section */}
        <section id="main" className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-zinc-400 text-lg mb-2">{t.main.greeting}</p>
              <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">{t.main.name}</h1>
              {/*<p className="text-xl md:text-2xl text-zinc-400 mb-6">{t.main.aka}</p>*/}
              <div className="w-24 h-1 bg-zinc-100 mx-auto mb-8"></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-200">{t.main.title}</h2>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t.main.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold px-8 py-3"
                onClick={() => scrollToSection("projects")}
              >
                {t.main.cta}
              </Button>

              <div className="flex space-x-4">
                <Link href="mailto:jllinaresmauri@gmail.com" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Mail className="h-6 w-6" />
                </Link>
                <Link href={c.linkedin} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href={c.github} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Github className="h-6 w-6" />
                </Link>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("trajectory")}
              className="text-zinc-400 hover:text-zinc-100 transition-colors animate-bounce"
            >
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">{t.main.scrollDown}</span>
                <ChevronDown className="h-5 w-5" />
              </div>
            </button>
          </div>
        </section>

        {/* Trajectory Section */}
        <section id="trajectory" className="py-20 px-4 bg-zinc-950 border-t border-b border-zinc-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">{t.trajectory.title}</h2>
              <p className="text-xl text-zinc-400">{t.trajectory.subtitle}</p>
              <div className="w-24 h-1 bg-zinc-100 mx-auto mt-8"></div>
            </div>

            <div className="space-y-12">
              {t.trajectory.experiences.map((exp, index) => (
                exp.show &&
                <Card key={index} className="bg-zinc-900 border-zinc-800 p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <h3 className="text-xl font-bold text-zinc-100 mb-2">{exp.role}</h3>
                      <p className="text-zinc-400 font-medium mb-2">{exp.company}</p>
                      <p className="text-sm text-zinc-500">{exp.period}</p>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-zinc-300 mb-4 leading-relaxed">{exp.description}</p>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-2 h-2 bg-zinc-100 rounded-full mr-3"></div>
                            <span className="text-zinc-400">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">{t.projects.title}</h2>
              <p className="text-xl text-zinc-400">{t.projects.subtitle}</p>
              <div className="w-24 h-1 bg-zinc-100 mx-auto mt-8"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.projects.items.map((project, index) => (
                <Card
                  key={index}
                  className="bg-zinc-950 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-colors"
                >
                  <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-zinc-100">{project.title}</h3>
                    <p className="text-zinc-400 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Link
                        href={project.link}
                        className="flex items-center text-zinc-400 hover:text-zinc-100 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Link
                      </Link>
                      {project.repo !== "#" && (
                        <Link
                          href={project.repo}
                          className="flex items-center text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 bg-zinc-950 border-t border-b border-zinc-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{t.contact.title}</h2>
            <p className="text-xl text-zinc-400 mb-12">{t.contact.description}</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold px-8 py-3" asChild>
                <Link href="mailto:jllinaresmauri@gmail.com">
                  <Mail className="h-5 w-5 mr-2" />
                  {t.contact.getInTouch}
                </Link>
              </Button>

              <div className="flex space-x-6">
                <Link href={c.linkedin} target="_blank" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Linkedin className="h-8 w-8" />
                </Link>
                <Link href={c.github} target="_blank" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Github className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 bg-zinc-950 py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-zinc-500">© {new Date().getFullYear()} Juan Llinares. Built with passion and code.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
