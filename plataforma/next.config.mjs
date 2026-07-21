/** @type {import('next').NextConfig} */
const API_URL = process.env.KAIROS_API_URL ?? "http://localhost:8000";

const nextConfig = {
  // Standalone build: gera .next/standalone com server.js e só as deps usadas,
  // consumido pelo stage runner do Dockerfile (imagem prod enxuta).
  output: "standalone",

  // Proxy transparente: /api/* → backend /api/v1/*
  // Em prod, KAIROS_API_URL aponta para o container/serviço da API.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
