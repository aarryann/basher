export const runform = () => ({
  toggleState: 0,
  title: null,
  title_1: null,

  async init() {
  },

  getRunForm(event) {
    let detailStr = event.detail || '{}';
    let detail = JSON.parse(detailStr);
    this.runFormId = parseInt(detail.runformid);
    this.toggleState = detail.toggleState;
    if (this.toggleState === 1) {
      this.title = detail.title_1 || detail.title;
      this.title_1 = detail.title;
    }
    else {
      this.title = detail.title;
      this.title_1 = detail.title_1.length === 0 ? null : detail.title_1;
    }

  },

  async runCommand(cardId, tstate) {
    try {
      const endpoint = tstate === 1 ? 'run/1' : 'run';
      const response = await fetch(`/api/commands/${cardId}/${endpoint}`);
      const data = await response.json();
      this.$dispatch('show-message', data.message);
      return data;
    } catch (error) {
      console.error('Failed to run command:', error);
      this.$dispatch('show-message', 'Failed to perform action. Please try again.');
    }
  },

  async onRunCommand() {
    const data = await this.runCommand(this.runFormId, this.toggleState);
    this.showMessage(data.message);
  },

  async onAltRunCommand() {
    const data = await this.runCommand(this.runFormId, Math.abs(this.toggleState - 1));
    this.showMessage(data.message);
  },

  back() {
    this.runFormId = null;
  }

})