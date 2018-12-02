using System;

namespace virtual_keyword
{
    class MyBaseClass
    {
        /* 아래와 같은 선언 방식을 `virtual auto-implemented property` 라고 부른다. 해석하면 가상의 자동으로 구현된 프로퍼티이다. 재정의가
        get 과 set 의 accessor(접근자)를 구현하면 구체화된 행위를 제공할 수 있다.
         */
        public virtual string Name {get;set;}

        /* 일반적인 virtual property 이다. backing field 를 포함한다. 여기서 backing field 란 `num` 멤버를 의미한다. 
         */
        private int num;
        public virtual int Number{
            get {return num;}
            set {num = value;}
        }

    }

    /* MyDerivedClass Derived From MyBaseClass */
    class MyDerivedClass : MyBaseClass {
        private string name;

        /* 일반 프로퍼티(`Name`)로 통해 자동 구현된 프로퍼티를 재정의하면서 구체화된 accessor 행위를 제공할 수 있다. */
        public override string Name {
              get
           {
               return name;
           }
           set
           {
               if (value != String.Empty)
               {
                   name = value;
               }
               else
               {
                   name = "Unknown";
               }
           }
        }
    }
    class TestClass
{
    public class Shape
    {
        public const double PI = Math.PI;
        protected double x, y;
        public Shape()
        {
        }
        public Shape(double x, double y)
        {
            this.x = x;
            this.y = y;
        }

        public virtual double Area()
        {
            return x * y;
        }
    }

    public class Circle : Shape
    {
        public Circle(double r) : base(r, 0)
        {
        }

        public override double Area()
        {
            return PI * x * x;
        }
    }

    class Sphere : Shape
    {
        public Sphere(double r) : base(r, 0)
        {
        }

        public override double Area()
        {
            return 4 * PI * x * x;
        }
    }

    class Cylinder : Shape
    {
        public Cylinder(double r, double h) : base(r, h)
        {
        }

        public override double Area()
        {
            return 2 * PI * x * x + 2 * PI * x * y;
        }
    }

    static void Main()
    {
        double r = 3.0, h = 5.0;
        Shape c = new Circle(r);
        Shape s = new Sphere(r);
        Shape l = new Cylinder(r, h);
        // Display results:
        Console.WriteLine("Area of Circle   = {0:F2}", c.Area());
        Console.WriteLine("Area of Sphere   = {0:F2}", s.Area());
        Console.WriteLine("Area of Cylinder = {0:F2}", l.Area());
        }
    }
    /*
        Output:
        Area of Circle   = 28.27
        Area of Sphere   = 113.10
        Area of Cylinder = 150.80
    */
}
