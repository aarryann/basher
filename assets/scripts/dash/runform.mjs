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

  back() {
    this.runFormId = null;
  }

})