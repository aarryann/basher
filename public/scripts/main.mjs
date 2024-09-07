export const dashboard = () => ({
  modalVisible: false,
  modalContent: '',
  theme: 'dark',
  widgets: [],
  searchQuery: '',
  displayMessage: null,

  async init() {
    try {
      const response = await fetch('config.json');
      this.widgets = await response.json();
    } catch (error) {
      console.error('Failed to load config.json:', error);
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
    if (this.theme === 'dark') {
      document.body.classList.remove('bg-black', 'text-blue-400');
      document.body.classList.add('bg-white', 'text-black');
      this.theme = 'light';
    } else {
      document.body.classList.remove('bg-white', 'text-black');
      document.body.classList.add('bg-black', 'text-blue-400');
      this.theme = 'dark';
    }
  }
})

export const card = () => ({
  holdTimer: null,
  holdTriggered: false,
  touchHandled: false,
  countdownTimer: null,
  widgetClass: null,
  iconClass: null,
  downCount: null,
  title: null,
  icon: "",
  index: null,
  logs: null,

  async init() {
    let widget = this.$data.widget;
    this.index = this.$data.index;
    this.iconClass = `fas fa-${widget.icon} mb-1`;
    this.downCount = null;
    this.widgetClass = `col-span-${widget.colspan}`;
    this.title = widget.title;
    this.icon = widget.icon;
  },

  getCountdownClass() {
    return this.downCount >= 0 ? 'fade-out' : '';
  },

  startHold(event) {
    event.preventDefault();
    this.displayMessage = null;
    const isTouch = event.type.startsWith('touch');

    if (isTouch) {
      this.touchHandled = true;
    } else if (this.touchHandled) {
      // This is to avoid multiple clicks (touch and mouse) when mouseclicked in google mobile device mode. Here the mouseclick after touch is ignored
      return;
    }
    this.holdTimer = setTimeout(() => {
      this.showLogs();
      this.holdTriggered = true;
    }, 1000);
  },

  endHold(event) {
    event.preventDefault();
    const isTouch = event.type.startsWith('touch');

    if (isTouch) {
      // No purpose for this code as no known problems. This is to avoid touchHandled remaning true in touch mode
      setTimeout(() => { this.touchHandled = false; }, 10);
    }
    else if (this.touchHandled) {
      // This is to avoid multiple clicks (touch and mouse) when mouseclicked in google mobile device mode. Here the mouseclick after touch is ignored
      this.touchHandled = false;
      return;
    }

    if (!this.holdTriggered) this.handleWidgetClick();
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  cancelHold() {
    event.preventDefault();
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  startCountdown() {
    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
      this.countdownTimer = null;
      this.downCount = null;
    } else {
      this.countdown(5);
    }
  },

  countdown(count) {
    if (count <= 0) {
      this.countdownTimer = null;
      this.handleOnClick();
      this.downCount = null;
      return;
    }
    this.downCount = count;
    this.countdownTimer = setTimeout(() => {
      this.downCount = null; // Reset to hide countdown before next number
      setTimeout(() => { this.countdown(count - 1) }, 200);
    }, 800);
  },

  handleWidgetClick() {
    this.startCountdown();
  },

  handleOnClick() {
    console.log('On clicked:', this.title);
    this.displayMessage = `${this.title} clicked`;
  },

  showLogs() {
    if (this.logs) {
      this.modalContent = this.logs;
      this.modalVisible = true;
    } else {
      console.log('No logs available for:', this.title);
    }
  },
})