import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Tag, 
  Terminal, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { LetterReveal, WordReveal } from '../components/LetterReveal';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  summary: string;
  highlights: string[];
  snippet?: string;
  snippetLanguage?: string;
}

const ARTICLES: BlogPost[] = [
  {
    id: 'offline-first-indexeddb-sync',
    title: 'Architecting Offline-First Synchronization with Dexie.js & IndexedDB',
    subtitle: 'Building resilient web architectures that withstand spotty networks with local queues and background outbox reconciliation.',
    date: 'February 2025',
    readTime: '6 min read',
    category: 'Distributed Systems',
    tags: ['IndexedDB', 'Dexie.js', 'MongoDB', 'Architecture'],
    summary: 'When designing collaboration platforms like DecisionVault, network fragility cannot disrupt user workflows. By decoupling the presentation layer from the network and persisting mutative actions locally in IndexedDB first, we achieve zero-latency UI updates paired with an auto-reconciling background outbox queue.',
    highlights: [
      'Transactional client persistence using Dexie.js for deterministic state saves',
      'Outbox pattern queuing offline mutation operations with exponential backoff retries',
      'Bi-directional reconciliation resolving conflicting timestamps when re-establishing connectivity',
      'Zero-data-loss guarantees during unexpected browser crashes or tab closures'
    ],
    snippetLanguage: 'typescript',
    snippet: `// Client-Side Outbox Mutation Dispatcher
export async function queueDecisionMutation(mutation: DecisionMutation) {
  await db.transaction('rw', db.decisions, db.outbox, async () => {
    // 1. Optimistic write to client-local storage
    await db.decisions.put(mutation.payload);

    // 2. Enqueue in persistent outbox with monotonically increasing sequence ID
    await db.outbox.add({
      id: crypto.randomUUID(),
      entityId: mutation.payload.id,
      action: mutation.type,
      timestamp: Date.now(),
      status: 'pending'
    });
  });

  // 3. Trigger reconciliation if online
  if (navigator.onLine) {
    await processOutboxQueue();
  }
}`
  },
  {
    id: 'sub-40ms-websocket-token-streaming',
    title: 'Real-Time Sub-40ms First-Token Streaming with WebSockets & Python FastAPI',
    subtitle: 'Optimizing asynchronous event loops and chunked buffer flushing for high-throughput AI chat applications.',
    date: 'January 2025',
    readTime: '5 min read',
    category: 'Real-Time Systems',
    tags: ['WebSockets', 'Python', 'FastAPI', 'Token Streaming'],
    summary: 'Traditional HTTP Server-Sent Events (SSE) introduce recurring handshakes and header overhead. For QueryMind, we engineered a persistent bi-directional WebSocket duplexing layer that yields sub-40ms time-to-first-token (TTFT) by streaming token batches directly from Gemini API asynchronous iterators to the Flutter/React clients.',
    highlights: [
      'Asynchronous generator yielding streamed chunks with zero intermediate serialization latency',
      'Heartbeat keep-alive pings detecting zombie TCP sockets within 1.5 seconds',
      'Backpressure-aware chunking to prevent mobile UI thread lockup on high-speed LLM generation',
      'Graceful fallbacks from native WebSockets to long-polling under restrictive enterprise firewalls'
    ],
    snippetLanguage: 'python',
    snippet: `# Python FastAPI WebSocket Streaming Consumer
@router.websocket("/stream/query")
async def websocket_query_stream(websocket: WebSocket, session_id: str):
    await websocket.accept()
    try:
        while True:
            payload = await websocket.receive_json()
            query_text = payload.get("query")
            
            # Initiate asynchronous streaming from generative model
            async for chunk in generate_stream_tokens(query_text):
                await websocket.send_json({
                    "type": "token_chunk",
                    "delta": chunk.text,
                    "timestamp": time.time_ns()
                })
    except WebSocketDisconnect:
        logger.info(f"Client disconnected: {session_id}")`
  },
  {
    id: 'grounded-rag-hybrid-search',
    title: 'Eliminating Hallucinations: Grounded RAG with Live Web Discovery',
    subtitle: 'Fusing curated vector retrieval with live search APIs for verifiable, zero-hallucination agent responses.',
    date: 'December 2024',
    readTime: '7 min read',
    category: 'AI & Retrieval',
    tags: ['RAG', 'Vector Search', 'Tavily API', 'LLMs'],
    summary: 'Static retrieval pipelines fall short when users query breaking news, dynamic docs, or live API schemas. We built a dual-phase grounding engine that cross-references static vector embeddings with Tavily Search API live web fetches before passing contextual evidence chunks into generative prompts with strict citation anchors.',
    highlights: [
      'Dual-phase retrieval: Local document embeddings + dynamic live search query synthesis',
      'Reranking retrieved candidate chunks using cosine similarity and domain authority scoring',
      'Citation grounding ensuring every generated assertion points back to an indexed URL or page',
      'Defensive guardrails terminating synthesis when contradictory evidence is detected'
    ],
    snippetLanguage: 'typescript',
    snippet: `// Grounded Evidence Aggregator
export async function synthesizeGroundedContext(query: string) {
  const [vectorDocs, liveWebResults] = await Promise.all([
    queryVectorStore(query, { topK: 4 }),
    fetchLiveWebGrounding(query, { maxResults: 3 })
  ]);

  const mergedEvidence = deduplicateAndRerank([
    ...vectorDocs.map(d => ({ text: d.content, source: d.metadata.source })),
    ...liveWebResults.map(r => ({ text: r.snippet, source: r.url }))
  ]);

  return buildPromptWithCitations(query, mergedEvidence);
}`
  }
];

interface BlogsPageProps {
  onBack: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ 
  onBack, 
  onNavigateToProjects,
  onNavigateToContact 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const categories = ['All', 'Distributed Systems', 'Real-Time Systems', 'AI & Retrieval'];

  const filteredArticles = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <article className="pt-24 sm:pt-28 pb-12 space-y-12">
      {/* Top Return Breadcrumb */}
      <div className="flex items-center justify-between border-b border-border-main pb-4 animate-hero-fade-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-bg-hover"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
        <span className="hidden sm:inline-block text-[11px] font-mono text-text-muted">
          Press <kbd className="px-1.5 py-0.5 rounded border border-border-main bg-bg-main text-[10px]">Esc</kbd> to return
        </span>
      </div>

      {/* Page Header */}
      <header className="space-y-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-main bg-panel-bg text-xs font-mono text-text-secondary animate-hero-badge" style={{ animationDelay: '200ms' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Technical Dispatches & Architectural Notes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-[1.12]">
            <LetterReveal text="Engineering Blogs" isActive={true} baseDelay={240} staggerMs={24} />
          </h1>
        </div>

        <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-3xl">
          <WordReveal 
            text="Deep-dives into offline-first state synchronization, low-latency WebSocket token streaming, grounded RAG architectures, and full-stack software resilience."
            baseDelay={500}
            staggerMs={24}
          />
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2.5 border-b border-border-main pb-4 animate-hero-fade-up" style={{ animationDelay: '820ms' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-text-primary text-bg-main font-semibold shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-panel-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Feed */}
      <div className="space-y-8">
        {filteredArticles.map((article, idx) => (
          <section
            key={article.id}
            className="p-6 sm:p-8 rounded-2xl border border-border-main bg-panel-bg space-y-6 shadow-xs animate-hero-card"
            style={{ animationDelay: `${980 + idx * 140}ms` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-mono text-text-muted">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Tag className="w-4 h-4" />
                <span>{article.category}</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary font-display leading-snug">
                {article.title}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-mono leading-relaxed">
                {article.subtitle}
              </p>
            </div>

            <p className="text-[15px] sm:text-base text-text-secondary font-sans leading-relaxed">
              {article.summary}
            </p>

            {/* Architectural Highlights */}
            <div className="p-4 sm:p-5 rounded-xl border border-border-subtle bg-bg-main space-y-2.5">
              <div className="text-xs sm:text-sm font-mono text-text-primary font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Core Architectural Principles</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm font-mono text-text-secondary leading-relaxed">
                {article.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Snippet Demonstration */}
            {article.snippet && (
              <div className="rounded-xl border border-border-main bg-bg-main overflow-hidden text-xs sm:text-sm font-mono shadow-xs">
                <div className="px-4 py-2.5 border-b border-border-main bg-panel-bg flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-2 font-medium text-text-primary">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span>Reference Architecture ({article.snippetLanguage})</span>
                  </span>
                  <span>Production Pattern</span>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] font-mono text-text-secondary leading-relaxed">
                  <code>{article.snippet}</code>
                </pre>
              </div>
            )}

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full border border-border-subtle bg-bg-main text-xs font-mono text-text-secondary"
                >
                  #{t}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Return Callout */}
      <div className="pt-6 border-t border-border-main flex flex-col sm:flex-row items-center justify-between gap-4 animate-hero-fade-up" style={{ animationDelay: '1450ms' }}>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to main portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          {onNavigateToProjects && (
            <button
              onClick={onNavigateToProjects}
              className="text-xs font-mono text-text-secondary hover:text-text-primary underline underline-offset-4 cursor-pointer"
            >
              Explore Projects
            </button>
          )}
          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="text-xs font-mono text-text-secondary hover:text-text-primary underline underline-offset-4 cursor-pointer"
            >
              Reach Out
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
