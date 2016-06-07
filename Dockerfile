# Use minimal nginx build for faster download
FROM nginx:alpine

MAINTAINER Maciej Gołaszewski <jodator@gmail.com>

# Copy CKEditor 5 bundle scripts
COPY bundle/ckeditor.js /data/public/js/ckeditor.js
COPY bundle/ckeditor.css /data/public/css/ckeditor.css

# Copy demo page
COPY docker/index.html /data/public/index.html

# Copy nginx configuration
COPY docker/ckeditor-demo.nginx /etc/nginx/nginx.conf
