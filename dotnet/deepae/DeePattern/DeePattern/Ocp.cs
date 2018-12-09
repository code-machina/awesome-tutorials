using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DeePattern.SOLID.OCP.VIOLATION
{
    /// <summary>
    /// 제품의 색깔에 대한 열거 타입 정의
    /// </summary>
    public enum Color
    {
        Red, Green, Blue
    }

    /// <summary>
    /// 제품의 크기에 대한 열거 타입 정의
    /// </summary>
    public enum Size
    {
        Small, Medium, Large, Yuge
    }

    /// <summary>
    /// Product 클래스는 제품의 이름 색깔, 크기를 멤버로 한다.
    /// 개별 제품의 사양(Spec) 정보를 포함하여 사용자가 원하는 정보를 
    /// 필터하여 보여준다.
    /// </summary>
    public class Product
    {
        public string Name;
        public Color Color;
        public Size Size;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name">유 </param>
        /// <param name="color"></param>
        /// <param name="size"></param>
        public Product(string name, Color color, Size size)
        {
            Name = name ?? throw new ArgumentNullException(paramName: nameof(name));
            Color = color;
            Size = size;
        }
    }

    public class ProductFilter
    {
        public IEnumerable<Product> FilterByColor(IEnumerable<Product> products, Color color)
        {
            foreach (var p in products)
                if (p.Color == color)
                    yield return p;
        }

        public static IEnumerable<Product> FIlterBySize(IEnumerable<Product> products, Size size)
        {
            foreach (var p in products)
                if (p.Size == size)
                    yield return p;
        }

        public static IEnumerable<Product> FilterByColorAndSize(IEnumerable<Product> products, Color color, Size size)
        {
            foreach (var p in products)
                if (p.Size == size && p.Color == color)
                    yield return p;
        }
    }
}

namespace DeePattern.SOLID.OCP.CORRECTNESS
{
    /// <summary>
    /// 제품의 색깔에 대한 열거 타입 정의
    /// </summary>
    public enum Color
    {
        Red, Green, Blue
    }

    /// <summary>
    /// 제품의 크기에 대한 열거 타입 정의
    /// </summary>
    public enum Size
    {
        Small, Medium, Large, Yuge
    }

    /// <summary>
    /// Product 클래스는 제품의 이름 색깔, 크기를 멤버로 한다.
    /// 개별 제품의 사양(Spec) 정보를 포함하여 사용자가 원하는 정보를 
    /// 필터하여 보여준다.
    /// </summary>
    public class Product
    {
        public string Name;
        public Color Color;
        public Size Size;
        public int Price;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name">유 </param>
        /// <param name="color"></param>
        /// <param name="size"></param>
        public Product(string name, Color color, Size size, int price)
        {
            Name = name ?? throw new ArgumentNullException(paramName: nameof(name));
            Color = color;
            Size = size;
            Price = price;
        }
        public Product()
        {

        }
    }

    public enum BookCategory
    {
        Novel,
        Bio,
        Essay,
        Travel,
        Infantry,

    }

    public class Book
    {
        public string Author;
        public DateTime Since;
        public string Title;
        public BookCategory Category;

        public Book(string author, DateTime since, string title, BookCategory category)
        {
            Author = author ?? throw new ArgumentNullException(paramName: nameof(author));
            Since = since;
            Title = title ?? throw new ArgumentNullException(paramName: nameof(title));
            Category = category;
        }
    }

    public class GenericFilter<T>
    {
        public IEnumerable<T> Filter(IEnumerable<T> filtee, ISpecification<T> spec)
        {
            foreach (var item in filtee)
                if (spec.IsSatisfiedBy(item))
                    yield return item;
        }
    }

    /* Specification 패턴
     * Filter 를 수정 없이 사용할 수 있도록 정의해야한다.
     * 
     */
    
    /// <summary>
    /// Specification 인터페이스를 생성한다.
    /// 
    /// </summary>
    public interface ISpecification<T>
    {
        bool IsSatisfiedBy(T t1);
        ISpecification<T> And(ISpecification<T> t1);
        ISpecification<T> AndNot(ISpecification<T> t1);
        ISpecification<T> Or(ISpecification<T> t1);
        ISpecification<T> OrNot(ISpecification<T> t1);
        ISpecification<T> Not();
    }
    

    /// <summary>
    /// LINQ 를 활용할 수 있다.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class LinqSpecification<T>: CompositeSpecification<T>
    {
        public abstract Expression<Func<T, bool>> AsExpression();
        public override bool IsSatisfiedBy(T candidate) => AsExpression().Compile()(candidate);
    }

    /// <summary>
    /// Abstract Aggregate Composite Specification Class
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class CompositeSpecification<T> : ISpecification<T>
    {
        public ISpecification<T> And(ISpecification<T> t1)
        {
            return new AndSpecification<T>(this, t1);
        }

        public ISpecification<T> AndNot(ISpecification<T> t1)
        {
            return new AndNotSpecification<T>(this, t1);
        }

        /// <summary>
        /// IsSatisfiedBy 메서드는 추상 클래스로 선언하여 override 하도록 한다.
        /// </summary>
        /// <param name="t1"></param>
        /// <returns></returns>
        public abstract bool IsSatisfiedBy(T t1);

        public ISpecification<T> Not()
        {
            throw new NotImplementedException();
        }

        public ISpecification<T> Or(ISpecification<T> t1)
        {
            throw new NotImplementedException();
        }

        public ISpecification<T> OrNot(ISpecification<T> t1)
        {
            throw new NotImplementedException();
        }
    }

    public class AndSpecification<T> : CompositeSpecification<T>
    {
        ISpecification<T> left;
        ISpecification<T> right;

        public AndSpecification(ISpecification<T> left, ISpecification<T> right)
        {
            this.left = left;
            this.right = right;
        }

        public override bool IsSatisfiedBy(T t1)
        {
            return left.IsSatisfiedBy(t1) && right.IsSatisfiedBy(t1);
        }
    }

    public class AndNotSpecification<T> : CompositeSpecification<T>
    {
        ISpecification<T> left;
        ISpecification<T> right;

        public AndNotSpecification(ISpecification<T> left, ISpecification<T> right)
        {
            this.left = left;
            this.right = right;
        }

        public override bool IsSatisfiedBy(T t1)
        {
            /* Truth Table
             * !(A & B) 
             * true true => false
             * false true => true
             * false false => true
             */

            return left.IsSatisfiedBy(t1) && right.IsSatisfiedBy(t1) != true;
        }
    }

    public class OrSpecification<T> : CompositeSpecification<T>
    {
        ISpecification<T> left;
        ISpecification<T> right;

        public OrSpecification(ISpecification<T> left, ISpecification<T> right)
        {
            this.left = left;
            this.right = right;
        }

        public override bool IsSatisfiedBy(T t1)
        {
            /* Truth Table
             * !(A & B) 
             * true true => false
             * false true => true
             * false false => true
             */

            return left.IsSatisfiedBy(t1) || right.IsSatisfiedBy(t1);
        }
    }
    public class OrNotSpecification<T> : CompositeSpecification<T>
    {
        ISpecification<T> left;
        ISpecification<T> right;

        public OrNotSpecification(ISpecification<T> left, ISpecification<T> right)
        {
            this.left = left;
            this.right = right;
        }

        public override bool IsSatisfiedBy(T t1)
        {
            /* Truth Table
             * !(A & B) 
             * true true => false
             * false true => true
             * false false => true
             */

            return left.IsSatisfiedBy(t1) || right.IsSatisfiedBy(t1) != true;
        }
    }

    public class NotSpecification<T> : CompositeSpecification<T>
    {
        ISpecification<T> other;
        public NotSpecification(ISpecification<T> other) => this.other = other;
        public override bool IsSatisfiedBy(T t1)
        {
            return !other.IsSatisfiedBy(t1);
        }
    }

}
