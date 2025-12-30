# --- STAGE 1: Install Dependencies ---
# Kita gunakan node versi alpine agar ringan
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package.json dan package-lock.json lebih dulu
# Tujuannya agar Docker bisa cache layer ini jika tidak ada perubahan dependency
COPY package.json package-lock.json* ./

# Install dependency (npm ci lebih cepat & stabil untuk CI/CD daripada npm install)
RUN npm ci

# --- STAGE 2: Build Aplikasi ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency dari stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy seluruh kode sumber Next.js Anda
COPY . .

# Matikan telemetry Next.js (opsional, biar tidak kirim data ke Vercel)
ENV NEXT_TELEMETRY_DISABLED 1

# Perintah BUILD
# Ini akan menghasilkan folder .next/standalone karena kita sudah setting output: 'standalone'
RUN npm run build

# --- STAGE 3: Production Runner (Image Akhir) ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Buat user sistem baru agar tidak menjalankan aplikasi sebagai root (Demi Keamanan)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy folder public (gambar/aset)
COPY --from=builder /app/public ./public

# Copy hasil build STANDALONE (Ini bagian paling penting)
# Kita otomatis set permission file ke user 'nextjs'
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ganti user ke nextjs
USER nextjs

# Buka port 3000
EXPOSE 3000
ENV PORT 3000

# Jalankan server (Bukan npm start, tapi node server.js karena mode standalone)
CMD ["node", "server.js"]