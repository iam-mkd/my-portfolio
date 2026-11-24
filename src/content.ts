/**
 * Every piece of personal content on the site lives in this file.
 * Edit here; components only render what is below.
 * Source: Resume_Mrinmoy_Kumar_Das.pdf and the project repositories on GitHub.
 */

export const profile = {
  name: 'Mrinmoy Kumar Das',
  shortName: 'Mrinmoy',
  role: 'Senior Software Engineer',
  company: 'TCS',
  companyFull: 'Tata Consultancy Services',
  years: '7+ years',
  location: 'Chennai, India',
  intro:
    'Java backend developer at TCS. I build Spring Boot APIs and Apache Camel integrations, and open-source tools for testing how systems fail.',
  availability: 'Open to senior backend roles',
  rolesSought:
    'I’m looking for senior backend or platform engineering roles: Java and Spring Boot services, integrations, and the reliability work around them. Based in Chennai, open to remote.',
  email: 'mrinmoy03das@gmail.com',
  github: 'https://github.com/iam-mkd',
  githubUser: 'iam-mkd',
  linkedin: 'https://www.linkedin.com/in/mrinmoy-kumar-das-749a32121',
  resume: '/Mrinmoy-Kumar-Das-Resume.pdf',
}

/* ───────────────────────── Experience ───────────────────────── */

export type CaseStudy = {
  title: string
  metric: { value: string; label: string }
  system: string
  constraint: string
  change: string
  result: string
}

export const role = {
  company: 'Tata Consultancy Services',
  title: 'Senior Engineer (IT Analyst)',
  period: 'Jun 2019 – present',
  start: '2019-06',
  client: 'Citigroup, US Credit Retail Services',
  location: 'Chennai',
  summary:
    'Seven years delivering Java/Spring Boot and Python services for Citi’s fraud and dispute work, including services built from scratch.',
}

export const caseStudies: CaseStudy[] = [
  {
    title: 'Stopped a rules service from restarting in production',
    metric: { value: '48.7%', label: 'less memory, 0 forced restarts' },
    system: 'A production Drools rules service.',
    constraint: 'Metaspace exhaustion forced about 3 production restarts a month.',
    change:
      'Restructured the rules hierarchically, removed redundant rule evaluations, fixed fact lifecycle management and tuned G1GC.',
    result: 'Memory use dropped 48.7% and the recurring restarts stopped.',
  },
  {
    title: 'Moved six rule services off JBoss onto Spring Boot',
    metric: { value: '50%', label: 'lower latency, 42% more throughput' },
    system: 'Six Drools/KIE rule services running on JBoss EAP and WildFly.',
    constraint: 'Slow startup and slow deployments on the JBoss and WildFly application servers.',
    change:
      'Migrated them to Spring Boot on Java 17/21 with Kogito, asynchronous processing, lazy loading and JVM tuning.',
    result: '85% faster startup and deployments, 50% lower latency and 42% higher throughput.',
  },
  {
    title: 'Cut dispute call time with a production RAG service',
    metric: { value: '28 → 24 min', label: 'average call, about 14% shorter' },
    system: 'Reporting for lost/stolen card and dispute cases, handled on customer calls.',
    constraint: 'These calls averaged 28 minutes each.',
    change:
      'Built a production RAG pipeline end to end, with document chunking, embeddings in a Qdrant vector database, and retrieval and context injection to ground LLM answers, along with its frontend.',
    result: 'Average call time for these cases fell from 28 to 24 minutes.',
  },
]

export const alsoOwned: string[] = [
  'Moved 100% of fraud and dispute cases off manual back-office work onto application workflows, across 21 Spring Boot microservices, several built from scratch.',
  'Coordinate 30+ production releases a year with canary, blue-green, rolling and feature-flag deployments to OpenShift through Jenkins, Harness and Tekton.',
  'Hardened integrations with downstream banking systems (Apache Camel, CXF, Apigee) with retries, timeouts, circuit breakers and fallbacks, and Kafka events for async work.',
  'Mentored 13 engineers as team technical lead: reviewing and approving pull requests, setting coding standards, guiding implementation design and leading estimations in grooming.',
  'Brought AI coding assistants into daily engineering: GitHub Copilot and Devin for analysis, coding, debugging, code review and test generation, with every generated change reviewed against internal security policy.',
]

export const skills: { group: string; items: string }[] = [
  { group: 'Languages', items: 'Java 11/17/21, Python, SQL' },
  { group: 'Backend', items: 'Spring Boot, Spring Cloud, Spring Data JPA, Hibernate, REST, SOAP, microservices' },
  { group: 'Integration', items: 'Apache Camel, CXF, Apigee, Apache Kafka' },
  { group: 'Data', items: 'Oracle, PostgreSQL, MongoDB, Redis, query optimization' },
  {
    group: 'Reliability',
    items: 'JVM and G1GC tuning, root cause analysis, circuit breakers, Splunk, Grafana, ELK, ServiceNow',
  },
  { group: 'Security and testing', items: 'Spring Security, OAuth2, JWT, mTLS, JUnit, Mockito, TDD, SonarQube, Snyk' },
  { group: 'Delivery', items: 'Kubernetes, OpenShift, Docker, GCP, Jenkins, Tekton, Harness, Maven' },
  { group: 'AI tooling', items: 'RAG, Qdrant, embeddings, LangGraph, LangChain, LLM evaluation, Claude Code, Copilot' },
]

export const credentials = [
  { label: 'B.Tech, Computer Science and Engineering', detail: 'SRM University, Chennai, 2019' },
  {
    label: 'Google Cloud skill badge',
    detail: 'Develop Serverless Applications on Cloud Run',
    url: 'https://www.credly.com/badges/9157ea15-c81b-41aa-a7f1-a1b2156e3468/public_url',
  },
]

/* ───────────────────────── Projects ───────────────────────── */

export type Detail = { heading: string; body: string }

export const tracelens = {
  name: 'TraceLens',
  language: 'Java',
  summary:
    'A local lab that reproduces a cache stampede on a Spring Boot service, measures it, and proves the fix. Redis cache-aside in front of PostgreSQL, traced end to end with OpenTelemetry.',
  proof: {
    title: 'Product SQL reads per 32-request burst',
    note: 'Every one of 5 cohorts per mode matched. One instance, one key, a synthetic 100 ms database delay. Without coalescing, up to 16 queries ran at once.',
    rows: [
      { label: 'Warm cache', value: 0 },
      { label: 'Cold key, no coalescing', value: 32 },
      { label: 'Cold key, per-key coalescing', value: 1 },
    ],
    max: 32,
    conclusion:
      'Coalescing turned 32 duplicate database reads into one, inside one instance. It doesn’t claim anything across replicas.',
  },
  stack: ['Java 25', 'Spring Boot', 'Redis', 'PostgreSQL', 'OpenTelemetry', 'Jaeger', 'Docker Compose'],
  repo: 'https://github.com/iam-mkd/TraceLens',
  details: [
    {
      heading: 'How the experiment runs',
      body: '32 HTTP workers send one request each through a client barrier, against a fixed database pool of 16. Baseline, failure and mitigation modes rotate order across five cohorts, and every cohort is drained before the next one starts.',
    },
    {
      heading: 'How coalescing works',
      body: 'After a miss, requests join a per-key in-flight future. The leader rechecks Redis, queries PostgreSQL only if still missing, writes the cache and completes the future; followers share the result or the failure.',
    },
    {
      heading: 'How failures surface',
      body: 'Redis, decoding and database errors return a sanitized 503 problem response instead of silently falling back. Correlation IDs tie client samples to JSON logs and Jaeger traces.',
    },
  ] as Detail[],
}

export const runweave = {
  name: 'RunWeave',
  language: 'Python',
  summary:
    'A test harness for AI agents: evals with pass-rate gates, load tests, seeded provider faults and version comparisons. Runs locally and offline, no API key. Released as v0.1 on PyPI.',
  report: {
    caption: 'Example output from the RunWeave docs',
    lines: [
      { text: '$ runweave eval', tone: 'cmd' },
      { text: 'word-count on smoke: 4/4 cases passed (100%), p95 2.8 ms, 0 tokens, $0', tone: 'ok' },
      { text: 'Gates passed.', tone: 'ok' },
      { text: '$ runweave bench', tone: 'cmd' },
      { text: 'faults none, concurrency 1:  164.5 runs/s, p95 1.2 ms, 0/32 failed', tone: 'plain' },
      { text: 'faults none, concurrency 4:  173.85 runs/s, p95 2.9 ms, 0/32 failed', tone: 'plain' },
      { text: 'faults none, concurrency 16: 151.12 runs/s, p95 9.9 ms, 0/32 failed', tone: 'plain' },
    ] as { text: string; tone: 'cmd' | 'ok' | 'plain' }[],
    note: 'A failed gate exits 1, so the pull request fails. RunWeave’s own regression gate runs 13 offline cases and 68 assertions.',
  },
  stack: ['Python', 'FastAPI', 'asyncio', 'PostgreSQL', 'OpenTelemetry', 'React'],
  repo: 'https://github.com/iam-mkd/RunWeave',
  install: 'uv tool install runweave',
  details: [
    {
      heading: 'What it checks',
      body: 'Each eval case asserts on output, schema, tools called, latency and cost. With a baseline, any case that passed before and fails now fails the gate, even if the pass rate is still above the minimum.',
    },
    {
      heading: 'Faults and load',
      body: 'Seeded faults inject rate limits, 5xx errors, timeouts, cut-off streams and broken tool calls. Load tests sweep concurrency and report throughput, p95/p99, queue wait, event-loop lag and duplicate writes after lost responses.',
    },
    {
      heading: 'Bring any agent',
      body: 'A decorated Python function, any HTTP service, or the OpenAI Agents SDK, Claude Agent SDK and LangGraph. An LLM proxy replays fixtures so tests are free and deterministic.',
    },
  ] as Detail[],
}

export type MoreProject = {
  slug: string
  name: string
  language: 'Java' | 'Python'
  summary: string
  stack: string[]
  repo: string
  details: Detail[]
  example?: { label: string; code: string }[]
  link?: { label: string; href: string }
}

export const moreProjects: MoreProject[] = [
  {
    slug: 'url-shortener',
    name: 'URL Shortener',
    language: 'Java',
    summary:
      'Spring Boot service with Snowflake-style IDs, Base62 codes, a Redis-first redirect path, rate limiting and click analytics in MongoDB.',
    stack: ['Java 17', 'Spring Boot 3', 'MongoDB', 'Redis'],
    repo: 'https://github.com/iam-mkd/URL-Shortener',
    details: [
      {
        heading: 'When codes stay unique',
        body: 'A 64-bit ID is built from a timestamp, a worker ID and a per-millisecond sequence, then Base62-encoded. Codes stay unique as long as every running instance has its own worker ID and no instance’s clock moves backwards. Those are the two assumptions a deployment has to guarantee.',
      },
      {
        heading: 'Redirect path',
        body: 'Redirects read Redis first and fall back to MongoDB, which also stores click events and expires links through a TTL index. A Redis fixed-window limiter guards link creation.',
      },
    ],
  },
  {
    slug: 'scoutflow',
    name: 'ScoutFlow',
    language: 'Python',
    summary:
      'An agent that turns “best DDR5 deals under ₹50,000” into tool calls, typed product records and a grounded recommendation, with a deterministic value score.',
    stack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'Groq', 'Pydantic'],
    repo: 'https://github.com/iam-mkd/ScoutFlow',
    details: [
      {
        heading: '30 / 30 offline evaluation cases',
        body: 'Intent and constraint extraction (8), tool selection and argument hygiene (6), product ranking and value scoring (6), grounding against scraped prices (6), and edge cases like a ₹100 budget or conflicting constraints (4). With live models the same suite scores 18 / 30, which is why the offline grader exists.',
      },
      {
        heading: 'Value, not lowest price',
        body: 'A deterministic score weighs speed, CAS latency, capacity, rating and review confidence against price per GB, so a cheap 8 GB stick never wins “best deal”.',
      },
    ],
    link: {
      label: 'ScoutFlow evaluation suite on GitHub',
      href: 'https://github.com/iam-mkd/ScoutFlow#-deterministic-golden-evaluation-suite',
    },
  },
  {
    slug: 'log-analyser',
    name: 'Production Issue Analyser',
    language: 'Python',
    summary:
      'A FastAPI endpoint that turns an error and its logs into a summary, a severity and the next thing to check, with a schema-validated response.',
    stack: ['Python', 'FastAPI', 'Gemini API', 'Pydantic'],
    repo: 'https://github.com/iam-mkd/AI-Powered-Production-Issue-Analyser',
    details: [
      {
        heading: 'What goes to Gemini',
        body: 'Exactly the three fields you post (service, error and logs), unredacted, wrapped in a prompt that marks them as untrusted input rather than instructions. Nothing is stored. Strip credentials and customer data from logs before sending them.',
      },
    ],
    example: [
      {
        label: 'Request',
        code: `{
  "service": "payment-service",
  "error": "Database connection pool exhausted",
  "logs": "ERROR HikariPool-1 - Connection is not available"
}`,
      },
      {
        label: 'Response',
        code: `{
  "summary": "The payment service cannot acquire a PostgreSQL connection because pool capacity is exhausted.",
  "severity": "HIGH",
  "recommendation": "Inspect active sessions for leaked or long-running connections and review pool size against the PostgreSQL limit."
}`,
      },
    ],
  },
]

/* ───────────────────────── Recently ───────────────────────── */

export type Update = { date: string; title: string; body: string; url: string; source: 'GitHub' | 'LinkedIn' }

/** Curated, newest first. Add LinkedIn posts here with source: 'LinkedIn'. */
export const updates: Update[] = [
  {
    date: '2026-11-23',
    title: 'RunWeave now catches agents that write twice',
    body: 'When a response is lost after a write and the agent retries, the run often succeeds anyway. Load tests now count those duplicate writes, and evals can assert exactly-once effects.',
    url: 'https://github.com/iam-mkd/RunWeave',
    source: 'GitHub',
  },
  {
    date: '2026-11-20',
    title: 'RunWeave v0.1 is public',
    body: 'First public release: install with uv or pip, a quickstart that CI runs exactly as written, framework examples that run offline, and a desktop app around the workspace.',
    url: 'https://github.com/iam-mkd/RunWeave',
    source: 'GitHub',
  },
  {
    date: '2026-10-28',
    title: 'TraceLens reproduces a cache stampede, then fixes it',
    body: 'A cold key under a 32-request burst caused 32 database reads; per-key coalescing brought it to 1. Traces in Jaeger show the leader and its followers.',
    url: 'https://github.com/iam-mkd/TraceLens',
    source: 'GitHub',
  },
]
