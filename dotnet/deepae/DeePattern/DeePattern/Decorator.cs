using System;
using System.Collections.Generic;
using System.Text;
using static System.Console;

namespace DeePattern.Decorator.InterfaceBased
{
    /* 아래 모델의 단점은 사용자(개발자)가 Draw 메서드에 상위 메서드를 
     * 호출하는 로직을 그려야 한다는 점이다.
     * */
    public interface BaseWindow
    {
        void Draw();
    }

    public class Window : BaseWindow {

        public void Draw()
        {
            WriteLine("Window Instance");
        }
    }

    public abstract class DecoratorWindow : BaseWindow
    {
        public BaseWindow baseWindow;
        public DecoratorWindow(BaseWindow window)
        {
            baseWindow = window;
        }
        public abstract void Draw();

    }

    public class MenuWindow : DecoratorWindow
    {
        public MenuWindow(BaseWindow window) : base(window)
        {
            // BaseWindow = window;

        }
        public override void Draw()
        {
            this.baseWindow.Draw();
            WriteLine("Menu Window Instance");
        }
    }

    public class SideBarWindow : DecoratorWindow
    {
        public SideBarWindow(BaseWindow window) : base(window)
        {
            // BaseWindow = window;

        }
        public override void Draw()
        {
            this.baseWindow.Draw();
            WriteLine("Side Bar Window Instance");
        }
    }

    public class StatusBarWindow : DecoratorWindow
    {
        public StatusBarWindow(BaseWindow window) : base(window)
        {
            // BaseWindow = window;

        }
        public override void Draw()
        {
            this.baseWindow.Draw();
            WriteLine("Status Bar Window Instance");
            
        }
    }
}

#if TESTING

namespace DeePattern.Decorator.InterfaceBased.Advanced
{
    public interface BaseWindow
    {
        void Draw();
    }

    public class Window : BaseWindow
    {

        public void Draw()
        {
            WriteLine("Window Instance");
        }
    }

    public abstract class DecoratorWindow : BaseWindow
    {
        public BaseWindow baseWindow;
        public DecoratorWindow(BaseWindow window)
        {
            baseWindow = window;
        }

        public abstract void Draw();

        public void WrappedDraw()
        {
            baseWindow.Draw();
        }
    }

    public class MenuWindow : DecoratorWindow
    {
        public MenuWindow(BaseWindow window) : base(window)
        {
            // BaseWindow = window;

        }

        public override void Draw()
        {
            this.baseWindow.Draw();
            WriteLine("Menu Window Instance");
        }

        public void WrapUp()
        {
            base.WrappedDraw();
        }
    }

    public class SideBarWindow : DecoratorWindow
    {
        public SideBarWindow(BaseWindow window) : base(window)
        {
            // BaseWindow = window;

        }
        public override void Draw()
        {
            this.baseWindow.Draw();
            WriteLine("Side Bar Window Instance");
        }
        public void WrapUp()
        {
            base.WrappedDraw();
        }
    }

    public class StatusBarWindow : DecoratorWindow
    {
        public StatusBarWindow(BaseWindow window) : base(window)
        {
            // BaseWindow = window;

        }
        public override void Draw()
        {
            this.baseWindow.Draw();
            WriteLine("Status Bar Window Instance");

        }
        public void WrapUp()
        {
            base.WrappedDraw();
        }
    }
}

#endif

namespace DeePattern.Decorator.InterfaceBased.BookSelling
{
    public class Book
    {
        /// <summary>
        /// 도서 
        /// </summary>
        public string Title;
        /// <summary>
        /// 도서 코드, 음수 방지
        /// </summary>
        public uint Code;
        /// <summary>
        /// 실제 가격
        /// </summary>
        public uint OriginPrice;
    }

    public enum PriceAssignResult : uint
    {
        Empty = uint.MinValue,
        InvalidPrice = uint.MaxValue
    }
    
    /// <summary>
    /// 추상 클래스로 가격을 정의한다.
    /// </summary>
    public abstract class BaseBookPrice
    {
        /// <summary>
        /// 생성 시에만 필드를 초기화 한다.
        ///  - private 으로 선언할 경우 하위 클래스 사용 불가
        /// </summary>
        // protected readonly Book yBook; // readonly 이므로 하위 클래스 할당 불가
        public Book yBook;
        /// <summary>
        /// 결제: 계산 후 총 합계 금액
        /// </summary>
        public uint TotalPrice = uint.MinValue;
        /// <summary>
        /// 결제: 가격 계산 결과
        /// </summary>
        /// public PriceAssignResult PAResult = PriceAssignResult.Empty;

        // public BaseBookPrice(Book item)
        // {
        //     yBook = item;
        // }

        public abstract uint GetPrice();
    }

    public interface IPrice
    {
        uint GetPrice();
    }

    public class OriginalBookPrice : IPrice
    {
        /// <summary>
        /// 생성 시에만 필드를 초기화 한다.
        ///  - private 으로 선언할 경우 하위 클래스 사용 불가
        /// </summary>
        // protected readonly Book yBook; // readonly 이므로 하위 클래스 할당 불가
        protected Book yBook;
        /// <summary>
        /// 결제: 계산 후 총 합계 금액
        /// </summary>
        /// public uint TotalPrice = uint.MinValue;
        /// <summary>
        /// 결제: 가격 계산 결과
        /// </summary>
        /// public PriceAssignResult PAResult = PriceAssignResult.Empty;

        public OriginalBookPrice(Book item)
        {
            yBook = item;
        }

        public uint GetPrice()
        {
#if DEBUG
            WriteLine("OriginalBookPrice : GetPrice");
#endif
            return yBook.OriginPrice;
        }
    }

    /// <summary>
    /// 접근자를 넣지 않은 것은 해당 DLL 에 대해 개발자가 
    /// BasePrice 를 엑세스하지 못하게 함이다?
    /// </summary>
    public abstract class SaleDecorator : IPrice
    {
        protected IPrice BookPrice;

        public SaleDecorator(IPrice baseBookPrice)
        {
            BookPrice = baseBookPrice;
        }

#if false
        public override uint GetPrice()
        {
#if DEBUG
            WriteLine("SaleDecorator : GetPrice");
#endif
            return BookPrice.GetPrice();
        }
#endif
        public abstract uint GetPrice();
    }

    /// <summary>
    /// 책을 빌릴 경우에는 정가에서 20% 정도 더 싸게한다.
    /// </summary>
    public class BorrowingSale : SaleDecorator
    {
        private readonly double DiscountRate;
        public BorrowingSale(IPrice baseBookPrice, double discountRate=0.2) : base(baseBookPrice)
        {
            DiscountRate = discountRate;
        }

        public override uint GetPrice()
        {
            double basePrice = BookPrice.GetPrice();
#if DEBUG
    WriteLine("BorrowingSale : GetPrice");
#endif
            var price = basePrice * ( 1 - DiscountRate);
            return (uint)price; 
        }
    }

    /// <summary>
    /// 헌 책일 경우에는 정가에서 50% 정도 더 싸게한다.
    /// </summary>
    public class UsedBookSale : SaleDecorator
    {
        private readonly double DiscountRate;
        public UsedBookSale(IPrice baseBookPrice, double discountRate = 0.5) : base(baseBookPrice)
        {
            DiscountRate = discountRate;
        }

        public override uint GetPrice()
        {
            double basePrice = BookPrice.GetPrice();
#if DEBUG
    WriteLine("UsedBookSale : GetPrice");
#endif
            var price = basePrice * (1 - DiscountRate);
            return (uint)price;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class BookPointSale: SaleDecorator
    {
        /// <summary>
        /// 상속 관계를 통해 반드시 IPrice 파라미터를 입력받도록 설계
        /// </summary>
        /// <param name="price"></param>
        public BookPointSale(IPrice price) : base(price)
        {

        }

        public override uint GetPrice()
        {
            throw new NotImplementedException();
        }
    }

    /// <summary>
    /// Yes24Point 를 사용하여 가격을 인하
    /// CAUTION: Yes24 Point 의 진위 여부를 식별하지 않는 단순 계산 클래스
    /// </summary>
    public class Yes24PointSale : SaleDecorator
    {
        protected uint Yes24Point;
        public Yes24PointSale(IPrice price, uint yes24point = 0) : base(price)
        {
            Yes24Point = yes24point;
        }

        public override uint GetPrice()
        {
            // throw new NotImplementedException();
            var price = BookPrice.GetPrice();
#if DEBUG
    WriteLine("Yes24PointSale : GetPrice");
#endif
            // 포인트가 가격보다 작거나 같으면 
            if ( price >= Yes24Point)
            {
                return price - Yes24Point;
            }
            else
            {
                throw new ArgumentException(message: "사용할 Yes24 포인트가 제품의 가격보다 크다.", paramName: nameof(Yes24Point));
            }
            
        }
    }
}



namespace DeePattern.Decorator.AbstractBased
{
    /// <summary>

    /// The 'Component' abstract class

    /// </summary>

    public abstract class Component

    {
        public abstract void Operation();
    }

    /// <summary>

    /// The 'ConcreteComponent' class

    /// </summary>

    public class ConcreteComponent : Component

    {
        public override void Operation()
        {
            Console.WriteLine("ConcreteComponent.Operation()");
        }
    }

    /// <summary>

    /// The 'Decorator' abstract class

    /// </summary>

    public class Decorator : Component

    {
        protected Component component;

        public void SetComponent(Component component)
        {
            this.component = component;
        }

        public override void Operation()
        {
            if (component != null)
            {
                component.Operation();
            }
        }
    }

    /// <summary>

    /// The 'ConcreteDecoratorA' class

    /// </summary>

    public class ConcreteDecoratorA : Decorator

    {
        public override void Operation()
        {
            base.Operation();
            Console.WriteLine("ConcreteDecoratorA.Operation()");
        }
    }

    /// <summary>

    /// The 'ConcreteDecoratorB' class

    /// </summary>

    public class ConcreteDecoratorB : Decorator
    {
        public override void Operation()
        {
            base.Operation();
            AddedBehavior();
            Console.WriteLine("ConcreteDecoratorB.Operation()");
        }

        void AddedBehavior()
        {
        }
    }

    public class ConcreteDecoratorC : Decorator
    {
        // 구현이 강제되지 않는다. 즉, 개발자가 어떠한 작업을 하기 위해서
        // 클래스 계층을 1 회 이상 파악해야 한다.
    }
}

namespace DoFactory.GangOfFour.Decorator.RealWorld
{
    /// <summary>

    /// MainApp startup class for Real-World 

    /// Decorator Design Pattern.

    /// </summary>

    class MainApp

    {
        /// <summary>

        /// Entry point into console application.

        /// </summary>

        static void DoDO()
        {
            // Create book

            Book book = new Book("Worley", "Inside ASP.NET", 10);
            book.Display();

            // Create video

            Video video = new Video("Spielberg", "Jaws", 23, 92);
            video.Display();

            // Make video borrowable, then borrow and display

            Console.WriteLine("\nMaking video borrowable:");

            Borrowable borrowvideo = new Borrowable(video);
            borrowvideo.BorrowItem("Customer #1");
            borrowvideo.BorrowItem("Customer #2");

            borrowvideo.Display();

            // Wait for user

            Console.ReadKey();
        }
    }

    /// <summary>

    /// The 'Component' abstract class

    /// </summary>

    abstract class LibraryItem

    {
        private int _numCopies;

        // Property

        public int NumCopies
        {
            get { return _numCopies; }
            set { _numCopies = value; }
        }

        public abstract void Display();
    }

    /// <summary>

    /// The 'ConcreteComponent' class

    /// </summary>

    class Book : LibraryItem

    {
        private string _author;
        private string _title;

        // Constructor

        public Book(string author, string title, int numCopies)
        {
            this._author = author;
            this._title = title;
            this.NumCopies = numCopies;
        }

        public override void Display()
        {
            Console.WriteLine("\nBook ------ ");
            Console.WriteLine(" Author: {0}", _author);
            Console.WriteLine(" Title: {0}", _title);
            Console.WriteLine(" # Copies: {0}", NumCopies);
        }
    }

    /// <summary>

    /// The 'ConcreteComponent' class

    /// </summary>

    class Video : LibraryItem

    {
        private string _director;
        private string _title;
        private int _playTime;

        // Constructor

        public Video(string director, string title,
          int numCopies, int playTime)
        {
            this._director = director;
            this._title = title;
            this.NumCopies = numCopies;
            this._playTime = playTime;
        }

        public override void Display()
        {
            Console.WriteLine("\nVideo ----- ");
            Console.WriteLine(" Director: {0}", _director);
            Console.WriteLine(" Title: {0}", _title);
            Console.WriteLine(" # Copies: {0}", NumCopies);
            Console.WriteLine(" Playtime: {0}\n", _playTime);
        }
    }

    /// <summary>

    /// The 'Decorator' abstract class

    /// </summary>

    abstract class Decorator : LibraryItem

    {
        protected LibraryItem libraryItem;

        // Constructor

        public Decorator(LibraryItem libraryItem)
        {
            this.libraryItem = libraryItem;
        }

        public override void Display()
        {
            libraryItem.Display();
        }
    }

    /// <summary>

    /// The 'ConcreteDecorator' class

    /// </summary>

    class Borrowable : Decorator

    {
        protected List<string> borrowers = new List<string>();

        // Constructor

        public Borrowable(LibraryItem libraryItem)
          : base(libraryItem)
        {
        }

        public void BorrowItem(string name)
        {
            borrowers.Add(name);
            libraryItem.NumCopies--;
        }

        public void ReturnItem(string name)
        {
            borrowers.Remove(name);
            libraryItem.NumCopies++;
        }

        public override void Display()
        {
            base.Display();

            foreach (string borrower in borrowers)
            {
                Console.WriteLine(" borrower: " + borrower);
            }
        }
    }
}
