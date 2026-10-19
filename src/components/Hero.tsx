export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center bg-gray-950/80 text-white px-6">
      <div className="text-center">
        <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-4">
          Hello, I'm
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Evans Benyeogor</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Full Stack Developer
        </p>
        <div className="flex gap-4 justify-center">
          {/* <a
            href="#projects"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Projects
          </a> */}
          <a
            href="#contact"
            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
