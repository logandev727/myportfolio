interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    title: 'Project One',
    description: 'A full-stack web app built with React and Node.js.',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'Project Two',
    description: 'A mobile-first e-commerce platform with real-time updates.',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    title: 'Project Three',
    description: 'A CLI tool that automates repetitive development tasks.',
    tags: ['Python', 'CLI', 'Automation'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-950 text-white px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-indigo-500 transition-colors flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub ↗
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Live ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
