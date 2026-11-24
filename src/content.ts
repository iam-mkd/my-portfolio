/**
 * Every piece of personal content on the site lives in this file.
 * Edit here; components only render what is below.
 *
 * Fields marked `TODO(you)` are things I could not find publicly
 * (LinkedIn URL, resume PDF, posts, exact dates). Empty values are
 * hidden on the site, so nothing broken shows while they are blank.
 */

export const profile = {
  name: 'Mrinmoy Kumar Das',
  shortName: 'Mrinmoy',
  role: 'Java developer',
  company: 'Tata Consultancy Services',
  location: 'Chennai, India',
  intro:
    'I build backend systems, APIs and integrations in Java, and the tooling that shows you exactly where they break.',
  about: [
    'Day to day I work with Spring Boot, Java 21 and Apache Camel, wiring services together and keeping integrations dependable on OpenShift and Kubernetes.',
    'Outside work I build reliability labs and test harnesses: tools that reproduce failures on purpose, trace them, and turn the result into something a pull request can be gated on.',
  ],
  email: 'mrinmoy03das@gmail.com',
  github: 'https://github.com/iam-mkd',
  githubUser: 'iam-mkd',
  /** TODO(you): paste your LinkedIn profile URL, e.g. https://www.linkedin.com/in/your-handle */
  linkedin: '',
  /** TODO(you): drop resume.pdf into /public and set this to '/resume.pdf' */
  resume: '',
  openToWork: true,
}

export type Project = {
  slug: string
  name: string
  summary: string
  detail: string[]
  stack: string[]
  repo: string
  language: 'Java' | 'Python'
  command?: { label: string; lines: string[] }
  facts: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    slug: 'runweave',
    name: 'RunWeave',
    summary:
      'Test AI agents like the rest of your code: evals, load tests, injected provider faults and version comparisons. Local, offline, no API key.',
    detail: [
      'Agents are easy to demo and hard to trust. RunWeave runs a dataset of cases with assertions on output, schema, tools called, latency and cost, and fails CI when a pass-rate gate drops.',
      'It load-tests agents with concurrency sweeps (p50, p95, p99, queue wait, event-loop lag), injects seeded provider faults like rate limits, 5xx and cut-off streams, and compares two versions case by case before you switch.',
      'Works with any Python function, any HTTP agent, the OpenAI Agents SDK, Claude Agent SDK and LangGraph. An LLM proxy replays fixtures so tests are free and deterministic.',
    ],
    stack: ['Python', 'FastAPI', 'asyncio', 'TypeScript', 'PostgreSQL', 'LangGraph'],
    repo: 'https://github.com/iam-mkd/RunWeave',
    language: 'Python',
    command: {
      label: 'Try it',
      lines: ['uv tool install runweave', 'runweave init my-agent', 'cd my-agent && runweave eval'],
    },
    facts: [
      { label: 'License', value: 'Apache-2.0' },
      { label: 'Runs on', value: '127.0.0.1, offline' },
      { label: 'CI output', value: 'JUnit, JSON, Markdown' },
    ],
  },
  {
    slug: 'tracelens',
    name: 'TraceLens',
    summary:
      'A local-first distributed-systems reliability lab for reproducing failures, observing their effects and checking resilience mechanisms.',
    detail: [
      'A Spring Boot service with a Redis cache-aside product endpoint backed by PostgreSQL, and an opt-in lab that reproduces a cache stampede under controlled bursts.',
      'Every request carries a correlation ID into structured JSON logs; OpenTelemetry traces land in Jaeger, and Micrometer counters show cache outcomes and SQL attempts per run.',
      'Failures are explicit: Redis, decoding and database errors return a sanitized 503 problem response instead of silently falling back.',
    ],
    stack: ['Java 25', 'Spring Boot', 'Redis', 'PostgreSQL', 'OpenTelemetry', 'Jaeger', 'Docker Compose'],
    repo: 'https://github.com/iam-mkd/TraceLens',
    language: 'Java',
    command: {
      label: 'Run the lab',
      lines: ['docker compose up --build --wait', 'curl http://127.0.0.1:8080/api/products/1'],
    },
    facts: [
      { label: 'Experiment', value: 'Cache stampede' },
      { label: 'Burst', value: '32 requests × 5 cohorts' },
      { label: 'Traces', value: 'OTel Java agent' },
    ],
  },
  {
    slug: 'scoutflow',
    name: 'ScoutFlow',
    summary:
      'An autonomous research agent and scraping API that turns a task like "best DDR5 deals under ₹50,000" into tool calls, typed records and a grounded answer.',
    detail: [
      'The agent picks its own tools (search, product details, compare, scrape, RAG search) and extracts products into a validated Pydantic model rather than feeding raw HTML to a model.',
      'A deterministic value-score engine ranks results on speed, latency, capacity, rating and price per GB, so the cheapest 8 GB stick is never called the best deal.',
      'Runs locally on Ollama with native tool calling and falls back to Groq or Gemini. A 30-case golden evaluation suite grades intent, tool choice, ranking and grounding offline.',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'Groq', 'Pydantic'],
    repo: 'https://github.com/iam-mkd/ScoutFlow',
    language: 'Python',
    facts: [
      { label: 'Tests', value: '56 / 56 passing' },
      { label: 'Golden eval', value: '30 / 30 offline' },
      { label: 'Inference', value: 'Local first' },
    ],
  },
  {
    slug: 'url-shortener',
    name: 'URL Shortener',
    summary:
      'A production-style shortener with Snowflake IDs, Base62 codes, a cache-first redirect path, rate limiting and click analytics.',
    detail: [
      'Snowflake-style 64-bit IDs are encoded to Base62, so codes are short, URL-safe and collision-free without a coordination round trip.',
      'Redirects read Redis first and fall back to MongoDB, which also stores click events and expires links through a TTL index. A Redis fixed-window limiter guards creation.',
    ],
    stack: ['Java 17', 'Spring Boot 3', 'MongoDB', 'Redis'],
    repo: 'https://github.com/iam-mkd/URL-Shortener',
    language: 'Java',
    facts: [
      { label: 'IDs', value: 'Snowflake + Base62' },
      { label: 'Redirect', value: 'Cache first' },
      { label: 'Expiry', value: 'Mongo TTL index' },
    ],
  },
  {
    slug: 'log-analyser',
    name: 'Production Issue Analyser',
    summary:
      'A FastAPI service that reads an error and its logs and returns a summary, a severity and the next thing to check.',
    detail: [
      'Send the service name, the error and raw logs; Gemini returns structured JSON with a severity of LOW, MEDIUM, HIGH or CRITICAL and a concrete recommendation.',
      'Built for the first five minutes of an incident, when a HikariCP timeout and a PostgreSQL slot error need to become one sentence someone can act on.',
    ],
    stack: ['Python', 'FastAPI', 'Gemini API', 'uv'],
    repo: 'https://github.com/iam-mkd/AI-Powered-Production-Issue-Analyser',
    language: 'Python',
    facts: [
      { label: 'Endpoint', value: 'POST /chat' },
      { label: 'Output', value: 'Typed JSON' },
    ],
  },
]

export type Role = {
  company: string
  title: string
  period: string
  location: string
  points: string[]
  stack: string[]
}

export const experience: Role[] = [
  {
    company: 'Tata Consultancy Services',
    title: 'Java Developer',
    /** TODO(you): set your real start month, e.g. 'Aug 2023 – now' */
    period: 'Current role',
    location: 'Chennai',
    points: [
      'Build and maintain backend services and REST APIs with Spring Boot and Java 21.',
      'Design integration routes with Apache Camel that connect internal systems and external partners.',
      'Ship and run services in containers on OpenShift and Kubernetes.',
    ],
    stack: ['Java 21', 'Spring Boot', 'Apache Camel', 'OpenShift', 'Kubernetes', 'REST'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Java', 'Python', 'TypeScript', 'SQL'] },
  { group: 'Backend', items: ['Spring Boot', 'Apache Camel', 'FastAPI', 'REST APIs', 'asyncio'] },
  { group: 'Data', items: ['PostgreSQL', 'Redis', 'MongoDB', 'ChromaDB'] },
  { group: 'Platform', items: ['OpenShift', 'Kubernetes', 'Docker', 'GitHub Actions'] },
  { group: 'Observability', items: ['OpenTelemetry', 'Jaeger', 'Micrometer', 'Structured logs'] },
  { group: 'AI tooling', items: ['Agent evals', 'RAG', 'LangGraph', 'Ollama'] },
]

/**
 * LinkedIn posts and features. LinkedIn has no public API for this,
 * so add them by hand. Newest first. They show in "Recently" alongside
 * your live GitHub activity.
 * TODO(you): add your recent posts, e.g.
 * { date: '2026-11-18', title: 'What a cache stampede looks like in Jaeger', url: 'https://www.linkedin.com/posts/…', kind: 'post' }
 */
export type Post = { date: string; title: string; url: string; kind: 'post' | 'article' | 'feature' }
export const posts: Post[] = []
