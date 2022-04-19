export default class Stage {
  constructor(element) {
    console.log("Stage is starting");
    this.ctx = element.getContext('webgl');
  }
}