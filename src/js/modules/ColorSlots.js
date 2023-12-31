import ClipboardHandler from '../utilities/ClipboardHandler';
import SimpleBrowserStorage from '../utilities/SimpleBrowserStorage';
import ColorDetector from '../utilities/ColorDetector';
import AskConfirm from '../utilities/AskConfirm';
import ColorPicker from 'vanilla-picker';

export default class ColorSlots {
  constructor() {
    // init helpers
    this.clipboard_handler = new ClipboardHandler();
    this.ask_confirm_handler = new AskConfirm();
    this.color_detector_handler = new ColorDetector();

    // init state and view
    this.persistent_storage = new SimpleBrowserStorage('color-slots');
    this.state = this.persistent_storage.get() ?? this.get_initial_state();
    this.view = new ColorSlotsView(this.dispatch.bind(this));

    // update view on load
    this.view.update(this.state);
  }
  get_initial_state() {
    return {
      colors: [
        { code: 'hsla(1,100%,50%,1)' },
        { code: 'hsla(20,100%,50%,1)' },
        { code: 'hsla(30,100%,50%,1)' },
      ],
    };
  }
  get_color_null() {
    return {
      code: 'black',
    };
  }
  update_state(new_state) {
    this.state = new_state;
    this.persistent_storage.set(this.state);
    this.view.update(this.state);
  }

  async dispatch(action, payload) {
    // utils
    const get_cloned_state = () => JSON.parse(JSON.stringify(this.state));

    // logic
    if (action === "update_color") {
      const index = Number(payload.index);
      const color_code = payload.code;
      const color_code_parsed = this.color_detector_handler.parse_color_code(color_code);
      const new_state = get_cloned_state();
      if (color_code_parsed.is_valid) {
        new_state.colors[index].code = color_code_parsed.color_code_string_hsl;
      }
      this.update_state(new_state);
      return;
    }
    if (action === "create_color") {
      debugger;
      const new_state = get_cloned_state();
      new_state.colors = [...new_state.colors, this.get_color_null()];
      this.update_state(new_state);
      return;
    }
    if (action === "delete_color") {
      const index = Number(payload.index);
      if (this.state.colors.length === 1) return;
      const user_is_sure = await this.ask_confirm_handler.ask_confirm('Are you sure to delete this color?');
      if (!user_is_sure) return;
      const new_state = get_cloned_state();
      new_state.colors.splice(index, 1);
      this.update_state(new_state);
      return;
    }
    if (action === "move_left_color") {
      const index = Number(payload.index);
      if (index === 0) return;
      const new_state = get_cloned_state();
      const temp = new_state.colors[index - 1];
      new_state.colors[index - 1] = new_state.colors[index];
      new_state.colors[index] = temp;
      this.update_state(new_state);
      return;
    }
    if (action === "move_right_color") {
      const index = Number(payload.index);
      if (index === this.state.colors.length - 1) return;
      const new_state = get_cloned_state();
      const temp = new_state.colors[index + 1];
      new_state.colors[index + 1] = new_state.colors[index];
      new_state.colors[index] = temp;
      this.update_state(new_state);
      return;
    }
    if (action === "copy_color") {
      const index = Number(payload.index);
      const color_code = this.state.colors[index].code;
      await this.clipboard_handler.copy_to_clipboard(color_code);
      return;
    }
    if (action === "paste_color") {
      const index = Number(payload.index);
      const color_code = await this.clipboard_handler.paste_from_clipboard();
      if (!color_code) return;
      this.dispatch("update_color", { index, code: color_code });
      return;
    }
    throw new Error(`
    Action not supported by this dispatcher.
    
    Dispatcher: ColorSlots.js - ColorSlots.dispatch()
    Event: ${JSON.stringify({ action, payload })}
  `);
  }
}

class ColorSlotsView {
  constructor(dispatch) {
    this.node_container = document.querySelector('.color-slots');
    if (!this.node_container) return;
    this.dispatch = dispatch;
    this.color_detector_handler = new ColorDetector();
    this.update({ colors: [] });
  }
  update(state) {
    // create a js object containing the state and some derived data
    const derived_state = this.create_derived_state(state);

    // create the html
    this.render_html(derived_state);

    // register events on DOM nodes
    this.register_events(derived_state);
  }
  create_derived_state(state) {
    const cloned_state = JSON.parse(JSON.stringify(state));
    cloned_state.colors = cloned_state.colors.map((color, index) => ({
      ...color,
      is_light: this.color_detector_handler.is_light_color(color.code),
    }));
    return cloned_state;
  }
  render_html(state) {

    // inject a color slot for each color in the state
    this.node_container.innerHTML = `
    <div class="color-slots__header">
      <p class="color-slots__heading">Color Slots</p>
    </div>
    
    <div class="color-slots__content">
      <div class="color-slots__slots">
        ${(!state.colors || state.colors.length === 0) ? (
        `<p>There are no colors</p>`
      ) : (
        state.colors.map((color, i) => this.render_color_slot(color, i)).join('')
      )}
      </div>
    </div>

    <div class="color-slots__footer">
      <button 
        type="button"
        title="Add a new color slot"
        class="color-slot__button"
        data-js="create-color-slot"
      >
        <span class="color-slot__button-icon" data-icon="create-color"></span>
      </button>
    </div>
    `;

  }
  render_color_slot(color, i) {
    return `
    <div 
      class="color-slot"
      data-js="color-slot"
      data-color-slot-index="${i}"
      data-color-is-light="${color.is_light}"
    >
      <div class="color-slot__header">
        <p class="color-slot__name">Color ${i + 1}</p>
        <button
          type="button"
          title="Open Color Picker"
          class="color-slot__button color-slot__color-picker-opener"
          data-js="color-slot-open-color-picker"
          data-color-slot-index="${i}"
        >
          <span class="color-slot__button-icon" data-icon="color-picker"></span>
          <span class="color-slot__button-text">Color Picker</span>
          <div class="catch-click-outside-color-picker"></div>
        </button>
        <input 
          type="text"
          value="${color.code}"
          class="color-slot__input"
          data-js="color-slot-input"
          data-color-slot-index="${i}"
        >
      </div>
      <div class="color-slot__content">
        <div
          class="color-slot__color-preview"
          style="--color-code: ${color.code};"
          data-color-slot-index="${i}"
        ></div>
        <div class="color-slot__overlay">
          <div class="color-slot__overlay-inner">

            <div class="color-slot__color-actions">
              <button
                type="button"
                title="Move this color to previous slot"
                class="color-slot__button color-slot__button--move-left"
                data-js="move-left-color-slot"
                data-color-slot-index="${i}"
              >
                <span class="color-slot__button-icon" data-icon="move-left-color"></span>
                <span class="color-slot__button-text">Sinistra</span>
              </button>
              <button
                type="button"
                title="Move this color to next slot"
                class="color-slot__button color-slot__button--move-right"
                data-js="move-right-color-slot"
                data-color-slot-index="${i}"
              >
                <span class="color-slot__button-icon" data-icon="move-right-color"></span>
                <span class="color-slot__button-text" >Destra</span
              </button>
              <button
                type="button"
                title="Copy the color code to clipboard"
                class="color-slot__button color-slot__button--copy"
                data-js="copy-color-slot"
                data-color-slot-index="${i}"
              >
                <span class="color-slot__button-icon" data-icon="copy-color"></span>
                <span class="color-slot__button-text" >Copia</span
              </button>
              <button
                type="button"
                title="Paste color code from clipboard"
                class="color-slot__button color-slot__button--paste"
                data-js="paste-color-slot"
                data-color-slot-index="${i}"
              >
                <span class="color-slot__button-icon" data-icon="paste-color"></span>
                <span class="color-slot__button-text" >Incolla</span
              </button>
            </div>
            
            <div class="color-slot__color-actions color-slot__color-actions--bottom">
              <button
                type="button"
                title="Delete this color slot"
                class="color-slot__button color-slot__button--delete"
                data-js="delete-color-slot"
                data-color-slot-index="${i}"
              >
                <span class="color-slot__button-icon" data-icon="delete-color"></span>
                <span class="color-slot__button-text" >Elimina</span
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    `;
  }
  register_events(state) {
    // UI events
    this.node_container.querySelectorAll('.color-slot').forEach(node => {
      node.querySelector('.color-slot__content').addEventListener('mouseenter', e => {
        node.classList.toggle('color-slot--hover', true);
      });
      node.querySelector('.color-slot__content').addEventListener('mouseleave', e => {
        node.classList.toggle('color-slot--hover', false);
      });
    });



    // state events
    this.node_container.querySelectorAll('[data-js="color-slot-input"]').forEach((input) => {
      input.addEventListener('change', (e) => {
        const index = e.currentTarget.getAttribute('data-color-slot-index');
        const code = e.currentTarget.value;
        this.dispatch('update_color', { index, code });
      });
    });

    this.node_container.querySelector('[data-js="create-color-slot"]').addEventListener('click', (e) => {
      this.dispatch('create_color');
    });

    this.node_container.querySelectorAll('[data-js="delete-color-slot"]').forEach(node => {
      node.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-color-slot-index');
        this.dispatch('delete_color', { index });
      });
    });

    this.node_container.querySelectorAll('[data-js="copy-color-slot"]').forEach(node => {
      node.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-color-slot-index');
        this.dispatch('copy_color', { index });
      });
    });

    this.node_container.querySelectorAll('[data-js="paste-color-slot"]').forEach(node => {
      node.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-color-slot-index');
        this.dispatch('paste_color', { index });
      });
    });

    this.node_container.querySelectorAll('[data-js="move-left-color-slot"]').forEach(node => {
      node.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-color-slot-index');
        this.dispatch('move_left_color', { index });
      });
    });

    this.node_container.querySelectorAll('[data-js="move-right-color-slot"]').forEach(node => {
      node.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-color-slot-index');
        this.dispatch('move_right_color', { index });
      });
    });

    this.node_container.querySelectorAll('[data-js="color-slot-open-color-picker"]').forEach(node => {
      const index = node.getAttribute('data-color-slot-index');
      const node_color_slot = this.node_container.querySelector(`[data-js="color-slot"][data-color-slot-index="${index}"]`);
      const current_color_code = state.colors[index].code;
      const picker = new ColorPicker({
        parent: node,
        color: current_color_code,
        editor: false,
        cancelButton: true,
        onDone: color => {
          // This function runs when user clicks on the "OK" button of the Color Picker

          // This will give you the color you selected          
          const color_code = color.hslaString;
          // If current color is already the same as the new color, do nothing
          if (current_color_code === color_code) return;
          // Code to do what you want with that color...
          this.dispatch('update_color', { index, code: color_code });
        },
        onOpen: color => {
          // This function runs when the Picker is opened

          // Add a class to css to show the picker is open
          node_color_slot.classList.toggle('color-slot--color-picker-is-opened', true);

          // This will give you the color active inside the picker
          const color_code = color.hslaString;
          // If current color is already the same as the new color, do nothing
          if (current_color_code === color_code) return;
          // Code to do what you want with that color...
          picker.setColor(current_color_code);
        },
        onClose: () => {
          // This function runs when the Picker is closed

          // Remove the class to css to show the picker is open
          node_color_slot.classList.toggle('color-slot--color-picker-is-opened', false);
        }
        // parent?: HTMLElement,
        // popup?: 'top' | 'bottom' | 'left' | 'right' | false,
        // template?: string,
        // layout?: string,
        // alpha?: boolean,
        // editor?: boolean,
        // editorFormat?: 'hex' | 'hsl' | 'rgb',
        // cancelButton?: boolean,
        // color?: string,
        // onChange?: ColorCallback,
        // onDone?: ColorCallback,
        // onOpen?: ColorCallback,
        // onClose?: ColorCallback,
      });
    });

  }

}