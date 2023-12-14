import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @state()
  _users = 0;

  #connection: any;

  constructor() {
    super();

    this.#connection = new (window as any).signalR.HubConnectionBuilder()
      .withUrl("/umbraco/testhub")
      .withAutomaticReconnect()
      .configureLogging((window as any).signalR.LogLevel.Warning)
      .build();

    // this.#connection.on("ReceiveMessage", () => {
    //   console.log("test");
    // };
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

  // newWindowLoadedOnClient = () => {
  //   this.#connection.invoke("ReceiveMessage");
  //   this._users = 1337;
  // };

  // accept = () => {
  //   console.log("New window loaded on client");
  //   this.newWindowLoadedOnClient();
  // };

  // reject = () => {};

  /**
   * The number of times the button has been clicked.
   */

  render() {
    return html`
      <div>
        <h1>My Element</h1>
        <p>Open a new window to see the magic happen</p>
        <p>${this._users}</p>
      </div>
    `;
  }

  // (function () {
  //   console.info("signalR connection established");

  //   // connection is established => call a function on the hub
  //   connection.invoke("Ping").catch(function (err) {
  //     return console.error(
  //       "Could not invoke method [Ping] on signalR connection",
  //       err.toString()
  //     );
  //   });
  // })

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
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
  }
}

// this.#connection = new (window as any).signalR.HubConnectionBuilder()
// .withUrl("/umbraco/testhub")
// .withAutomaticReconnect()
// .configureLogging((window as any).signalR.LogLevel.Warning)
// .build()
// .start()
// .then(this.accept, this.reject)
// .catch(function (err: any) {
//   return console.error(
//     "could not establish a signalR connection",
//     err.toString()
//   );
// });

// this.#connection.on("updateUsers", (message: any) => {
// console.log(message);
// });
// }

// newWindowLoadedOnClient() {
// this.#connection.send("updateUsers");
// this._users = 1337;
// }

// accept() {
// console.log("New window loaded on client");
// this.newWindowLoadedOnClient();
// }

// reject() {}
