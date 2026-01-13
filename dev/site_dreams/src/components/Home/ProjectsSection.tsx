import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const ProjectsSection = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/project/get`)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    if (projects.length === 0) return null;

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Nos Projets <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Engagés</span>
                    </h2>
                    <div className="w-32 h-1 bg-yellow-500 mx-auto mb-8 rounded-full"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Découvrez comment nous agissons concrètement sur le terrain pour soutenir, 
                        protéger et inspirer les communautés à travers le monde.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Card Image / Header */}
                            <div className="relative h-48 overflow-hidden">
                                {project.pays?.image ? (
                                    <img 
                                        src={`${API_BASE}${project.pays.image}`} 
                                        alt={project.pays.nom} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                       <Globe className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                {project.pays && (
                                    <div className="absolute bottom-4 left-6">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium rounded-full">
                                            <Globe className="w-3 h-3" />
                                            {project.pays.nom}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1 line-clamp-4">
                                    {project.description}
                                </p>
                                
                                {project.pays && (
                                    <Link 
                                        to={`/pays/${slugify(project.pays.nom)}`} 
                                        className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-white bg-gray-900 rounded-xl hover:bg-yellow-500 transition-all duration-300 group"
                                    >
                                        En découvrir plus
                                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
