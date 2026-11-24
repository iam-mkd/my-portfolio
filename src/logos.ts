import type * as Icons from './brand-icons'

export type IconKey = keyof typeof Icons

/**
 * A tool shown with its logo. Brands without a published logo in
 * Simple Icons (Oracle, Apache Camel, Apigee and a few others) get a
 * lettered tile instead, so nothing is drawn from memory.
 */
export type Tool = { name: string; icon?: IconKey; mono?: string }

const t = (name: string, icon?: IconKey, mono?: string): Tool => ({ name, icon, mono })

export const tools = {
  java: t('Java', 'siOpenjdk'),
  python: t('Python', 'siPython'),
  sql: t('SQL', undefined, 'SQL'),
  springBoot: t('Spring Boot', 'siSpringboot'),
  springCloud: t('Spring Cloud', 'siSpring'),
  springSecurity: t('Spring Security', 'siSpringsecurity'),
  hibernate: t('Hibernate', 'siHibernate'),
  fastapi: t('FastAPI', 'siFastapi'),
  camel: t('Apache Camel', undefined, 'AC'),
  kafka: t('Apache Kafka', 'siApachekafka'),
  apigee: t('Apigee', undefined, 'AG'),
  cxf: t('Apache CXF', undefined, 'CXF'),
  oracle: t('Oracle', undefined, 'OR'),
  postgres: t('PostgreSQL', 'siPostgresql'),
  mongodb: t('MongoDB', 'siMongodb'),
  redis: t('Redis', 'siRedis'),
  qdrant: t('Qdrant', 'siQdrant'),
  kubernetes: t('Kubernetes', 'siKubernetes'),
  openshift: t('OpenShift', 'siRedhatopenshift'),
  docker: t('Docker', 'siDocker'),
  jenkins: t('Jenkins', 'siJenkins'),
  tekton: t('Tekton', 'siTekton'),
  harness: t('Harness', undefined, 'HN'),
  maven: t('Maven', 'siApachemaven'),
  git: t('Git', 'siGit'),
  gcp: t('Google Cloud', 'siGooglecloud'),
  grafana: t('Grafana', 'siGrafana'),
  splunk: t('Splunk', 'siSplunk'),
  elastic: t('ELK', 'siElastic'),
  otel: t('OpenTelemetry', 'siOpentelemetry'),
  junit: t('JUnit 5', 'siJunit5'),
  mockito: t('Mockito', undefined, 'MO'),
  sonar: t('SonarQube', 'siSonarqubeserver'),
  snyk: t('Snyk', 'siSnyk'),
  langchain: t('LangChain', 'siLangchain'),
  langgraph: t('LangGraph', 'siLanggraph'),
  ollama: t('Ollama', 'siOllama'),
  pydantic: t('Pydantic', 'siPydantic'),
  claude: t('Claude Code', 'siClaude'),
  copilot: t('GitHub Copilot', 'siGithubcopilot'),
} satisfies Record<string, Tool>

export const companyLogo: IconKey = 'siTcs'

/** The strip under the hero: the core of the day job first. */
export const marquee: Tool[] = [
  tools.java,
  tools.springBoot,
  tools.kafka,
  tools.camel,
  tools.redis,
  tools.postgres,
  tools.oracle,
  tools.mongodb,
  tools.kubernetes,
  tools.openshift,
  tools.docker,
  tools.jenkins,
  tools.grafana,
  tools.splunk,
  tools.junit,
  tools.python,
  tools.fastapi,
  tools.langgraph,
  tools.qdrant,
  tools.claude,
]

export const toolbox: { group: string; items: Tool[] }[] = [
  { group: 'Languages', items: [tools.java, tools.python, tools.sql] },
  {
    group: 'Backend',
    items: [tools.springBoot, tools.springCloud, tools.springSecurity, tools.hibernate, tools.fastapi],
  },
  { group: 'Integration', items: [tools.camel, tools.kafka, tools.apigee, tools.cxf] },
  { group: 'Data', items: [tools.oracle, tools.postgres, tools.mongodb, tools.redis, tools.qdrant] },
  {
    group: 'Delivery',
    items: [
      tools.kubernetes,
      tools.openshift,
      tools.docker,
      tools.jenkins,
      tools.tekton,
      tools.harness,
      tools.maven,
      tools.git,
      tools.gcp,
    ],
  },
  { group: 'Observability', items: [tools.grafana, tools.splunk, tools.elastic, tools.otel] },
  { group: 'Quality and security', items: [tools.junit, tools.mockito, tools.sonar, tools.snyk] },
  {
    group: 'AI tooling',
    items: [tools.langchain, tools.langgraph, tools.ollama, tools.pydantic, tools.claude, tools.copilot],
  },
]

let cache: typeof Icons | null = null
let pending: Promise<typeof Icons> | null = null
const listeners = new Set<() => void>()

/** Brand paths live in their own chunk so they never delay the first paint. */
export function loadIcons() {
  pending ??= import('./brand-icons').then((mod) => {
    cache = mod
    listeners.forEach((l) => l())
    return mod
  })
  return pending
}
export const iconStore = {
  subscribe(l: () => void) {
    listeners.add(l)
    void loadIcons()
    return () => listeners.delete(l)
  },
  get: () => cache,
}

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
export function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
