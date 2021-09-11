import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGoods } from '@core/models/goods.model';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryPageComponent implements OnInit {
  categoryId?: string;
  subcategoryId?: string;

  goods$?: Observable<IGoods[]>;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const { categoryId, subcategoryId } = this.route.snapshot.params;
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;

    this.goods$ = this.http.get<IGoods[]>(`http://localhost:3004/goods/category/${categoryId}/${subcategoryId}`);
  }
}
