using NUnit.Framework;
using DeePattern.Decorator.InterfaceBased;
// using Advanced = DeePattern.Decorator.InterfaceBased.Advanced;
using static System.Console;
using BookSelling = DeePattern.Decorator.InterfaceBased.BookSelling;
using DeePattern.Decorator.AbstractBased;

namespace TestDeePa
{
    public class TestDecorator
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Test_Decorator_Based_Interface()
        {
            var deco = new MenuWindow(new Window());

            deco.Draw();

            var deco2 = new SideBarWindow(deco);

            deco2.Draw();

            var deco3 = new StatusBarWindow(deco);

            deco3.Draw();


            var deco4 = new StatusBarWindow(deco2);

            deco4.Draw();
            /* Expected Output:
             * 
             * deco:
             *  Menu Window
             *  Decorator Window
             *  Window
             * */
        }


        [Test]
        public void Test_Decorator_Based_Interface_Advanced()
        {
            /*
            var deco = new Advanced.MenuWindow(new Advanced.Window());
            WriteLine();
            deco.WrapUp();

            var deco2 = new Advanced.SideBarWindow(deco);
            WriteLine();
            deco2.WrapUp();

            var deco3 = new Advanced.StatusBarWindow(deco);
            WriteLine();
            deco3.WrapUp();


            var deco4 = new Advanced.StatusBarWindow(deco2);
            WriteLine();
            deco4.WrapUp();
            */
            /* Expected Output:
             * 
             * deco:
             *  Menu Window
             *  Decorator Window
             *  Window
             * */
        }

[Test]
public void Test_BookSelling_With_Decorator()
{
    /* 시나리오 구축
        * 
        * 결국 궁극적인 목표는 개발자가 비즈니스 로직을 구현할 때 사용하기 쉬운
        * 구조를 만드는 것이다. 결국 나의 고객은 개발자이다.
        * 
        * 결국은 복잡한 포인트
        * 
        * 전제 조건
        * - 책의 종류에 따라, 할인율이 다르다.
        * - 회원의 종류에 따라, 할인율이 다르다.
        * - 책의 가격에 따라, 할인율이 다르다.
        * - 회원이 사용하는 포인트에 따라 제품의 가격이 다르다.
        * - 포인트의 종류는 다양하다. 
        * 
        * 클래스 종류
        * - Book 클래스
        *   - 가격 
        *   - 상품 코드
        *   - 책 제목
        * - OriginalBookPrice
        *   
        * - User 클래스, Book 클래스
        *   - 테스트를 위해 익명 클래스를 선언한다.
        * */

    /// Basic Test
    var book = new BookSelling.Book
    {
        Code = 12341123,
        OriginPrice = 54000,
        Title = "[YES24] 결제 로직을 잘 작성하는 방법"
    };

    var obp = new BookSelling.OriginalBookPrice(book);

    // 헌 책을 빌리는 경우
    var bs = new BookSelling.BorrowingSale(new BookSelling.UsedBookSale(obp));
    // 헌책 50 % 세일 후 렌탈 20 % 세일
    var price = bs.GetPrice();

    // 포인트 세일 구현되지 않음
    var bps = new BookSelling.BookPointSale(bs);
    // NotImplementedException 오류 발생
    Assert.Throws<System.NotImplementedException>( () => bps.GetPrice());

    /* 예상 결과 치
        * 54000 * 0.5 * 0.8
        * */
    WriteLine(price);
    // 실제 계산 결과와 비교
    Assert.AreEqual((uint)54000 * 0.5 * 0.8, price);

    var UserInfo = new {
        UserName = "김 건범",
        Yes24Point = 5000,
        Yes24Money = 1000,
        UserID = "code-machina",
        Email = "gbkim1988@gmail.com",
        GitHub = "http://github.com/code-machina"
    };

    var Request = new
    {
        ToBeUsedYes24Point = 2000,
    };

    // Yes24 포인트 차감
    if (!(UserInfo.Yes24Point >= Request.ToBeUsedYes24Point))
        Assert.Throws<System.ArgumentOutOfRangeException>(
            // 익명 함수
            () => throw new System.ArgumentOutOfRangeException(
                message:$"{UserInfo.UserName} 님의 잔여 Yes24 포인트는 {UserInfo.Yes24Point} 입니다.", 
                paramName: nameof(Request.ToBeUsedYes24Point))
            );

    var y24ps = new BookSelling.Yes24PointSale(bs, (uint)Request.ToBeUsedYes24Point);

    var totalPrice = y24ps.GetPrice();

    // 산술 계산식과 비교
    Assert.AreEqual(((uint)54000 * 0.5 * 0.8) - 2000, totalPrice);
    WriteLine($"((uint)54000 * 0.5 * 0.8) - 2000 : {((uint)54000 * 0.5 * 0.8) - 2000}");
    WriteLine($"totalPrice : {totalPrice}");
}


        [Test]
        public void Test_Abstract_Based_Decorator()
        {
            // Create ConcreteComponent and two Decorators

            ConcreteComponent c = new ConcreteComponent();
            ConcreteDecoratorA d1 = new ConcreteDecoratorA();
            ConcreteDecoratorB d2 = new ConcreteDecoratorB();
            ConcreteDecoratorC d3 = new ConcreteDecoratorC();
            // Link decorators

            d1.SetComponent(c);
            d2.SetComponent(d1);
            d3.SetComponent(d2);

            d3.Operation();

            /* Ouput:
            * 
            * ConcreteComponent.Operation()
            * ConcreteDecoratorA.Operation()
            * ConcreteDecoratorB.Operation()
            */
        }
    }
}
