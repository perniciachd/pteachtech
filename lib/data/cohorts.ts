// Cohort data for pTeachTech programs
// Source of truth: PERNICIA_AI_COHORT_SYLLABUS.md, PERNICIA_AWS_COHORT_CURRICULUM.md,
// PERNICIA_COMBINED_COHORT_CURRICULUM.md, PERNICIA_3YR_BUSINESS_PLAN.md
// Do NOT modify pricing, duration, or curriculum without updating those locked docs.

export interface CurriculumWeek {
  week: number
  title: string
  topics: string[]
}

export interface PricingTier {
  region: string
  currency: string
  price: number
  installments?: number
  installmentAmount?: number
  note?: string
}

export interface Instructor {
  name: string
  title: string
  company: string
  image?: string
  linkedin?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Cohort {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  icon: 'brain' | 'cloud' | 'rocket'
  color: 'primary' | 'accent' | 'secondary'
  duration: string
  startDate: string
  totalSeats: number
  availableSeats: number
  status: 'upcoming' | 'open' | 'in_progress' | 'completed'
  /** Label for curriculum units. Defaults to 'Week'. B2B programs use 'Module'. */
  curriculumUnitLabel?: string
  /** B2B = private team/enterprise program (no public per-seat sale). */
  b2b?: boolean
  /** Hidden from all public listings & routes (kept in data for future re-enable). */
  hidden?: boolean
  highlights: string[]
  curriculum: CurriculumWeek[]
  pricing: PricingTier[]
  instructors: Instructor[]
  faqs: FAQ[]
  outcomes: string[]
  prerequisites: string[]
}

const allCohorts: Cohort[] = [
  // ============================================================
  // FLAGSHIP (B2B): Multi-Agent Copilot & Enterprise AI Architecture
  // Private, team-based enterprise program. No public per-seat price.
  // ============================================================
  {
    id: 'enterprise-copilot',
    slug: 'enterprise-copilot',
    name: 'Multi-Agent Copilot & Enterprise AI Architecture',
    tagline: 'Design, secure & ship enterprise multi-agent Copilot systems',
    description:
      'A hands-on B2B enterprise program for building governed, observable multi-agent Copilot systems on Microsoft Copilot Studio, Power Platform & Azure — from single-agent design to a fully deployed enterprise capstone. Delivered by 15+ year practitioners who don\'t just teach this — they architect and ship production multi-agent AI for US and European enterprises.',
    icon: 'rocket',
    color: 'secondary',
    duration: '5-day core or 10-day enterprise track · instructor-led + hands-on labs',
    startDate: 'Rolling · private team cohorts',
    totalSeats: 20,
    availableSeats: 20,
    status: 'open',
    curriculumUnitLabel: 'Module',
    b2b: true,
    highlights: [
      'Delivered by 15+ year practitioners who build multi-agent AI for US & European enterprises — not just teach it',
      'Hands-on labs every module — orchestrator, domain & guardrail agents on Copilot Studio + Azure',
      'Enterprise-grade: Entra ID security, Key Vault, RBAC, observability & governance',
      'Capstone: a complete, deployed multi-agent enterprise solution',
      'Private team cohorts · onsite or virtual · competitive pricing',
    ],
    curriculum: [
      { week: 1, title: 'Module 1 · Copilot Fundamentals & Single-Agent Design', topics: [
        'Copilot Studio and what an AI agent is',
        'Topics, triggers, entities & variables',
        'Power Automate integration basics',
        'Limits of single-agent systems — Lab: build a Copilot',
      ] },
      { week: 2, title: 'Module 2 · Multi-Agent Architecture Fundamentals', topics: [
        'Single vs multi-agent architecture',
        'Agent types: orchestrator/router, domain (KB/API/DB), guardrail',
        'Stateless vs stateful & responsibility boundaries',
        'Lab: split a Copilot into multiple agents',
      ] },
      { week: 3, title: 'Module 3 · Agent Design & Orchestration Patterns', topics: [
        'Splitting criteria & anti-patterns (overloaded agent, tight coupling)',
        'Orchestration: central, skill-based, intent & confidence routing',
        'Agent routing strategies',
        'Lab: build an orchestrator + routing logic',
      ] },
      { week: 4, title: 'Module 4 · Agent Communication & Integration', topics: [
        'Agent-to-agent comms & canonical JSON contracts',
        'Chaining via Power Automate, HTTP & custom connectors',
        'Secured integration: Entra ID, Managed Identity, Graph, on-prem SQL/Dataverse',
        'Labs: JSON comms, chain agents, API-based agent',
      ] },
      { week: 5, title: 'Module 5 · Security, Governance & Environment Strategy', topics: [
        'Prompt-injection defense & guardrail agents',
        'Approval-based execution & DLP-safe segregation',
        'RBAC, Conditional Access, Azure Key Vault & secrets',
        'DEV/TEST/PROD, audit & governance — Labs: guardrail, approvals, secrets',
      ] },
      { week: 6, title: 'Module 6 · Knowledge Management & Retrieval Design', topics: [
        'Central vs per-agent knowledge base',
        'Deterministic lookup vs generative reasoning',
        'Fallback & ambiguity resolution',
        'Lab: KB + data agents with fallback',
      ] },
      { week: 7, title: 'Module 7 · Observability, Monitoring & Error Handling', topics: [
        'Cross-agent traceability & correlation IDs',
        'Error handling, replay & audit scenarios',
        'Azure Monitor, Application Insights, Log Analytics & distributed tracing',
        'Labs: logging, tracing, observability dashboard',
      ] },
      { week: 8, title: 'Module 8 · Versioning, Scaling & Deployment', topics: [
        'Agent versioning & backward compatibility',
        'Deployment & scaling strategies',
        'Publish to Microsoft Teams · enterprise rollout',
        'Lab: deploy, version-upgrade & publish',
      ] },
      { week: 9, title: 'Module 9 · Enterprise Integration & Hybrid AI Operations', topics: [
        'Hybrid AI architecture, Azure API Management & Service Bus',
        'Enterprise integration: AD, Exchange, ServiceNow, SQL',
        'On-prem monitoring & governance for hybrid AI',
        'Lab: hybrid monitoring agent + operational AI dashboard',
      ] },
      { week: 10, title: 'Capstone · End-to-End Enterprise Solution', topics: [
        'Build: orchestrator + 2 domain agents + 1 validation agent',
        'Implement routing, security & monitoring',
        'End-to-end deployment',
        'Reviewed against production standards',
      ] },
    ],
    pricing: [],
    instructors: [
      {
        name: 'Manan Jindal',
        title: 'Principal Trainer & Solution Architect · 15+ years',
        company: 'pTeachTech · Pernicia (Canada)',
        linkedin: 'https://linkedin.com/in/manan-jindal',
      },
    ],
    faqs: [
      {
        question: 'Is this a private, team-based program?',
        answer:
          'Yes. This is a B2B program delivered privately to your team — onsite or virtual — and tailored to your stack and goals. We don\'t sell individual seats for this program.',
      },
      {
        question: 'How experienced are the trainers?',
        answer:
          'Delivered by 15+ year practitioners who architect and ship production multi-agent AI systems for US and European enterprises. You learn from people who build this in production — not only teach it.',
      },
      {
        question: 'Is it hands-on?',
        answer:
          'Every module has a lab, culminating in a deployed multi-agent enterprise capstone. Environments are pre-provisioned so no session time is lost to setup.',
      },
      {
        question: 'Is it a 5-day or 10-day program?',
        answer:
          'A 5-day core covers design & build; the 10-day enterprise track adds advanced security, observability and enterprise integration for Azure-experienced teams. We scope the right length with you.',
      },
      {
        question: 'What does it cost?',
        answer:
          'Pricing is competitive and tailored to format, scope and team size. Talk to us and we\'ll scope a program for your team.',
      },
      {
        question: 'Do we need our own environment?',
        answer:
          'Ideally your team uses your own Microsoft tenant (most secure). If not, we can provision a training environment. We confirm this on a readiness call before delivery.',
      },
    ],
    outcomes: [
      'Design & build multi-agent Copilot systems (orchestrator, domain, guardrail)',
      'Secure agents with Entra ID, RBAC, Key Vault, DLP & governance',
      'Instrument full observability with Azure Monitor, App Insights & tracing',
      'Deploy & scale agents to Teams and the enterprise',
      'Ship a complete, deployed multi-agent enterprise capstone',
      'Earn the pTeachTech Enterprise Multi-Agent AI credential',
    ],
    prerequisites: [
      'For teams: developers, solution architects & Power Platform makers',
      'Comfort with APIs, JSON & basic cloud concepts',
      'Enterprise track: some Azure (identity/networking) experience',
      'Access to a Copilot Studio / Power Platform + Azure environment (we help provision)',
      'Delivered privately to your team — onsite or virtual',
    ],
  },

  // ============================================================
  // COHORT 1: AI Engineering
  // ============================================================
  {
    id: 'ai-engineering',
    slug: 'ai-engineering',
    hidden: true,
    name: 'AI Engineering',
    tagline: 'Applied AI for Builders · From notebooks to production',
    description:
      'Six weeks of live, hands-on AI engineering — RAG, agents, evaluation, observability, and the governance layer for regulated environments. Build and deploy a real BFSI document QA system with citations, eval suite, and a public API endpoint.',
    icon: 'brain',
    color: 'primary',
    duration: '6 weeks · 60 hours · 2 hrs/day × 5 days',
    startDate: 'July 20, 2026',
    totalSeats: 20,
    availableSeats: 20,
    status: 'open',
    highlights: [
      'Founding-cohort pricing ₹30,000 (first 20 seats only)',
      'Live instructor-led · 7–9 PM IST (covers India + Middle East)',
      'BFSI capstone: deploy a production RAG with citations, eval, observability',
      '60-day post-cohort placement support · India Y1',
    ],
    curriculum: [
      {
        week: 1,
        title: 'AI Engineering Foundations',
        topics: [
          'The production LLM stack',
          'Prompt engineering, structured outputs (Pydantic + Instructor)',
          'Model selection: cost vs latency vs quality',
          'First production-style API calls (Claude, OpenAI, Bedrock)',
        ],
      },
      {
        week: 2,
        title: 'RAG Fundamentals',
        topics: [
          'Document ingestion + header-aware chunking',
          'Embeddings (Voyage, OpenAI, BGE) and vector DBs',
          'pgvector setup + similarity search',
          'End-to-end naive RAG over BFSI corpus',
        ],
      },
      {
        week: 3,
        title: 'Production RAG Patterns',
        topics: [
          'Hybrid retrieval (vector + BM25 + RRF)',
          'Reranking with Cohere Rerank',
          'Streaming responses with citations',
          'Anthropic prompt caching · latency p95 < 3s',
        ],
      },
      {
        week: 4,
        title: 'Agents & Tool Use',
        topics: [
          'Tool calling + ReAct pattern',
          'MCP (Model Context Protocol)',
          'Agent failure modes + cost control (iteration caps)',
          'Add agentic followup to your capstone',
        ],
      },
      {
        week: 5,
        title: 'Evaluation, Observability, Deployment',
        topics: [
          'Golden datasets + Ragas metrics + LLM-as-judge',
          'Eval-on-PR in GitHub Actions',
          'Langfuse traces + prompt versioning',
          'Deploy to AWS Lambda + API Gateway · live public endpoint',
        ],
      },
      {
        week: 6,
        title: 'Governance, Safety, Capstone Showcase',
        topics: [
          'Prompt injection defense + PII redaction (Presidio)',
          'DPDP / RBI / SEBI / GDPR compliance',
          'Capstone showcase (8 min demo + Q&A to panel)',
          'Career connect: portfolio review + placement intros',
        ],
      },
    ],
    pricing: [
      { region: 'India', currency: 'INR', price: 40000, note: 'Founding cohort ₹30,000 (first 20 seats)' },
      { region: 'Middle East', currency: 'USD', price: 1000 },
      { region: 'US/EU (online + mentor)', currency: 'USD', price: 2000 },
    ],
    instructors: [
      {
        name: 'Manan Jindal',
        title: 'Lead Trainer',
        company: 'pTeachTech · Pernicia (Canada)',
        linkedin: 'https://linkedin.com/in/manan-jindal',
      },
    ],
    faqs: [
      {
        question: 'I\'m a complete beginner. Can I take this?',
        answer:
          'No. The pre-cohort assessment screens for Python, Git, SQL, and cloud comfort. If you don\'t pass, we\'ll point you to a foundations track and welcome you back in 12 weeks.',
      },
      {
        question: 'What if I miss a session?',
        answer:
          'First missed session: recording provided. Subsequent absences may affect certificate eligibility (see attendance policy). Recordings are for missed-session catchup only, not as substitute for live attendance.',
      },
      {
        question: 'Do I need a powerful laptop?',
        answer:
          'No. All compute is in the cloud (AWS Free Tier + provided LLM credits). Any laptop running Python 3.12 + Docker is enough.',
      },
      {
        question: 'How much will I spend beyond the fee?',
        answer:
          'We provide ~₹800 of LLM credits and AWS Free Tier covers compute. Expect ₹200–500 of personal spend if you go beyond recommended usage. Cost-control is part of what we teach.',
      },
      {
        question: 'Is there a placement guarantee?',
        answer:
          'No. We provide 60-day placement support and introductions to partners for top-tier graduates. We don\'t guarantee jobs — no honest training program does.',
      },
      {
        question: 'Can I take this from outside India?',
        answer:
          'Yes. IST evening sessions work for Middle East (no adjustment) and South Asia. For US/Europe, we offer a separate online-cohort tier with mentor-led catchup sessions.',
      },
      {
        question: 'How is this different from Scaler, Coursera, or other bootcamps?',
        answer:
          'Production focus. Most courses stop at notebooks; we end at deployed systems. Most are pre-recorded; we are live. Most give a certificate; we give a deployed portfolio piece you walk into interviews with.',
      },
      {
        question: 'Will I be able to deploy this at my company?',
        answer:
          'Yes — that\'s the point. The capstone is production-grade by design. Many alumni use their capstone as the basis for internal company projects.',
      },
    ],
    outcomes: [
      'Deploy a production-grade RAG system to a public URL',
      'Ship a polished GitHub repo with eval-on-PR + Langfuse traces',
      'Earn the pTeachTech Applied AI Engineering Certificate',
      'AWS AI Practitioner readiness',
      '6 mock interviews with rubric feedback',
      'Lifetime alumni network access',
    ],
    prerequisites: [
      'Python proficiency (functions, classes, async, REST APIs)',
      'Basic SQL (SELECT, JOIN, GROUP BY, indexes)',
      'Git + GitHub fluency',
      'Comfort with one cloud console (AWS / Azure / GCP)',
      '8–10 hrs/week of out-of-class time for labs + capstone',
    ],
  },

  // ============================================================
  // COHORT 2: AWS Cloud-DevSecOps
  // ============================================================
  {
    id: 'aws-cloud',
    slug: 'aws-cloud',
    hidden: true,
    name: 'AWS Cloud-DevSecOps',
    tagline: 'Build cloud you can defend',
    description:
      'Six weeks of live, hands-on AWS — Terraform, CI/CD, security hardening, observability. Deploy a production-grade reference architecture (multi-AZ, IaC, IAM-hardened) and defend it in any interview.',
    icon: 'cloud',
    color: 'accent',
    duration: '6 weeks · 60 hours · 2 hrs/day × 5 days',
    startDate: 'September 1, 2026',
    totalSeats: 20,
    availableSeats: 20,
    status: 'upcoming',
    highlights: [
      'Founding-cohort pricing ₹22,000 (first 20 seats only)',
      'AWS Solutions Architect Associate (SAA-C03) prep included',
      'Capstone: production-grade multi-AZ reference architecture',
      'BFSI compliance baked in (RBI / DPDP)',
    ],
    curriculum: [
      {
        week: 1,
        title: 'AWS Core & IAM Foundations',
        topics: [
          'AWS Well-Architected Framework (6 pillars)',
          'IAM deep dive: users, roles, policies, least privilege',
          'Access Analyzer + permission boundaries',
        ],
      },
      {
        week: 2,
        title: 'Compute, Storage, Networking + Terraform',
        topics: [
          'VPC anatomy: subnets, NAT, security groups',
          'EC2, EBS, S3 (lifecycle + KMS encryption)',
          'Terraform basics + S3 remote state backend',
        ],
      },
      {
        week: 3,
        title: 'Containers + Reference Architecture',
        topics: [
          'Docker fundamentals + multi-stage builds',
          'ECS Fargate behind ALB · auto-scaling',
          'All infrastructure managed via Terraform modules',
        ],
      },
      {
        week: 4,
        title: 'CI/CD + GitOps',
        topics: [
          'GitHub Actions with OIDC (no static keys)',
          'Blue-green deployment on ECS',
          'DORA metrics + rollback on failed health checks',
        ],
      },
      {
        week: 5,
        title: 'Security Hardening + Observability',
        topics: [
          'IAM least-privilege pass + KMS rotation',
          'GuardDuty + Security Hub + Macie',
          'CloudWatch dashboards · alarms wired to SNS',
        ],
      },
      {
        week: 6,
        title: 'Compliance, FinOps, Capstone Showcase',
        topics: [
          'Cost Explorer + tagging + right-sizing',
          'RBI cloud guidelines · DPDP · SOC2 awareness',
          'Capstone showcase to panel + AWS SAA-C03 exam strategy',
        ],
      },
    ],
    pricing: [
      { region: 'India', currency: 'INR', price: 30000, note: 'Founding cohort ₹22,000 (first 20 seats)' },
      { region: 'Middle East', currency: 'USD', price: 700 },
      { region: 'US/EU (online + mentor)', currency: 'USD', price: 1600 },
    ],
    instructors: [
      {
        name: 'Manan Jindal',
        title: 'Lead Trainer',
        company: 'pTeachTech · Pernicia (Canada)',
        linkedin: 'https://linkedin.com/in/manan-jindal',
      },
    ],
    faqs: [
      {
        question: 'Do I need prior cloud experience?',
        answer:
          'No prior AWS account or certification needed. We create Free Tier accounts in Week 1. You should have Linux command-line comfort, basic networking knowledge, and Git fluency.',
      },
      {
        question: 'Will this prepare me for AWS SAA-C03 certification?',
        answer:
          'Yes. The curriculum aligns with AWS Solutions Architect Associate exam objectives. You sit the exam separately (~$150 fee) — we don\'t charge for it.',
      },
      {
        question: 'Are AWS credits provided?',
        answer:
          'Yes. We provide AWS credits (or guide you through AWS Activate eligibility) so you can practice hands-on labs without cost concerns. Per-candidate budget ceiling: $50.',
      },
      {
        question: 'Does this cover Azure or GCP?',
        answer:
          'No. This is the AWS cohort by design. Multi-cloud (AWS + Azure) is covered in our Combined Cohort (AI Deployment on AWS + Azure).',
      },
      {
        question: 'How is this different from other AWS courses?',
        answer:
          'We focus on production engineering — Terraform, CI/CD, security hardening, observability. The capstone is a real reference architecture, not slides. You walk out with a defensible portfolio repo.',
      },
    ],
    outcomes: [
      'Deploy 1 production-grade multi-AZ AWS reference architecture',
      'Ship a polished GitHub repo with IaC + CI/CD + observability',
      'Earn the pTeachTech AWS Cloud-DevSecOps Certificate',
      'AWS Solutions Architect Associate (SAA-C03) readiness',
      '60-day post-cohort placement support',
    ],
    prerequisites: [
      'Linux command-line comfort',
      'Basic networking knowledge (TCP/IP, DNS, HTTP)',
      'Git + GitHub fluency',
      'Comfort with one programming language (Python or bash for scripting)',
      '8–10 hrs/week of out-of-class time',
    ],
  },

  // ============================================================
  // COHORT 3: AI Deployment on AWS + Azure (Combined)
  // ============================================================
  {
    id: 'ai-deployment',
    slug: 'ai-deployment',
    hidden: true,
    name: 'AI Deployment on AWS + Azure',
    tagline: 'From cohort to production. From training to placement.',
    description:
      'A two-tier selection-gated cohort. Tier 1 (open, 2 weeks): deploy an AI service on AWS or Azure. Tier 2 (selected, additional 2 weeks): multi-cloud production deployment with full observability — AND introductions to our placement partners.',
    icon: 'rocket',
    color: 'primary',
    duration: '2 weeks (Tier 1) + 2 weeks (Tier 2, selection-gated)',
    startDate: 'November 2, 2026',
    totalSeats: 25,
    availableSeats: 25,
    status: 'upcoming',
    highlights: [
      'Tier 1 ₹15,000 · Tier 2 +₹10,000 (selection-gated)',
      'Top performers get partner interview introductions (commission-based)',
      'Production-grade observability across AWS + Azure',
      'Prerequisite: Cohort 1 or 2 graduate, OR pass entry assessment',
    ],
    curriculum: [
      {
        week: 1,
        title: 'AWS Deployment Track (Tier 1)',
        topics: [
          'AWS Bedrock + IAM scaffold',
          'Lambda + API Gateway for AI inference',
          'ECS Fargate as alternative for higher throughput',
          'CloudWatch monitoring + Secrets Manager',
        ],
      },
      {
        week: 2,
        title: 'Azure Deployment Track + Tier 1 Capstone (Tier 1)',
        topics: [
          'Azure OpenAI Service deployments + content filters',
          'App Service / Container Apps + Application Insights',
          'Key Vault + Managed Identity',
          'Day 10: Capstone presentation + selection evaluation',
        ],
      },
      {
        week: 3,
        title: 'Multi-Cloud Production Patterns (Tier 2)',
        topics: [
          'Active-passive + blue-green deployments across clouds',
          'Unified observability (Langfuse + CloudWatch + App Insights)',
          'FinOps for AI: PTU vs on-demand · prompt caching · batch APIs',
          'Multi-region failover + disaster recovery',
        ],
      },
      {
        week: 4,
        title: 'Production Hardening + Placement (Tier 2)',
        topics: [
          'Least-privilege IAM · PrivateLink · secret rotation',
          'Load testing + autoscaling · CI/CD for AI',
          'Mock interviews with industry guests',
          'Demo Day + placement partner interview scheduling',
        ],
      },
    ],
    pricing: [
      { region: 'India · Tier 1', currency: 'INR', price: 15000 },
      { region: 'India · Tier 2 (selected)', currency: 'INR', price: 10000, note: 'Free in Model B (Y2+, once 2 partners signed)' },
      { region: 'Middle East · Tier 1', currency: 'USD', price: 400 },
      { region: 'Middle East · Tier 2 (selected)', currency: 'USD', price: 250 },
    ],
    instructors: [
      {
        name: 'Manan Jindal',
        title: 'Lead Trainer',
        company: 'pTeachTech · Pernicia (Canada)',
        linkedin: 'https://linkedin.com/in/manan-jindal',
      },
    ],
    faqs: [
      {
        question: 'How does the Tier 2 selection work?',
        answer:
          'At end of Tier 1 (Day 10), candidates are evaluated: Tier 1 capstone (40%), attendance + engagement (20%), peer review (10%), 30-min technical interview (30%). Anyone scoring ≥75% advances. Top performers get partner interviews scheduled in Week 4.',
      },
      {
        question: 'What if I don\'t make Tier 2?',
        answer:
          'You graduate with the Tier 1 certificate, get 1:1 feedback on areas to strengthen, and are eligible for a free re-attempt of the Tier 2 evaluation in the next batch.',
      },
      {
        question: 'Is placement guaranteed for Tier 2 graduates?',
        answer:
          'No. We guarantee placement-partner introductions, not jobs. Each Tier 2 graduate gets 2–3 partner interviews within 30 days of cohort completion. The interview outcome is between you and the partner.',
      },
      {
        question: 'Do I need to know both AWS and Azure already?',
        answer:
          'No. We teach AWS in Tier 1 Week 1 and Azure in Week 2. The prerequisite is comfort with one cloud (covered by our AI Engineering or AWS Cohorts) plus knowledge of how an AI service works (covered by AI Engineering Cohort).',
      },
      {
        question: 'When does pricing switch to Model B (free Tier 2)?',
        answer:
          'Once we have 2 placement partners signed (target: end of Y1, mid-2027), Tier 2 becomes free for selected graduates and the placement commission funds the program.',
      },
    ],
    outcomes: [
      'Tier 1: Deploy 1 AI service on AWS or Azure (your choice)',
      'Tier 2 (if selected): Deploy multi-cloud with production observability',
      'Tier 2 (if selected): Direct introductions to 2–3 vetted placement partners',
      'pTeachTech Production AI Engineer Credential (Tier 2)',
      'Portfolio repo with deployed multi-cloud capstone',
    ],
    prerequisites: [
      'Completed AI Engineering Cohort (1) OR AWS Cloud Cohort (2)',
      'OR pass our entry assessment (5 questions, 30 min)',
      'Working knowledge of containers + cloud IAM',
      '8–10 hrs/week for the 2 weeks (Tier 1); 10–12 hrs/week if selected for Tier 2',
    ],
  },
]

/** Public, visible cohorts. Hidden ones stay in `allCohorts` for future re-enable. */
export const cohorts: Cohort[] = allCohorts.filter((c) => !c.hidden)

export function getCohortBySlug(slug: string): Cohort | undefined {
  return cohorts.find((c) => c.slug === slug)
}

export function getOpenCohorts(): Cohort[] {
  return cohorts.filter((c) => c.status === 'open' || c.status === 'upcoming')
}

/**
 * Returns pricing tiers that should be displayed publicly on the website.
 *
 * Currently India-only. Middle East and US/EU pricing is intentionally hidden
 * on the public site — prospects in those regions are routed to an Instructor call
 * via /contact, where pricing is discussed directly.
 *
 * Non-India pricing remains in the cohort definitions for internal reference
 * (placement planning, internal financial modelling, future surfacing decisions).
 */
export function getDisplayPricing(cohort: Cohort): PricingTier[] {
  return cohort.pricing.filter((tier) => tier.region.startsWith('India'))
}
