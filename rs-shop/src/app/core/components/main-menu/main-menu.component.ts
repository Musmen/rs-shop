import {
  ChangeDetectionStrategy, Component, EventEmitter, Output,
} from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
  @Output() setSearchValueEvent = new EventEmitter<string>();
  @Output() catalogButtonClickEvent = new EventEmitter();
  searchValue: string = '';

  setSearchValue(searchValue: string = this.searchValue): void {
    this.setSearchValueEvent.emit(searchValue);
  }

  onCatalogButtonClick(): void {
    this.catalogButtonClickEvent.emit();
  }
}
