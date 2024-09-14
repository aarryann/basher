export const dashboard = () => ({
  modalVisible: false,
  modalContent: '',
  theme: 'dark',
  locked: true,
  widgets: [],
  searchQuery: '',
  displayMessage: null,

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

  closeModal() {
    this.modalVisible = false;
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  },

  toggleLock() {
    this.lock = !this.lock;
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

  showMessage(message) {
    this.displayMessage = message;
    setTimeout(() => {
      this.displayMessage = null;
    }, 3000);
  }
})

export const card = () => ({
  card: null,
  holdTimer: null,
  holdTriggered: false,
  touchHandled: false,
  countdownTimer: null,
  widgetClass: null,
  iconClass: '',
  downCount: null,
  title: '',
  logs: null,
  toggleState: 0,
  countdownCancelAction: false,

  async init() {
    this.card = this.$data.widget;
    this.downCount = null;
    this.widgetClass = `col-span-${this.card.colspan}`;
    this.iconClass = this.getIconClass(this.card.icon);
    this.title = this.card.title;
    this.updateCardState();
    setInterval(() => { this.updateCardState() }, 300000);
  },

  async updateCardState() {
    if (this.card.feedback && this.card.feedback.length > 0) {
      const feedbackStr = await this.getFeedback();
      this.toggleState = parseInt(feedbackStr.replace("\n", "")) || 0;
      this.updateTitleAndIcon();
    }
  },

  updateTitleAndIcon() {
    if (this.toggleState === 1) {
      this.title = this.card.title_1 || this.card.title;
      this.iconClass = this.getIconClass(this.card.icon_1) || this.getIconClass(this.card.icon);
    }
    else {
      this.title = this.card.title;
      this.iconClass = this.getIconClass(this.card.icon);
    }
  },

  getIconClass(icon) {
    return `fas fa-${icon} mb-1`;
  },

  async getFeedback() {
    if (!this.card.feedback || this.card.feedback.length === 0) return '0';

    try {
      const response = await fetch(`/api/commands/${this.card.id}/feedback`);
      const data = await response.json();
      return data.output;
    } catch (error) {
      console.error('Failed to get feedback:', error);
      return '0';
    }
  },

  async runCommand() {
    try {
      const endpoint = this.toggleState === 1 ? 'run/1' : 'run';
      const response = await fetch(`/api/commands/${this.card.id}/${endpoint}`);
      const data = await response.json();
      this.$dispatch('show-message', `${this.title} action completed`);
      setTimeout(() => { this.updateCardState() }, 30000);
      return data.output;
    } catch (error) {
      console.error('Failed to run command:', error);
      this.$dispatch('show-message', 'Failed to perform action. Please try again.');
    }
  },

  /*
  async run() {
    return fetch(`/api/commands/${this.card.id}/run`)
      .then(response => response.json())
      .then(data => {
        return data.output;
      })
      .catch(error => console.error(error));
  },

  async run_1() {
    if (!this.card.command_1) return;

    return fetch(`/api/commands/${this.card.id}/run/1`)
      .then(response => response.json())
      .then(data => {
        return data.output;
      })
      .catch(error => console.error(error));
  },
  */

  getCountdownClass() {
    return this.downCount >= 0 ? 'fade-out' : '';
  },

  startHold(event) {
    event.preventDefault();
    if(this.lock){
      this.showMessage(`Screen is locked for edit`);
      return;
    }
    const isTouch = event.type.startsWith('touch');
    if (isTouch) this.touchHandled = true;
    else if (this.touchHandled) return;
    // The else if is to avoid multiple clicks (touch and mouse) when mouseclicked in google mobile device mode. Here the mouseclick after touch is ignored

    // Exit and handle in endHold
    if (this.countdownTimer) {
      this.countdownCancelAction = true;
      this.cancelCountdown();
      return;
    }

    this.holdTimer = setTimeout(() => {
      this.handleLongClick();
      this.holdTriggered = true;
    }, 1000);
  },

  endHold(event) {
    event.preventDefault();
    if(this.lock){
      return;
    }
    const isTouch = event.type.startsWith('touch');

    if (isTouch) {
      // No purpose for this code as no known problems. This is to avoid touchHandled remaning true in touch mode
      setTimeout(() => { this.touchHandled = false; }, 10);
    } else if (this.touchHandled) {
      // This is to avoid multiple clicks (touch and mouse) when mouseclicked in google mobile device mode. Here the mouseclick after touch is ignored
      this.touchHandled = false;
      return;
    }
    if (this.countdownCancelAction) {
      this.countdownCancelAction = false;
      return;
    }

    if (!this.holdTriggered) this.handleCardClick();
    this.clearHoldTimer();
  },

  cancelHold() {
    this.clearHoldTimer();
  },

  clearHoldTimer() {
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  countdownRunCommand(count) {
    if (count <= 0) {
      this.cancelCountdown();
      //this.countdownTimer = null;
      this.handleRunCommand();
      //this.downCount = null;
      return;
    }
    this.downCount = count;
    this.countdownTimer = setTimeout(() => {
      this.downCount = null; // Reset to hide countdown before next number
      setTimeout(() => { this.countdownRunCommand(count - 1) }, 200);
    }, 800);
  },

  handleCardClick() {
    this.showLogs();

  },

  handleLongClick() {
    this.countdownRunCommand(5);
  },

  async handleRunCommand() {
    await this.runCommand();
    this.showMessage(`${this.title} clicked`);
  },

  cancelCountdown() {
    clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
    this.downCount = null;

  },

  showLogs() {
    this.$dispatch('show-modal', `Logs for ${this.title}`);
    if (this.logs) {
      this.modalContent = this.logs;
      this.modalVisible = true;
    } else {
      console.log('No logs available for:', this.title);
    }
  },
})