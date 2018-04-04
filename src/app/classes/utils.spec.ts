import { Utils } from './utils';

describe('Utils class test', () => {
  let utils: Utils = null;
  beforeEach(() => {
    utils = new Utils();
  });
  it('should be created', function () {
    expect(utils).toBeTruthy();
  });
  it('should return that array does contain string', function () {
    const array = ['one', 'two', 'three'];
    const word = 'two';
    expect(Utils.contains(array, word)).toBe(true);
  });
  it('should return that array does not contain string', function () {
    const array = ['one', 'two', 'three'];
    const word = 'four';
    expect(Utils.contains(array, word)).toBe(false);
  });
  it('should return the date as string', function () {
    const date = new Date(2018, 0, 5);
    jasmine.clock().mockDate(date);
    expect(Utils.getDate()).toEqual('180105');
  });
  it('should return the date with delta as string', function () {
    const date = new Date(2018, 0, 5);
    const delta = 3;
    jasmine.clock().mockDate(date);
    expect(Utils.getDate(delta)).toEqual('180108');
  });
  it('should return the time as string', function () {
    const date = new Date(2018, 0, 5, 12, 32, 15);
    jasmine.clock().mockDate(date);
    expect(Utils.getTime()).toEqual('123215');
  });
  it('should return the time with delta as string', function () {
    const date = new Date(2018, 0, 5, 12, 32, 15);
    const delta = 43;
    jasmine.clock().mockDate(date);
    expect(Utils.getTime(delta)).toEqual('131515');
  });
  it('length of array should be the same after shuffling', function () {
    const array = ['one', 'two', 'three'];
    const length = array.length;
    expect(Utils.shuffle(array).length).toBe(length);
  });
  it('array should contain the same elements after shuffling', function () {
    const array = ['one', 'two', 'three'];
    expect(Utils.shuffle(array).sort()).toEqual(array.sort());
  });
  afterEach(() => {
    utils = null;
  });
});
