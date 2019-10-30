import { decimalAdjust } from '../../ts/lib/decimalAdjustment';


describe('decimal adjustment', () => {
  it('decimalAdjustment.ceil()', () => {
    let value: number | string = .87;
    let exponent: number | string = -1;

    expect(decimalAdjust.ceil(value, exponent)).toEqual(0.9);

    value = 123.446;
    expect(decimalAdjust.ceil(value, exponent)).toEqual(123.5);

    value = 123.456;
    expect(decimalAdjust.ceil(value, exponent)).toEqual(123.5);

    value = '1.23456e2';
    expect(decimalAdjust.ceil(value, exponent)).toEqual(123.5);

    exponent = 0;
    expect(decimalAdjust.ceil(value, exponent)).toEqual(124);

    exponent = 1;
    expect(decimalAdjust.ceil(value, exponent)).toEqual(130);

    value = '123.456';
    exponent = '-2';
    expect(decimalAdjust.ceil(value, exponent)).toEqual(123.46);

    value = 'value';
    exponent = 'exponent';
    expect(decimalAdjust.ceil(value, exponent)).toEqual(NaN);
  });
  it('decimalAdjustment.floor()', () => {
    let value: number | string = .87;
    let exponent: number | string = -1;

    expect(decimalAdjust.floor(value, exponent)).toEqual(0.8);

    value = 123.446;
    expect(decimalAdjust.floor(value, exponent)).toEqual(123.4);

    value = 123.456;
    expect(decimalAdjust.floor(value, exponent)).toEqual(123.4);

    value = '1.23456e2';
    expect(decimalAdjust.floor(value, exponent)).toEqual(123.4);

    exponent = 0;
    expect(decimalAdjust.floor(value, exponent)).toEqual(123);

    exponent = 1;
    expect(decimalAdjust.floor(value, exponent)).toEqual(120);

    value = '123.456';
    exponent = '-2';
    expect(decimalAdjust.floor(value, exponent)).toEqual(123.45);

    value = 'value';
    exponent = 'exponent';
    expect(decimalAdjust.floor(value, exponent)).toEqual(NaN);
  });
  it('decimalAdjustment.round()', () => {
    let value: number | string = .87;
    let exponent: number | string = -1;

    expect(decimalAdjust.round(value, exponent)).toEqual(0.9);

    value = 123.446;
    expect(decimalAdjust.round(value, exponent)).toEqual(123.4);

    value = 123.456;
    expect(decimalAdjust.round(value, exponent)).toEqual(123.5);

    value = '1.23456e2';
    expect(decimalAdjust.round(value, exponent)).toEqual(123.5);

    exponent = 0;
    expect(decimalAdjust.round(value, exponent)).toEqual(123);

    exponent = 1;
    expect(decimalAdjust.round(value, exponent)).toEqual(120);

    value = '123.456';
    exponent = '-2';
    expect(decimalAdjust.round(value, exponent)).toEqual(123.46);

    value = 'value';
    exponent = 'exponent';
    expect(decimalAdjust.round(value, exponent)).toEqual(NaN);
  });
});
