# --- STAGE 1: Install Dependencies ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- STAGE 2: Build Project ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Perintah build Next.js
RUN npm run build

# --- STAGE 3: Production Runner ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Buat user keamanan
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy hasil build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Next.js jalan di Port 3000
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]