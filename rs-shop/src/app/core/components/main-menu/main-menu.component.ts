import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
  @Input() isUserLogged$?: Observable<boolean>;
  @Input() userFullName$?: Observable<string>;
  @Output() setSearchValueEvent = new EventEmitter<string>();
  @Output() logoutEvent = new EventEmitter<void>();

  searchValue: string = '';

  setSearchValue(searchValue: string = this.searchValue): void {
    this.setSearchValueEvent.emit(searchValue);
  }

  onLogoutButtonClick(): void {
    this.logoutEvent.emit();
  }
}
