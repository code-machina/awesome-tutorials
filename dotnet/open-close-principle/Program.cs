﻿using System;
using System.Collections;
using System.Collections.Generic;

namespace open_close_principle
{

    public enum Color
    {
        Red, Green, Blue
    }

    public enum Size
    {
        Small, Medium, Large, Yuge
    }

    public class Product
    {
        public string Name;
        public Color Color;
        public Size Size;

        public Product(string name, Color color, Size size)
        {
            if (name == null)
            {
                throw new ArgumentNullException(paramName: nameof(name));
            }
            Name = name;
            Color = color;
            Size = size;
        }
    }
    public class ProductFilter
    {
        public IEnumerable<Product> FilterBySize(IEnumerable<Product> products, Size size)
        {
            foreach (var p in products)
                if (p.Size == size)
                    yield return p;
        }

        public IEnumerable<Product> FilterByColor(IEnumerable<Product> products, Color color)
        {
            foreach (var p in products)
                if (p.Color == color)
                    yield return p;
        }

        public IEnumerable<Product> FilterBySizeAndColor(IEnumerable<Product> products, Color color, Size size)
        {
            foreach (var p in products)
                if (p.Color == color && p.Size == size)
                    yield return p;
        }
    }

    public interface ISpecification<T>
    {
        bool IsSatisfied(T t);
    }

    public interface IFilter<T>
    {
        IEnumerable<T> Filter(IEnumerable<T> items, ISpecification<T> spec);
    }

    public class ColorSpecification : ISpecification<Product>
    {
        private Color color;

        public ColorSpecification(Color color)
        {
            this.color = color;
        }

        public bool IsSatisfied(Product t)
        {
            return t.Color == color;
        }
    }
    public class SizeSpecification : ISpecification<Product>
    {
        private Size size;
        public SizeSpecification(Size size)
        {
            this.size = size;
        }
        public bool IsSatisfied(Product t)
        {
            return t.Size == size;
        }
    }

    public class AndSpecification<T> : ISpecification<T>
    {
        private ISpecification<T> first, second;

        public AndSpecification(ISpecification<T> first, ISpecification<T> second)
        {
            this.first = first ?? throw new ArgumentNullException(paramName: nameof(first));
            this.second = second ?? throw new ArgumentNullException(paramName: nameof(second));
            /*
            if(first == null)
            {
                throw new ArgumentNullException(paramName: nameof(first));
            }

            if(second == null)
            {
                throw new ArgumentNullException(paramName:nameof(second));
            }

            this.first = first;
            this.second = second;
             */
        }

        public bool IsSatisfied(T t)
        {
            return first.IsSatisfied(t) && second.IsSatisfied(t);
        }
    }

    public class BetterFilter : IFilter<Product>
    {
        public IEnumerable<Product> Filter(IEnumerable<Product> items, ISpecification<Product> spec)
        {
            foreach (var i in items)
                if (spec.IsSatisfied(i))
                    yield return i;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            var apple = new Product("Apple", Color.Green, Size.Small);
            var tree = new Product("Tree", Color.Blue, Size.Medium);
            var house = new Product("House", Color.Red, Size.Large);

            Product[] products = { apple, tree, house };

            var pf = new ProductFilter();
            Console.WriteLine("Green Product (old)");
            foreach (var pr in pf.FilterBySize(products, Size.Small))
            {
                Console.WriteLine($"{pr.Name} is small");
            }

            foreach (var pr in pf.FilterByColor(products, Color.Red))
            {
                Console.WriteLine($"{pr.Name} is Red");
            }

            var bf = new BetterFilter();
            Console.WriteLine("Green Product");
            foreach (var p in bf.Filter(products, new ColorSpecification(Color.Green)))
            {
                Console.WriteLine($"{p.Name} is Green");
            }

            foreach (var p in bf.Filter(products, new AndSpecification<Product>(new ColorSpecification(Color.Green), new SizeSpecification(Size.Small))))
            {
                Console.WriteLine($"{p.Name} is Green");
            }

        }
    }
}
