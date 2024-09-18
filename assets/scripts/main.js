//import { card } from './main.mjs';
import { dashboard } from './dash/dashboard.mjs';
import { card } from './dash/card.mjs';
import { runform } from './dash/runform.mjs';

document.addEventListener('alpine:init', () => {
  Alpine.data('dashboard', dashboard);
  Alpine.data('card', card);
  Alpine.data('runform', runform);
});
