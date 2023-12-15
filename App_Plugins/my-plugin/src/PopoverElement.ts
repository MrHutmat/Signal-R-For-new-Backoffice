import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("my-popover")
export class MyPopover extends LitElement {
  render() {
    return html`
      <div class="popover">
        <p>Dette er en popover!</p>
        <p>Her er noget dummy data.</p>
      </div>
    `;
  }

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
    color: black;
    z-index: 1000;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), -4px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .popover::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 25px;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent white;
  
  }
`;



}
