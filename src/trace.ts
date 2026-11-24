/**
 * The hero is an illustrative distributed trace of "a request to Mrinmoy".
 * Each span is one part of the work, with attributes the way an
 * OpenTelemetry span would carry them. Durations are made up for the
 * picture; the attributes come from the résumé and the repositories.
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
      ['person.role', 'Senior Software Engineer, TCS'],
      ['experience', '7+ years, since June 2019'],
      ['client', 'Citi, US Credit Retail Services'],
      ['geo.city', 'Chennai, India'],
    ],
  },
  {
    id: 'spring',
    name: 'POST /disputes',
    service: 'spring-boot',
    depth: 1,
    start: 8,
    duration: 214,
    attrs: [
      ['scope', '21 microservices, several from scratch'],
      ['runtime', 'Java 17/21, Spring Boot'],
      ['outcome', '100% of fraud and dispute cases automated'],
    ],
  },
  {
    id: 'camel',
    name: 'route: downstream-banking',
    service: 'apache-camel',
    depth: 2,
    start: 22,
    duration: 96,
    attrs: [
      ['components', 'Apache Camel, CXF, Apigee'],
      ['resilience', 'retries, timeouts, circuit breakers, fallbacks'],
      ['protocols', 'REST and SOAP'],
    ],
  },
  {
    id: 'rules',
    name: 'evaluate fraud rules',
    service: 'drools',
    depth: 3,
    start: 30,
    duration: 40,
    attrs: [
      ['migration', 'JBoss to Spring Boot with Kogito'],
      ['latency', '50% lower, 42% more throughput'],
      ['memory', '48.7% less after a Metaspace fix'],
    ],
  },
  {
    id: 'kafka',
    name: 'publish dispute.created',
    service: 'kafka',
    depth: 3,
    start: 78,
    duration: 22,
    attrs: [
      ['messaging', 'Apache Kafka'],
      ['pattern', 'events for asynchronous processing'],
    ],
  },
  {
    id: 'ocp',
    name: 'rollout: canary',
    service: 'openshift',
    depth: 2,
    start: 130,
    duration: 84,
    attrs: [
      ['cadence', '30+ releases a year'],
      ['strategies', 'canary, blue-green, rolling, feature flags'],
      ['pipeline', 'Jenkins, Harness, Tekton'],
    ],
  },
  {
    id: 'eval',
    name: 'runweave eval',
    service: 'runweave',
    depth: 3,
    start: 148,
    duration: 58,
    status: 'retried',
    attrs: [
      ['fault.injected', '429 rate limit, seeded'],
      ['retry', 'recovered after 1 attempt'],
      ['gate', 'all cases passed, CI green'],
    ],
  },
]
