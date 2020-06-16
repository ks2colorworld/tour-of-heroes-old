import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _title = 'Tour of Heroes';

  public get title(): string {
    return environment.production ? this._title : `${this._title} (not prod)`;
  }

  constructor(
    public userService: UserService
  ) { }

}
