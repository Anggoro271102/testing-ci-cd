# --- STAGE 1: Install Dependencies ---
# GANTI ke node:20-alpine (Wajib untuk Next.js terbaru)
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package.json package-lock.json* ./

# Install dependency
RUN npm ci

# --- STAGE 2: Build Aplikasi ---
# GANTI ke node:20-alpine
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Gunakan format key=value (Fix Warning)
ENV NEXT_TELEMETRY_DISABLED=1

# Perintah BUILD
RUN npm run build

# --- STAGE 3: Production Runner ---
# GANTI ke node:20-alpine
FROM node:20-alpine AS runner
WORKDIR /app

# Gunakan format key=value (Fix Warning)
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Buat user sistem baru demi keamanan
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy folder public
COPY --from=builder /app/public ./public

# Copy hasil build STANDALONE
# Pastikan folder .next/standalone/public dan .next/static ada
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ganti user
USER nextjs

# Buka port 3000
EXPOSE 3000
ENV PORT=3000

# Jalankan server
CMD ["node", "server.js"]