const exercise1 = require('../exercise1');

describe('exercise1', () => {
  it('should raise error if input is not number', () => {
    // let's delcare `args` array to pass values which might not be unacceptable
    const args = ['Value', null, false, new Object({name: 'Gbkim'}), undefined];
    // NaN is a type of `number`
    args.forEach(a => {
      expect(() => {
        exercise1.fizzBuzz(a);
      }).toThrow();
    });
  });
  it('should return \'FizzBuzz if input is 15\'', () =>{
    const args = [15, 45, 75]; // 15 의 배수
    args.forEach(a => {
      expect(exercise1.fizzBuzz(a)).toBe('FizzBuzz');
    });
  });
  it('should return \'Fizz\' if input could be divided by 3, but input couldn\'t by 5', () => {
    const args = [3, 9, 12, 6];
    args.forEach(a => {
      expect(exercise1.fizzBuzz(a)).toBe('Fizz');
    });
  });
  it('should return \'Buzz\' if input could be divided by 5, but input couldn\'t by 3', () => {
    const args = [5, 10, 20, 25, 35];
    args.forEach(a => {
      expect(exercise1.fizzBuzz(a)).toBe('Buzz');
    });
  });
  it('should return input if input couldn\'t be divided by 5 or 3', () => {
    expect(exercise1.fizzBuzz(1)).toBe(1);
  });
});