export default function About() {
  return (
    <section id="about" className="relative z-10 py-24 bg-gray-900/90 text-white px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img
            src="/profile.jpg"
            alt="Evans Benyeogor"
            className="w-40 h-40 rounded-full object-cover flex-shrink-0 border-2 border-indigo-500"
          />
          <div className="text-gray-300 space-y-4">
            <p>
              As a Full Stack Engineer with over 8 years of professional experience, I bring
              end-to-end expertise across frontend, backend, and DevOps, with strong specialization
              in React.js, Angular, and Node.js.
            </p>
            <p>
              I've led cross-functional teams of up to nine engineers, driving architectural
              decisions, enforcing code quality standards, and delivering scalable,
              high-performance applications from concept to production. My experience spans system
              design, API development, cloud infrastructure, CI/CD, and performance optimization.
            </p>
            <p>
              I'm passionate about continuous learning, adopting emerging technologies, and building
              products that create measurable business impact. I thrive in collaborative environments
              where ownership, mentorship, and technical excellence drive successful outcomes.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.github.com/sven3270350" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/evansbankx" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
