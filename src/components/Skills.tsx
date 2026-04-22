const skillGroups = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'Go', 'Ruby', 'Dart', 'C/C++', 'Java', 'Solidity'],
  },
  {
    category: 'Front-End',
    skills: ['React.js', 'Next.js', 'React Native', 'Flutter', 'Vue.js', 'Nuxt.js', 'Redwood JS', 'WordPress', 'Drupal', 'Shopify'],
  },
  {
    category: 'Back-End',
    skills: ['Node.js', 'Python', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'C#', 'Java', 'Ruby on Rails'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'NoSQL', 'DB2', 'Neo4j', 'TigerGraph', 'Redis', 'SQLAlchemy'],
  },
  {
    category: 'Version Control',
    skills: ['Git', 'TFS', 'SVN', 'GitLab', 'Bitbucket'],
  },
  {
    category: 'API',
    skills: ['GraphQL (Apollo)', 'REST'],
  },
  {
    category: 'Server & Cloud',
    skills: ['AWS', 'Firebase', 'Heroku', 'GCP'],
  },
  {
    category: 'CI/CD',
    skills: ['GitHub Actions', 'Terraform'],
  },
  {
    category: 'Unit Testing',
    skills: ['Enzyme', 'Chai', 'Jest', 'Mocha', 'Jasmine'],
  },
  {
    category: 'Frameworks & Tools',
    skills: ['PyTorch', 'TensorFlow', 'Apache Spark', 'Docker', 'gRPC', 'LangChain', 'Agentic AI', 'OpenAI API'],
  },
  {
    category: 'Other',
    skills: ['TailwindCSS', 'QT Framework', 'IoT', 'Klaviyo', 'Payment Integration'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-900 text-white px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="bg-gray-950 rounded-xl p-5 border border-gray-800">
              <h3 className="text-indigo-400 font-semibold mb-3 uppercase text-xs tracking-wider">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
