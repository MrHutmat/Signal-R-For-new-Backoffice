import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("usercard-element")
export class UserCard extends LitElement {

    render() {
        return html`
          <div class="user-card">
          <div class="profile-picture">J</div>
          <div class="user-info">
              <div class="user-name">John Doe</div>
              <div class="login-info">
                  <div class="login-date">Last login:</div>
                  <div class="login-time">Dec 15, 2023 - 12:30 PM</div>
              </div>
          </div>
            </div>
                <div class="user-card">
            <div class="profile-picture2">M</div>
            <div class="user-info">
                <div class="user-name">Mike Kold</div>
                <div class="login-info">
                    <div class="login-date">Last login:</div>
                    <div class="login-time">Dec 15, 2023 - 10:35 PM</div>
                </div>
            </div>
        </div>
        `;
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
        background-color: #4CAF50;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
    }
    .profile-picture2 {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: red;
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