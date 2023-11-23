import { html } from '../../utils/htmlutils';

/**
 * Usage: <site-header x-data="{sitename:'...'}></site-header>
 */
if (typeof window !== 'undefined') {
  const contentTemplate = document.createElement('template');

  // eslint-disable-next-line
  contentTemplate.innerHTML = html`
  <link rel="stylesheet" href="/tailwind.min.css" />
  <header class="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
  <div
    class="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
    <div class="hidden lg:flex">
      <h1 id="h1" class="text-xl font-bold" x-text="sitename"></h1>
    </div>
    <div
      class="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80 bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
      style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2">
      <div class="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
      <div class="hidden lg:block lg:max-w-md lg:flex-auto">
        <div class="hidden lg:flex">
          <input name="sitesearch" type="text" placeholder="Find something..."
            class="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-5 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex">
          <button class="relative inline-block align-middle" style="right: 35px">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="inline-block h-5 w-5 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-5 lg:hidden">
        <button type="button"
          class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
          aria-label="Toggle navigation">
          <svg viewBox="0 0 10 9" fill="none" stroke-linecap="round" aria-hidden="true"
            class="w-2.5 stroke-zinc-900 dark:stroke-white">
            <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
          </svg>
        </button>
        <h1 class="text-xl font-bold" x-text="sitename"></h1>
      </div>
      <div class="flex items-center gap-5">
        <nav class="hidden md:block">
          <ul role="list" class="flex items-center gap-8">
            <li>
              <a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="/">API</a>
            </li>
            <li>
              <a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="#">Documentation</a>
            </li>
            <li>
              <a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="#">Support</a>
            </li>
          </ul>
        </nav>
        <div class="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
        <div class="flex gap-4">
          <div class="contents lg:hidden">
            <button type="button"
              class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none dark:hover:bg-white/5 lg:hidden"
              aria-label="Find something...">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"
                class="h-5 w-5 stroke-zinc-900 dark:stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path>
              </svg>
            </button>
          </div>
          <button type="button"
            class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            aria-label="Toggle theme">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-zinc-900 dark:hidden">
              <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
              <path stroke-linecap="round"
                d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707">
              </path>
            </svg><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"
              class="hidden h-5 w-5 stroke-white dark:block">
              <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"></path>
            </svg>
          </button>
        </div>
        <div class="hidden min-[416px]:contents">
          <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
            href="#">Sign in</a>
        </div>
      </div>
    </div>
    <nav class="hidden lg:mt-10 lg:block">
      <ul role="list">
        <li class="md:hidden">
          <a class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            href="/">API</a>
        </li>
        <li class="md:hidden">
          <a class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            href="#">Documentation</a>
        </li>
        <li class="md:hidden">
          <a class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            href="#">Support</a>
        </li>
        <li class="relative mt-6">
          <h2 class="text-xs font-semibold text-zinc-900 dark:text-white">
            Resources
          </h2>
          <div class="relative mt-3 pl-2">
            <div class="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
            <ul role="list" class="border-l border-transparent">
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/contacts"><span class="truncate">Datacenter Automation</span>
                </a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/conversations"><span class="truncate">Home Automation</span>
                </a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/messages"><span class="truncate">Accelor Automation</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/groups"><span class="truncate">BD Automation</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/attachments"><span class="truncate">Home Media Server</span></a>
              </li>
            </ul>
          </div>
        </li>
        <li class="relative mt-6 md:mt-0">
          <h2 class="text-xs font-semibold text-zinc-900 dark:text-white">
            Guides
          </h2>
          <div class="relative mt-3 pl-2">
            <div class="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5" style="
                  border-radius: 8px;
                  height: 32px;
                  top: 0;
                  opacity: 0;
                "></div>
            <div class="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
            <div class="absolute left-2 h-6 w-px bg-emerald-500" style="top: 4px; opacity: 1"></div>
            <ul role="list" class="border-l border-transparent">
              <li class="relative">
                <a aria-current="page"
                  class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-900 dark:text-white"
                  href="/"><span class="truncate">Introduction</span></a>
                <ul role="list" style="opacity: 1">
                  <li>
                    <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href="/#guides"><span class="truncate">Guides</span></a>
                  </li>
                  <li>
                    <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href="/#resources"><span class="truncate">Resources</span></a>
                  </li>
                </ul>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/quickstart"><span class="truncate">Quickstart</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/sdks"><span class="truncate">Wiki</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/authentication"><span class="truncate">Go</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/pagination"><span class="truncate">Trading</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/errors"><span class="truncate">Investment</span></a>
              </li>
              <li class="relative">
                <a class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/webhooks"><span class="truncate">In my absence</span></a>
              </li>
            </ul>
          </div>
        </li>
        <li class="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 w-full"
            href="#">Sign in</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
`;

  class SiteHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
      const shadowRoot = this.shadowRoot;
      const node = document.importNode(contentTemplate.content, true);
      shadowRoot.appendChild(node);
      document.addEventListener(
        'alpine:initialized',
        () => Alpine.initTree(shadowRoot)
      )
    }
  }

  customElements.define('site-header', SiteHeader);

}