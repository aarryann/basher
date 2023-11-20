# Basher

## Regenerate tailwind

npx tailwindcss -i ./main.css -o ./public/tailwind.css
or
npx tailwindcss -i ./main.css -o ./public/tailwind.min.css --minify

## Auto start

pm2 start ~/apps/basher/server.js --watch

## Watcher

Maximum number of watchers configured in system: $sudo sysctl fs.inotify
Maximum number of watchers in use: $lsof | grep inotify | wc -l
PIDs using the watchers: $for foo in /proc/_/fd/_; do readlink -f $foo; done | grep inotify | sort | uniq -c | sort -nr
Find program based on PID: ps -p 967 -o comm=
