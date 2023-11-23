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

## Theme System [code - description - details - uses]
- tao (code)
  - Tailwind & Alpine as main frameworks (description)
  - Includes tailwind, fortawesome, alpinejs (details)
  - app shell framework (uses)
- api 
  - API documentation format 
  - All menus on left, all content on right, search on top
  - blogs, documentation, lms

## Commit
git add . && git commit -m "updates" && git push

## To do
- Convert all app to webcomponents
- User Nginx and express
- Certbot acme lets encrypt
- Load webcomponents to bit
- Create nodejs app for wol
- install casabre in k8
- alpinex dockerize
- install alpinex in k8
- install airflow, kafka, Flink in k8
- FPDS pipeline into broker
- broker into flink to godb
- import sam org into godb
- daily award feed
- basic org search in alpinex
- usaspening like search in alpinex
- Award history in opp details
- Implement bit
- Implement storybook
- SSL in app - not required as SSL termination will be done in Ingress
