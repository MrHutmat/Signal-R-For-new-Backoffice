import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("popover-element")
export class PopoverElement extends LitElement {
  _connectedUsersFromMain: any;

  constructor(usersOnline: any) {
    super();
    this._connectedUsersFromMain = usersOnline;
  }

  // Render method for displaying the popover with a user card element
  render() {
    return html`
      <div class="popover">
        <usercard-element
          ._connectedUsersFromPopover=${this._connectedUsersFromMain}
        ></usercard-element>
      </div>
    `;
  }

  // Handle close method to remove the popover from the DOM
  _handleClose() {
    this.remove();
  }

  static styles = css`
    .popover {
      position: absolute;
      top: 60px;
      right: 50px;
      background-color: white;
      border: 0.1px solid grey;
      padding: 10px;
      z-index: 1000;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1),
        -4px 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: black;
    }

    .popover::before {
      content: "";
      position: absolute;
      top: -10px;
      right: 25px;
      border-width: 0 10px 10px;
      border-style: solid;
      border-color: transparent transparent white;
    }
  `;
}
