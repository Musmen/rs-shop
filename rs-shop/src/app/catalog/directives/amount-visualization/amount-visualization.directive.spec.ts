import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Colors, DEFAULT_AMOUNT_VISUALIZATION, Titles } from '@catalog/common/constants';
import { rgb2hexInUpperCase } from '@catalog/common/helper';

import { AmountVisualizationDirective } from './amount-visualization.directive';

// ************************!!! MY TESTS !!!***************************

@Component({
  template: `
    <h1 appAmountVisualization="10">
      AmountStatus is normal. Color and fill - yellow
      Title - Осталось от 5 до 20 единиц
    </h1>

    <h1 appAmountVisualization="1">
      AmountStatus is low. Color and fill - red
      Title - Осталось меньше 5 единиц
    </h1>

    <h1 appAmountVisualization="30">
      AmountStatus is high. Color and fill - green
      Title - В наличии больше 20 единиц
    </h1>
  `,
})
class TestComponent { }

describe('AmountVisualizationDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let h1Set: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AmountVisualizationDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    h1Set = fixture.debugElement.queryAll(By.directive(AmountVisualizationDirective));
  });

  // **************************!!! # 7 !!!*******************************
  it('should have three visualizates elements', () => {
    expect(h1Set.length).toBe(3);
  });

  // **************************!!! # 8 !!!*******************************
  it('should set first <h1> tag of TestComponent color and fill in "yellow"', () => {
    const hexColorFirstH1 = rgb2hexInUpperCase(h1Set[0].nativeElement.style.color);
    const hexFillFirstH1 = rgb2hexInUpperCase(h1Set[0].nativeElement.style.fill);

    expect(hexColorFirstH1).toBe(Colors.yellow);
    expect(hexFillFirstH1).toBe(Colors.yellow);
  });

  // **************************!!! # 9 !!!*******************************
  it(`should set first <h1> tag of TestComponent attribute in "${DEFAULT_AMOUNT_VISUALIZATION.title}"`, () => {
    const firstH1Title = h1Set[0].nativeElement.title;
    expect(firstH1Title).toBe(DEFAULT_AMOUNT_VISUALIZATION.title);
  });

  // **************************!!! # 10 !!!*******************************
  it('should set second <h1> tag of TestComponent color and fill in "red"', () => {
    const hexColorSecondH2 = rgb2hexInUpperCase(h1Set[1].nativeElement.style.color);
    const hexFillSecondH2 = rgb2hexInUpperCase(h1Set[1].nativeElement.style.fill);

    expect(hexColorSecondH2).toBe(Colors.red);
    expect(hexFillSecondH2).toBe(Colors.red);
  });

  // **************************!!! # 11 !!!*******************************
  it(`should set second <h1> tag of TestComponent attribute in "${Titles.low}"`, () => {
    const secondH1Title = h1Set[1].nativeElement.title;
    expect(secondH1Title).toBe(Titles.low);
  });

  // **************************!!! # 12 !!!*******************************
  it('should set third <h1> tag of TestComponent color and fill in "green"', () => {
    const hexColorThirdH2 = rgb2hexInUpperCase(h1Set[2].nativeElement.style.color);
    const hexFillThirdH2 = rgb2hexInUpperCase(h1Set[2].nativeElement.style.fill);

    expect(hexColorThirdH2).toBe(Colors.green);
    expect(hexFillThirdH2).toBe(Colors.green);
  });

  // **************************!!! # 13 !!!*******************************
  it(`should set third <h1> tag of TestComponent attribute in "${Titles.high}"`, () => {
    const thirdH1Title = h1Set[2].nativeElement.title;
    expect(thirdH1Title).toBe(Titles.high);
  });
});
