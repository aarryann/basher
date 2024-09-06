import { dashboard } from './main.mjs';

document.addEventListener('alpine:init', () => {
  Alpine.data('dashboard', dashboard);
});
