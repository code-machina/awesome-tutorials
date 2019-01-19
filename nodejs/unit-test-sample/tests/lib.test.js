const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a postivie number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Gbkim');
    // expect(result).toBe('Welcome Gbkim');
    // regular expression testing
    // 정규표현식으로 문자열이 포함되어 있는지 테스트
    expect(result).toMatch(/Gbkim/);
    // 특정한 문자열이 포함되어 있는지 테스트
    expect(result).toContain('Gbkim');
  });
  it('한글 테스트를 지원하는가?', () =>{

  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    // Too general => useless
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    // Too specific => 나중에 에러가 발생할 확률이 높음
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // Proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']));
  });
});

describe('getProduct', () => {
  it('Should return the product with the given id', ()=>{
    const result = lib.getProduct(1);
    // toBe 는 object reference 의 메모리를 비교한다.
    // expect(result).toBe({id: 1, price: 10}); // it would raise error.
    // toEqual 는 { id: productId, price: 10, category: 'a' }  와 같이 비교대상의
    // 프로퍼티가 일치하지 않는 경우 에러를 발생시킨다.
    // expect(result).toEqual({id: 1, price: 10}); // it would pass the test.
    // toMatchObject 는 아래와 같은 오브젝트에도 요구한 프로퍼티를 만족
    // 하는지 테스트한다.
    // { id: productId, price: 10, category: 'a' } 
    expect(result).toMatchObject({id: 1, price: 10});
    // toHaveProperty 는 타입도 동일하게 지정해야 한다.
    expect(result).toHaveProperty('id', 1); // it would pass test
    // expect(result).toHaveProperty('id', '1'); // it would fail test

  });
});

describe('registerUser', () => {
  // a single assertion principle
  // 하나의 테스트에 하나의 assertion 만 둔다.
  it('Should throw if username is falsy', () => {
    // username 에 적합하지 않은 value 리스트
    // Null
    // undefined
    // NaN
    // ''
    // 0 
    // false

    // jest 는 parameterized test 를 지원하지 않는다.
    // 따라서 대안으로 아래와 같이 array 를 선언한다.
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => { 
        lib.registerUser(a);
      })
      .toThrow();
    });
  });
  it('Should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Mosh');
    expect(result).toMatchObject({ username: 'Mosh'});
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply 10% off discount if customer has more than 10 points', () => {
    // Fake Mock Function...
    db.getCustomerSync = function(customerId) {
      console.log('Fake Reading Customer');
      return {id: customerId, points: 20 };
    }
    const order = {customerId: 1, totalPrice: 10};
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    // const mockFunction = jest.fn();
    // // mockFunction.mockReturnValue(1); // it will return Promise
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('....'));
    // const result = await mockFunction();

    // db.getCustomerSync = function(customerId) {
    //   return { id: customerId, email: 'a' }
    // };
    // getCustomerSync Mock function 을 재작성한다.
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a', id: 1});

    // let mailSent = false;
    // mail.send = function(email, message) {
    //   mailSent = true;
    // }
    // 
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId : 1});
    // expect(mailSent).toBe(true);
    // jest Mock function 이 실행되었는지를 toHaveBeenCalled 를 통해 assertion 가능.
    expect(mail.send).toHaveBeenCalled();

    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/Your order/);
  });
});