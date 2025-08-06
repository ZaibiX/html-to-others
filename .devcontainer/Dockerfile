# 1. Use official Node.js base image
FROM node:20-bullseye

# 2. Install Pandoc and dependencies
RUN apt-get update && \
    apt-get install -y pandoc && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Set user to non-root 'node'
USER node

# 4. Set working directory
WORKDIR /workspace

# 5. Copy package files and install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# 6. Copy rest of the source code
COPY --chown=node:node . .

# 7. Expose app port
EXPOSE 3000

# 8. Start dev server by default
CMD ["npm", "run", "dev"]