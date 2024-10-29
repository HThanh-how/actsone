# Sử dụng Node.js làm hình ảnh cơ sở
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc với legacy-peer-deps
RUN npm install --legacy-peer-deps

# Sao chép toàn bộ mã nguồn vào hình ảnh
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
