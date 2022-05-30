const IconsMap = [
  [
    '[data-icon="move-left-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
      <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
    </svg>`
  ],
  [
    '[data-icon="move-right-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
  </svg>`
  ],
  [
    '[data-icon="copy-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
      <path d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"></path>
    </svg>`
  ],
  [
    '[data-icon="paste-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M9.634,10.633c0.116,0.113,0.265,0.168,0.414,0.168c0.153,0,0.308-0.06,0.422-0.177l4.015-4.111c0.229-0.235,0.225-0.608-0.009-0.836c-0.232-0.229-0.606-0.222-0.836,0.009l-3.604,3.689L6.35,5.772C6.115,5.543,5.744,5.55,5.514,5.781C5.285,6.015,5.29,6.39,5.522,6.617L9.634,10.633z"></path>
    <path fill="none" d="M17.737,9.815c-0.327,0-0.592,0.265-0.592,0.591v2.903H2.855v-2.903c0-0.327-0.264-0.591-0.591-0.591c-0.327,0-0.591,0.265-0.591,0.591V13.9c0,0.328,0.264,0.592,0.591,0.592h15.473c0.327,0,0.591-0.264,0.591-0.592v-3.494C18.328,10.08,18.064,9.815,17.737,9.815z"></path>
  </svg>`
  ],
  [
    '[data-icon="delete-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325
    H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908
    c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795
    l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623
    L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"></path>
  </svg>`
  ],
  [
    '[data-icon="create-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z"></path>
  </svg>`
  ],
  [
    '[data-icon="create-color"]',
    `<svg class="svg-icon" viewBox="0 0 20 20" style="transform: rotate(45deg)">
    <path fill="none" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
    c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
    c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
    c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
  </svg>`
  ],
  [
    '[data-icon="color-picker"]',
    `<svg class="svg-icon" viewBox="0 0 20 20">
       <path d="M17.659,9.597h-1.224c-0.199-3.235-2.797-5.833-6.032-6.033V2.341c0-0.222-0.182-0.403-0.403-0.403S9.597,2.119,9.597,2.341v1.223c-3.235,0.2-5.833,2.798-6.033,6.033H2.341c-0.222,0-0.403,0.182-0.403,0.403s0.182,0.403,0.403,0.403h1.223c0.2,3.235,2.798,5.833,6.033,6.032v1.224c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403v-1.224c3.235-0.199,5.833-2.797,6.032-6.032h1.224c0.222,0,0.403-0.182,0.403-0.403S17.881,9.597,17.659,9.597 M14.435,10.403h1.193c-0.198,2.791-2.434,5.026-5.225,5.225v-1.193c0-0.222-0.182-0.403-0.403-0.403s-0.403,0.182-0.403,0.403v1.193c-2.792-0.198-5.027-2.434-5.224-5.225h1.193c0.222,0,0.403-0.182,0.403-0.403S5.787,9.597,5.565,9.597H4.373C4.57,6.805,6.805,4.57,9.597,4.373v1.193c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403V4.373c2.791,0.197,5.026,2.433,5.225,5.224h-1.193c-0.222,0-0.403,0.182-0.403,0.403S14.213,10.403,14.435,10.403"></path>
    </svg>`
  ],
];

export default class Icons {
  constructor() {
    // Inject a stylesheet
    this.inject_stylesheet();

    // inject icons one time
    this.inject_all_icons();

    // if something changes in the DOM, inject icons again
    this.mutation_observer = new MutationObserver(this.mutation_observer_callback.bind(this));
    this.mutation_observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });


  }
  inject_stylesheet() {
    const node_stylesheet = document.createElement('style');
    node_stylesheet.innerHTML = `
    .svg-icon {
      width: 1em;
      height: 1em;
      stroke: currentColor;
      fill: currentColor;
      stroke-opacity: 0;
      fill-opacity: 1;
      vertical-align: middle;
    }
    
    .svg-icon path,
    .svg-icon polygon,
    .svg-icon rect {
      fill: inherit;
    }
    
    .svg-icon circle {
      stroke: inherit;
      stroke-width: 1;
    }
    `;
    document.body.append(node_stylesheet);

  }
  inject_all_icons() {
    IconsMap.forEach(([selector, htmlContent]) => {
      document.querySelectorAll(selector).forEach(element => {
        element.innerHTML = htmlContent;
        element.setAttribute('data-icon-is-injected', '1'); // this attribute let us know that the icon is already injected in future
      }
      );
    })
  }
  mutation_observer_callback(mutationsList, observer) {

    // Loop through all mutations.
    // Ignore mutation generated by a previous icon injection.
    // If , excluded these, ther is at least one mutation, re inject all icons
    for (const mutation of mutationsList) {

      if (mutation.type === 'childList') {
        // console.log('A child node has been added or removed.');
        if (mutation.target.hasAttribute('data-icon-is-injected')) {
          continue;
        }
      }
      else if (mutation.type === 'attributes') {
        // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        continue;
      }

      // something is changed inthe DOM, and the change is not from icons injection
      this.inject_all_icons();
      return;

    }


  }

}
