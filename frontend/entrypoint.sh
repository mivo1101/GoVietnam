#!/bin/sh
# entrypoint.sh

# Replace placeholders in main.js with env vars
sed -i "s|_USER_API_URL_|$USER_API_BASE_URL|g" /usr/share/nginx/html/main.js
sed -i "s|_SONG_API_URL_|$SONG_API_BASE_URL|g" /usr/share/nginx/html/main.js
sed -i "s|_PLAYLIST_API_URL_|$PLAYLIST_API_BASE_URL|g" /usr/share/nginx/html/main.js

# Start nginx
nginx -g "daemon off;"