import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { MyPopover } from "./popover-element";
import { UserCard } from "./usercard-element";

@customElement("my-element")
export class MyElement extends LitElement {
  @state()
  _users = 0;

  #connection: any;
  #popover: any;

  constructor() {
    super();

    this.#connection = new (window as any).signalR.HubConnectionBuilder()
      .withUrl("/umbraco/UserHub")
      .withAutomaticReconnect()
      .configureLogging((window as any).signalR.LogLevel.Warning)
      .build();
    this.#connection.on("ReceiveMessage", (message: any) => {
      console.log(message);
    });

    this.#connection.on("updateTotalUsers", (message: any) => {
      console.log(message);
      this._users = message;
    });

    this.#connection
      .start()
      .then(() => {
        console.info("signalR connection established");
        this.#connection.invoke("HelloWorld").catch((err: any) => {
          return console.error(
            "Could not invoke method [Ping] on signalR connection",
            err.toString()
          );
        });
      })
      .catch((err: any) => {
        return console.error(
          "could not establish a signalR connection",
          err.toString()
        );
      });
  }

  render() {
    return html`
      <a
        class="circle-container"
        @click=${this._handleClick}
      >
        <p>${this._users}</p>
      </a>
    `;
  }
  _handleClick() {
    if (this.#popover) {
      this.#popover.remove();
      this.#popover = null;
    } else {
      const popover = new MyPopover();
      const userCard = new UserCard();
  
      popover.shadowRoot?.appendChild(userCard);
      this.shadowRoot?.appendChild(popover);
  
      this.#popover = popover;
    }
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }
    .circle-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(2em + 4px);
      height: calc(2em + 4px);
      border-radius: 50%;
      background-color: #FFFFFF;
      transition: background-color 0.3s ease;
    }
    
    .circle-container:hover {
      background-color: #6C6B6A;
      color: #FFFFFF
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    p {
      margin: 0;
      color: #fffff;
      text-decoration: inherit;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
    "my-popover": MyPopover;
  }
}