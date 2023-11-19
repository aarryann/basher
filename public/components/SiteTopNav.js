import { html } from '../utils/htmlutils.js';

/**
 * Usage: <site-top-nav x-data="{sitename:'...'}></site-top-nav>
 */
if (typeof window !== 'undefined') {
  const contentTemplate = document.createElement('template');

  // eslint-disable-next-line
  contentTemplate.innerHTML = html`
  <header class="fixed bg-indigo-600 p-4 text-white text-center">
    <h1 class="text-3xl font-bold text-center" x-text="sitename"></h1>
    <div class="container pt-4 mx-auto">
      <div>
        <a class="mr-2 py-2 px-4 shadow text-center hover:bg-indigo-100 hover:shadow-lg hover:rounded transition duration-150 ease-in-out transform hover:scale-105" href="/dash">Dash</a>
        <a class="m-2 py-2 px-4 shadow text-center hover:bg-indigo-100 hover:shadow-lg hover:rounded transition duration-150 ease-in-out transform hover:scale-105" href="/commands">Edit commands</a>
        <a class="m-2 py-2 px-4 shadow text-center hover:bg-indigo-100 hover:shadow-lg hover:rounded transition duration-150 ease-in-out transform hover:scale-105" href="/settings">Settings</a>
        <a class="m-2 py-2 px-4 shadow text-center hover:bg-indigo-100 hover:shadow-lg hover:rounded transition duration-150 ease-in-out transform hover:scale-105" href="/logs">View Logs</a>
        <a class="m-2 py-2 px-4 shadow text-center hover:bg-indigo-100 hover:shadow-lg hover:rounded transition duration-150 ease-in-out transform hover:scale-105" href="/queue">Job queues</a>
      </div>
    </div>
  </header>
  `;

  class SiteTopNav extends HTMLElement {
    constructor() {
      super();
    }

    async connectedCallback() {
      const node = document.importNode(contentTemplate.content, true);
      this.appendChild(node);
    }
  }

  customElements.define('site-top-nav', SiteTopNav);

}
