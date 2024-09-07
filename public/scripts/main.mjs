export const dashboard = () => ({
  modalVisible: false,
  modalContent: '',
  theme: 'dark',
  widgets: [],
  searchQuery: '',
  displayMessage: null,
  expandedWidget: null,
  holdTimer: null,
  holdTriggered: false,
  touchHandled: false,
  countdownTimer: null,

  async init() {
    try {
      const response = await fetch('config.json');
      this.widgets = await response.json();
      this.initializeWidgetClasses();
    } catch (error) {
      console.error('Failed to load config.json:', error);
    }
  },

  initializeWidgetClasses() {
    this.widgets.forEach((widget, index) => {
      widget.widgetClass = this.expandedWidget === index
        ? 'col-span-6 expanded'
        : `col-span-${widget.colspan}`;
      widget.iconClass = `fas fa-${widget.icon} mb-1`;
      widget.countdown = null;
    });
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

  getCountdownClass() {
    const index = this.$data.index;
    //const index = this.$event.target.getAttribute('data-index');
    return this.widgets[index].countdown >= 0 ? 'fade-out' : '';
  },

  startHold(event) {
    this.displayMessage = null;
    const index = event.currentTarget.getAttribute('data-index');
    const isTouch = event.type.startsWith('touch');

    if (isTouch) {
      this.touchHandled = true;
    } else if (this.touchHandled) {
      // This is to avoid multiple clicks (touch and mouse) when mouseclicked in google mobile device mode. Here the mouseclick after touch is ignored
      return;
    }
    this.holdTimer = setTimeout(() => {
      this.showLogs(index);
      this.holdTriggered = true;
    }, 1000);
  },

  endHold(event) {
    const index = event.currentTarget.getAttribute('data-index');
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

    if (!this.holdTriggered) this.handleWidgetClick(index);
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  cancelHold() {
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  startCountdown(index) {
    if (this.widgets[index].countdownTimer) {
      //this.displayMessage = 'Cancelled Countdown';
      clearTimeout(this.widgets[index].countdownTimer);
      this.widgets[index].countdownTimer = null;
      this.widgets[index].countdown = null;
    } else {
      //this.displayMessage = 'Start Countdown';
      this.countdown(index, 5);
    }
  },

  countdown(index, count) {
    if (count <= 0) {
      this.widgets[index].countdownTimer = null;
      this.handleOnClick(index);
      this.widgets[index].countdown = null;
      return;
    }
    this.widgets[index].countdown = count;
    this.widgets[index].countdownTimer = setTimeout(() => {
      this.widgets[index].countdown = null; // Reset to hide countdown before next number
      setTimeout(() => { this.countdown(index, count - 1) }, 200);
    }, 800);
  },

  handleWidgetClick(index) {
    this.startCountdown(index);
  },

  handleOnClick(index) {
    console.log('On clicked:', this.widgets[index].title);
    this.displayMessage = `${this.widgets[index].title} clicked`;
  },

  showLogs(index) {
    if (this.widgets[index].logs) {
      this.modalContent = this.widgets[index].logs;
      this.modalVisible = true;
    } else {
      console.log('No logs available for:', this.widgets[index].title);
    }
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
  expandedWidget: null,
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

  isMessageDisplayHidden() {
    return !(this.displayMessage && this.displayMessage.length > 0);
  },

  getCountdownClass() {
    return this.downCount >= 0 ? 'fade-out' : '';
  },

  startHold(event) {
    this.displayMessage = null;
    //const index = event.currentTarget.getAttribute('data-index');
    const isTouch = event.type.startsWith('touch');

    if (isTouch) {
      this.touchHandled = true;
    } else if (this.touchHandled) {
      // This is to avoid multiple clicks (touch and mouse) when mouseclicked in google mobile device mode. Here the mouseclick after touch is ignored
      return;
    }
    this.holdTimer = setTimeout(() => {
      this.showLogs(this.index);
      this.holdTriggered = true;
    }, 1000);
  },

  endHold(event) {
    //const index = event.currentTarget.getAttribute('data-index');
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

    if (!this.holdTriggered) this.handleWidgetClick(this.index);
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  cancelHold() {
    clearTimeout(this.holdTimer);
    this.holdTriggered = false;
  },

  startCountdown() {
    if (this.countdownTimer) {
      //this.displayMessage = 'Cancelled Countdown';
      clearTimeout(this.countdownTimer);
      this.countdownTimer = null;
      this.downCount = null;
    } else {
      //this.displayMessage = 'Start Countdown';
      this.countdown(5);
    }
  },

  countdown(count) {
    if (count <= 0) {
      this.countdownTimer = null;
      this.handleOnClick(index);
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