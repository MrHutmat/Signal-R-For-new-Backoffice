import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { MyPopover } from "./popover-element";
import { UserCard } from "./usercard-element";

@customElement("my-element")
export class MyElement extends LitElement {

  // State variable to track the number of users
  @state()
  _users = 0;

  // Dynamic fields for SignalR connection and popover
  #connection: any;
  #popover: any;

  constructor() {
    super();

    // Initialize SignalR connection in the constructor
    this.#connection = new (window as any).signalR.HubConnectionBuilder()
      .withUrl("/umbraco/UserHub") //Hub URL from  UserHubRoutes/GetUserHubRoute
      .withAutomaticReconnect()
      .configureLogging((window as any).signalR.LogLevel.Warning)
      .build();

      // Handle incoming messages from the hub
    this.#connection.on("ReceiveMessage", (message: any) => {
      console.log(message);
    });

    // Handle update of total users from the hub
    this.#connection.on("updateTotalUsers", (message: any) => {
      console.log(message);
      this._users = message;
    });

    // Start the SignalR connection
    this.#connection
      .start()
      .then(() => {
        console.info("signalR connection established");

        // Invoke a method on the hub after connection is established
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

  // Render method for displaying the user count and creating a clickable container
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

  // Handle click event to toggle the popover
  _handleClick() {
    if (this.#popover) {
      this.#popover.remove();
      this.#popover = null;
    } else {

       // Create instances of popover and user card
      const popover = new MyPopover();
      const userCard = new UserCard();
  
      // Append the user card to the popover's shadow root
      popover.shadowRoot?.appendChild(userCard);

      // Append the popover to the current element's shadow root
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

// Define custom elements for TypeScript when used in HTML. 
declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}