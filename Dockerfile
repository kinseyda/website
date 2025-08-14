FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Install LaTeX (texlive) for PDF compilation
RUN apt-get update && apt-get install -y texlive-latex-recommended \
	texlive-fonts-recommended \
	texlive-fonts-extra 

# Compile resume.tex to resume.pdf
RUN pdflatex --output-directory=src/resume src/resume/resume.tex
# Move the generated PDF to the public directory
RUN mkdir -p public && mv src/resume/resume.pdf public/resume.pdf

RUN npm run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080