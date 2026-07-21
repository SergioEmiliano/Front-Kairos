# syntax=docker/dockerfile:1
# Kairós — frontend (Next.js 14.2.35) — build multi-stage.
# Stages: deps -> builder -> runner (PROD, default). Stage `dev` para hot-reload local.

ARG NODE_VERSION=20-alpine

# --- deps: instala dependências (cacheável) -------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
# libc6-compat: alguns binários nativos do ecossistema Next esperam glibc no Alpine.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# --- builder: gera o build standalone -------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Garante que /app/public exista mesmo que o repo não tenha assets estáticos,
# para o COPY do stage runner não quebrar.
RUN mkdir -p public
# NEXT_PUBLIC_* são inlinados em build-time no bundle do client — passe via build-arg.
ARG NEXT_PUBLIC_USE_MOCK
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_LANDING_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- runner: imagem PROD final (só o necessário para rodar) ---------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Usuário não-root.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
# Output standalone: server.js + node_modules mínimo, assets estáticos e /public.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# --- dev: hot-reload local (usado pelo docker-compose.dev.yml) ------------
FROM node:${NODE_VERSION} AS dev
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
