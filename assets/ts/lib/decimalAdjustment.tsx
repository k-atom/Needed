const decimalAdjust = (() => {
  /**
    * Decimal adjustment of a number.
    *
    * @param {String}  type  The type of adjustment.
    * @param {Number}  value The number.
    * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
    * @returns {Number} The adjusted value.
    */
  const decimalAdjustment = (type: string, value: number | string, exp?: number | string): number => {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }

    let num: number | string | Array<any> = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(num) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }

    num = Math[type](+(num + 'e' + -exp));
    return +(num + 'e' + exp);
  }

  const ceil = (value: number | string, exp?: number | string) => {
    return decimalAdjustment('ceil', value, exp);
  }

  const floor = (value: number | string, exp?: number | string) => {
    return decimalAdjustment('floor', value, exp);
  }

  const round = (value: number | string, exp?: number | string) => {
    return decimalAdjustment('round', value, exp);
  }

  return {
    ceil: ceil,
    floor: floor,
    round: round
  }
})();

export {
  decimalAdjust
};
