import clipboard from 'clipboardy';

export default class ClipboardHandler {
  async copy_to_clipboard(text) {
    try {
      const success = await clipboard.write(text);
      return success;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async paste_from_clipboard() {
    try {
      const text = await clipboard.read();
      return text;
    } catch (error) {
      console.error(error);
      return '';
    }
  }
}
