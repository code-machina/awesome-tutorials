using System;
using System.Collections.Generic;
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


}
