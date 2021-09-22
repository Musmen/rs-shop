import { IGoods } from '@core/models/goods.model';
import ISortState from '@core/models/sort-state.model';

import { SortPipe } from './sort.pipe';

import {
  sortPipeTestMockGoods,
  sortPipeTestMockGoodsResultByAscendingPrice,
  sortPipeTestMockGoodsResultByAscendingRating,
  sortPipeTestMockGoodsResultByAscendingAmount,
} from './sort.pipe.test-mock-data';

describe('SortPipe', () => {
  let inputGoodsList: IGoods[];

  const sortPipe = new SortPipe();

  beforeEach(() => {
    inputGoodsList = sortPipeTestMockGoods;
  });

  it('create an instance', () => {
    expect(sortPipe).toBeTruthy();
  });

  // ************************!!! MY TESTS !!!***************************
  // **************************!!! # 1 !!!*******************************
  it('ascending sort by price', () => {
    const sortState: ISortState = {
      ascending: 1,
      sortingBy: 'price',
    };

    expect(JSON.stringify(sortPipe.transform(inputGoodsList, sortState))).toBe(
      JSON.stringify(sortPipeTestMockGoodsResultByAscendingPrice),
    );
  });

  // **************************!!! # 2 !!!*******************************
  it('descending sort by price', () => {
    const sortState: ISortState = {
      ascending: -1,
      sortingBy: 'price',
    };

    expect(JSON.stringify(sortPipe.transform(inputGoodsList, sortState))).toBe(
      JSON.stringify([...sortPipeTestMockGoodsResultByAscendingPrice].reverse()),
    );
  });

  // **************************!!! # 3 !!!*******************************
  it('ascending sort by rating', () => {
    const sortState: ISortState = {
      ascending: 1,
      sortingBy: 'rating',
    };

    expect(JSON.stringify(sortPipe.transform(inputGoodsList, sortState))).toBe(
      JSON.stringify(sortPipeTestMockGoodsResultByAscendingRating),
    );
  });

  // **************************!!! # 4 !!!*******************************
  it('descending sort by rating', () => {
    const sortState: ISortState = {
      ascending: -1,
      sortingBy: 'rating',
    };

    expect(JSON.stringify(sortPipe.transform(inputGoodsList, sortState))).toBe(
      JSON.stringify([...sortPipeTestMockGoodsResultByAscendingRating].reverse()),
    );
  });

  // **************************!!! # 5 !!!*******************************
  it('ascending sort by available amount', () => {
    const sortState: ISortState = {
      ascending: 1,
      sortingBy: 'availableAmount',
    };

    expect(JSON.stringify(sortPipe.transform(inputGoodsList, sortState))).toBe(
      JSON.stringify(sortPipeTestMockGoodsResultByAscendingAmount),
    );
  });

  // **************************!!! # 6 !!!*******************************
  it('descending sort by available amount', () => {
    const sortState: ISortState = {
      ascending: -1,
      sortingBy: 'availableAmount',
    };

    expect(JSON.stringify(sortPipe.transform(inputGoodsList, sortState))).toBe(
      JSON.stringify([...sortPipeTestMockGoodsResultByAscendingAmount].reverse()),
    );
  });
});
