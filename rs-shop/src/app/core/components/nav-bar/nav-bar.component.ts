import {
  ChangeDetectionStrategy, Component, Input, Output, EventEmitter,
} from '@angular/core';
import { ICategory } from '@app/core/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  @Input() categories?: ICategory[] | null;
  @Output() categoryClickEvent = new EventEmitter<string>();

  constructor(private router: Router) { }

  onCategoryClick(categoryId: string): void {
    this.categoryClickEvent.emit(categoryId);
  }
}
