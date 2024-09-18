export const dashboard = () => ({
  modalVisible: false,
  modalContent: '',
  theme: 'dark',
  locked: true,
  lockClass: null,
  widgets: [],
  searchQuery: '',
  displayMessage: null,
  messageTimeout: null,
  lockTimeout: null,
  runFormId: null,

  async init() {
    try {
      const response = await fetch('/api/commands');
      this.widgets = await response.json();
      this.applyTheme();
    } catch (error) {
      console.error('Failed to load config.json:', error);
      this.showMessage(`Failed to load widgets. Please try again later.`);
    }
  },

  get filteredWidgets() {
    if (!this.searchQuery) {
      return this.widgets;
    }
    return this.widgets.filter(widget =>
      widget.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      widget.icon.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  },

  hideMessage() {
    this.displayMessage = null;
  },

  isMessageDisplayHidden() {
    return !(this.displayMessage && this.displayMessage.length > 0);
  },

  isFormSelected() {
    return !this.runFormId;
  },

  closeModal() {
    this.modalVisible = false;
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  },

  toggleLock() {
    this.locked = !this.locked;
    if (this.locked) {
      clearTimeout(this.lockTimeout);
      this.lockTimeout = setTimeout(() => {
        this.locked = false;
      }, 600000);

    }
  },

  applyTheme() {
    if (this.theme === 'dark') {
      document.body.classList.remove('bg-white', 'text-gray-900');
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.body.classList.remove('bg-gray-900', 'text-white');
      document.body.classList.add('bg-white', 'text-gray-900');
    }
  },

  lockClass() {
    if (this.locked) return `fas fa-lock`;
    else return `fas fa-lock-open`;

  },

  showMessage(message) {
    this.displayMessage = message;
    clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => {
      this.displayMessage = null;
    }, 5000);
  }
})
