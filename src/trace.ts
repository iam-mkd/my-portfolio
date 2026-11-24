/**
 * The hero is a distributed trace of "a request to Mrinmoy":
 * each span is one part of the stack, with the attributes a real
 * OpenTelemetry span would carry. Times are in milliseconds.
 */
export type Span = {
  id: string
  name: string
  service: string
  depth: number
  start: number
  duration: number
  status?: 'ok' | 'retried'
  attrs: [string, string][]
}

export const TRACE_TOTAL = 240

export const spans: Span[] = [
  {
    id: 'root',
    name: 'GET /mrinmoy',
    service: 'portfolio',
    depth: 0,
    start: 0,
    duration: 240,
    attrs: [
      ['person.name', 'Mrinmoy Kumar Das'],
      ['person.role', 'Java developer'],
      ['org', 'Tata Consultancy Services'],
      ['geo.city', 'Chennai, India'],
      ['http.status', '200, open to good problems'],
    ],
  },
  {
    id: 'spring',
    name: 'DispatcherServlet.handle',
    service: 'spring-boot',
    depth: 1,
    start: 8,
    duration: 214,
    attrs: [
      ['runtime', 'Java 21, virtual threads'],
      ['framework', 'Spring Boot'],
      ['work', 'REST APIs and backend services'],
    ],
  },
  {
    id: 'camel',
    name: 'route: partner-integrations',
    service: 'apache-camel',
    depth: 2,
    start: 20,
    duration: 104,
    attrs: [
      ['component', 'Apache Camel'],
      ['pattern', 'content-based routing, retries, DLQ'],
      ['work', 'Connecting internal systems and partners'],
    ],
  },
  {
    id: 'redis',
    name: 'GET profile:cache',
    service: 'redis',
    depth: 3,
    start: 26,
    duration: 9,
    attrs: [
      ['cache.result', 'hit'],
      ['pattern', 'cache-aside, see TraceLens'],
      ['also', 'rate limiting in URL Shortener'],
    ],
  },
  {
    id: 'pg',
    name: 'SELECT projects',
    service: 'postgres',
    depth: 3,
    start: 44,
    duration: 58,
    attrs: [
      ['db.system', 'PostgreSQL'],
      ['also', 'MongoDB, ChromaDB'],
      ['rows', '5 public projects'],
    ],
  },
  {
    id: 'ocp',
    name: 'rollout: backend',
    service: 'openshift',
    depth: 2,
    start: 132,
    duration: 82,
    attrs: [
      ['platform', 'OpenShift, Kubernetes'],
      ['packaging', 'Docker images, Compose for labs'],
      ['observability', 'OpenTelemetry, Jaeger, Micrometer'],
    ],
  },
  {
    id: 'eval',
    name: 'runweave eval agents',
    service: 'runweave',
    depth: 3,
    start: 150,
    duration: 56,
    status: 'retried',
    attrs: [
      ['fault.injected', '429 rate limit, seeded'],
      ['retry', 'recovered after 1 attempt'],
      ['gate', 'pass rate 100%, CI green'],
    ],
  },
]
