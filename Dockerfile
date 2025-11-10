# -------- Stage 1: Build frontend --------
FROM node:18-alpine AS builder

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ lock file
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# สร้าง build
RUN npm run build


# -------- Stage 2: Serve with nginx --------
FROM nginx:stable-alpine

# ลบ config เดิมของ nginx (เพื่อป้องกัน SSL error)
RUN rm /etc/nginx/conf.d/default.conf

# คัดลอก config ใหม่ (ไม่มี SSL)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# คัดลอกไฟล์ build จาก stage ก่อนหน้า
COPY --from=builder /app/dist /usr/share/nginx/html

# เปิด port 80 (ภายใน container)
EXPOSE 80

# สั่งให้ nginx รัน
CMD ["nginx", "-g", "daemon off;"]
