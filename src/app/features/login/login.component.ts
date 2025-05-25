import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  login() {
    const origin = window.location.origin + '/callback';
    const key = environment.apiKey;
    const authUrl = `https://trello.com/1/authorize?return_url=${origin}&callback_method=fragment&expiration=never&scope=read,write&key=${key}`;
    window.location.href = authUrl;
  }
}
