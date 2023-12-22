import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("usercard-element")
export class UserCard extends LitElement {
  // Render method for displaying the user card component

  _connectedUsersFromPopover: any;

  getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  render() {
    return html` ${console.log(this._connectedUsersFromPopover)}
    ${this._connectedUsersFromPopover
      ? this._connectedUsersFromPopover.map(
          (user: any) => html`
            ${console.log(user)}
            <div class="user-card">
              <div
                class="profile-picture"
                style="background-color: ${this.getRandomColor()}"
              >
                ${user.name.charAt(0)}
              </div>
              <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="login-info">
                  <div class="login-date">Last login: ${user.lastSeen}</div>
                </div>
              </div>
            </div>
          `
        )
      : html``}`;
  }

  static styles = css`
    .user-card {
      display: flex;
      align-items: center;
      margin-top: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      background-color: #f3f3f5;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .profile-picture {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      margin-right: 10px;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 16px;
      font-weight: bold;
    }

    .login-date {
      font-size: 12px;
      color: #555;
    }
    .login-time {
      font-size: 12px;
      color: #555;
      margin-top: 4px;
    }
  `;
}
