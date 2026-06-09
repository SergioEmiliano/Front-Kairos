"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react";
import { X, Send, Sparkles, RotateCcw } from "lucide-react";
import { ChatMessage, MessageRole } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * AIAnalystService interface — ready for real AI backend integration.
 *
 * Future implementation:
 *   - Replace `mockSendMessage` with POST /api/analyst/chat
 *   - Use ReadableStream for SSE/streaming responses
 *   - Add message history (last N messages as context)
 *   - Add function calling for metrics lookup
 */
interface AIAnalystService {
  sendMessage(
    history: ChatMessage[],
    userMessage: string,
    onChunk?: (chunk: string) => void
  ): Promise<string>;
}

// ─── Mock service (replace with real API) ────────────────────────────────────

const MOCK_RESPONSES: string[] = [
  "Com base nas suas métricas de abril, o maior pico de alcance aconteceu às **terças e quintas**, entre 9h e 11h. Recomendo priorizar publicações nesses horários na próxima semana.",
  "Seus posts de **autoridade clínica** têm conversão 3× maior em DM do que os de conexão/bastidores. Isso indica que sua audiência já está qualificada — o próximo passo é aumentar a frequência de conteúdo técnico.",
  "A taxa de **DM → Agenda** de 32% está acima da média de médicas estéticas no Brasil (22%). Você pode melhorar ainda mais com um script de resposta mais consultivo nas primeiras 2 mensagens.",
  "Identifiquei que seus Reels com **hook de pergunta** nos primeiros 3 segundos têm retenção 40% maior. Sugiro aplicar esse padrão em pelo menos 3 posts na próxima semana.",
  "Seu **alcance caiu 18%** na semana de 21–27/abr. Analisando o histórico, semanas sem story diário têm esse padrão. Recomendo manter ao menos 1 story por dia, mesmo que simples.",
];

let mockIndex = 0;

async function mockSendMessage(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  history: ChatMessage[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userMessage: string
): Promise<string> {
  // Simulate network delay (replace with real streaming call)
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
  const response = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
  mockIndex++;
  return response;
}

const analystService: AIAnalystService = {
  sendMessage: mockSendMessage,
};

// ─── Initial greeting ─────────────────────────────────────────────────────────

const INITIAL_MESSAGE: ChatMessage = {
  id: "init",
  role: "assistant" as MessageRole,
  content:
    "Olá doutora 👋\nAnalisei suas métricas recentes e encontrei algumas oportunidades interessantes para melhorar seu alcance e conversão. Como posso te ajudar hoje?",
  timestamp: new Date(),
};

// ─── Suggested prompts ────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  "Qual o melhor horário para postar esta semana?",
  "Por que meu alcance caiu na última semana?",
  "Como aumentar minha taxa de conversão em DM?",
  "Qual pilar devo priorizar agora?",
];

// ─── MessageBubble ────────────────────────────────────────────────────────────

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  // Simple markdown-ish bold parser (**text**)
  const renderContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-medium" style={{ color: isUser ? "inherit" : "var(--ink)" }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2.5 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5"
          style={{
            borderColor: "color-mix(in oklch, var(--gold) 40%, transparent)",
            background: "color-mix(in oklch, var(--gold) 8%, transparent)",
          }}
        >
          <Sparkles
            className="h-3 w-3"
            style={{ color: "var(--gold-dark)" }}
          />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-[1.55]",
          isUser
            ? "rounded-tr-sm"
            : "rounded-tl-sm"
        )}
        style={
          isUser
            ? {
                background: "var(--ink)",
                color: "var(--paper)",
                borderRadius: "16px 4px 16px 16px",
              }
            : {
                background: "var(--paper-surface)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
                borderRadius: "4px 16px 16px 16px",
              }
        }
      >
        {/* Multi-line support */}
        {message.content.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-1" : ""}>
            {renderContent(line)}
          </p>
        ))}

        {/* Streaming indicator */}
        {message.isStreaming && (
          <span
            className="inline-block ml-1 w-1.5 h-3.5 rounded-sm animate-gold-pulse align-middle"
            style={{ background: "var(--gold)" }}
            aria-label="digitando"
          />
        )}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 animate-fade-in">
      <div
        className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center"
        style={{
          borderColor: "color-mix(in oklch, var(--gold) 40%, transparent)",
          background: "color-mix(in oklch, var(--gold) 8%, transparent)",
        }}
      >
        <Sparkles className="h-3 w-3" style={{ color: "var(--gold-dark)" }} />
      </div>
      <div
        className="px-4 py-3 flex items-center gap-1.5"
        style={{
          background: "var(--paper-surface)",
          border: "1px solid var(--line)",
          borderRadius: "4px 16px 16px 16px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-gold-pulse"
            style={{
              background: "var(--gold)",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── AIAnalystPanel ───────────────────────────────────────────────────────────

interface AIAnalystPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AIAnalystPanel({ open, onClose }: AIAnalystPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Replace with real streaming call when backend is ready
      const response = await analystService.sendMessage(messages, text);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Ocorreu um erro ao processar sua mensagem. Tente novamente.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleReset = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    mockIndex = 0;
  }, []);

  const handleSuggest = useCallback((prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Floating chat widget — rises from bottom-right */}
      <div
        className={cn(
          "fixed z-40 flex flex-col",
          "w-[380px]",
          "rounded-[var(--radius)] overflow-hidden",
          "card-surface",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        )}
        style={{
          bottom: "5.5rem",
          right: "1.5rem",
          height: 540,
          border: "1px solid var(--line)",
          boxShadow:
            "0 20px 60px -12px color-mix(in oklch, var(--ink) 22%, transparent), 0 4px 16px -4px color-mix(in oklch, var(--ink) 10%, transparent)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Assistente analista de métricas"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          className="px-5 py-4 border-b border-kairos-line flex items-start justify-between gap-3 shrink-0"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              style={{
                borderColor: "color-mix(in oklch, var(--gold) 40%, transparent)",
                background: "color-mix(in oklch, var(--gold) 8%, transparent)",
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: "var(--gold-dark)" }} />
            </div>
            <div>
              <p
                className="text-[14px] text-kairos-charcoal font-medium leading-none"
                style={{ letterSpacing: "-0.01em" }}
              >
                Analista Kairós
              </p>
              <p className="mono-label mt-0.5" style={{ fontSize: 9, color: "var(--gold-dark)" }}>
                ◆ IA · Métricas em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center text-kairos-stone hover:text-kairos-charcoal transition-colors"
              aria-label="Reiniciar conversa"
              title="Reiniciar conversa"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full border border-kairos-line hover:border-kairos-charcoal inline-flex items-center justify-center text-kairos-charcoal transition-colors"
              aria-label="Fechar analista"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ── Messages area ──────────────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto kairos-scroll px-5 py-5 flex flex-col gap-4"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          {/* Suggested prompts — show after initial message only */}
          {messages.length === 1 && !isLoading && (
            <div className="flex flex-col gap-2 mt-2 animate-fade-in">
              <span className="mono-label" style={{ fontSize: 9, color: "var(--mute)" }}>
                Perguntas frequentes
              </span>
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSuggest(prompt)}
                  className={cn(
                    "text-left text-[12px] text-kairos-charcoal px-3 py-2 rounded-xl border",
                    "hover:border-kairos-gold hover:bg-kairos-paper-warm/30",
                    "transition-all"
                  )}
                  style={{ borderColor: "var(--line)" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="hairline shrink-0" />

        {/* ── Input area ─────────────────────────────────────────────────── */}
        <div className="px-4 py-4 shrink-0">
          <div
            className="flex gap-2 items-end p-2 rounded-[var(--radius)] border transition-colors"
            style={{
              borderColor: "var(--line)",
              background: "var(--paper-surface)",
            }}
          >
            <label htmlFor={inputId} className="sr-only">
              Mensagem para o analista
            </label>
            <Textarea
              id={inputId}
              ref={inputRef}
              rows={1}
              placeholder="Pergunte sobre suas métricas…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className={cn(
                "flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 p-1",
                "text-[13px] min-h-[36px] max-h-[120px]",
                "placeholder:text-kairos-stone disabled:opacity-50"
              )}
              style={{ lineHeight: 1.5 }}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "shrink-0 w-8 h-8 rounded-full transition-opacity",
                !input.trim() && "opacity-40"
              )}
              aria-label="Enviar mensagem"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="mono-label text-center mt-2" style={{ fontSize: 8, color: "var(--mute)" }}>
            Enter para enviar · Shift+Enter para nova linha
          </p>
        </div>
      </div>
    </>
  );
}
