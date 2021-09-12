import {
  Directive, ElementRef, Input, OnInit, Renderer2,
} from '@angular/core';

import { getAmountVisualization } from '@catalog/common/tools';

@Directive({ selector: '[appAmountVisualization]' })
export class AmountVisualizationDirective implements OnInit {
  @Input('appAmountVisualization') amount?: number;
  @Input() propertiesToChangeColor: string[] = ['color', 'fill'];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (!this.amount) return;

    const { color, title } = getAmountVisualization(this.amount);
    this.propertiesToChangeColor.forEach(
      (propertyToChangeColor) => this.setElementPropertyColor(propertyToChangeColor, color),
    );
    this.setElementTitle(title);
  }

  private setElementPropertyColor(propertyToChangeColor: string, newColor: string): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      propertyToChangeColor,
      newColor,
    );
  }

  private setElementTitle(newTitle: string): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'title', newTitle);
  }
}
