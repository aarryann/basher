import { dashboard, card } from './main.mjs';

document.addEventListener('alpine:init', () => {
  Alpine.data('dashboard', dashboard);
  Alpine.data('card', card);
});
