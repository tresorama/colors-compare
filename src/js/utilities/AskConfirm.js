export default class AskConfirm {
  async ask_confirm(message) {
    const result = window.confirm(message);
    return result;
  }
}