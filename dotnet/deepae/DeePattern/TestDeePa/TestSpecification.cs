using NUnit.Framework;
using System;
using System.Collections.Generic;
using static System.Console;
using DeePattern.SOLID.OCP.CORRECTNESS;

namespace TestDeePa
{
    public class TestSpecification
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Filter_by_Specification()
        {
            /* 제품의 데이터를 조직하고 조건에 맞는 제품을 필터링하는 
             * 상세 비즈니스 로직을 통해 다음의 시나리오를 만족한다.
             * 
             * */

            /* 시나리오: 
             * 개발자 A 는 사업부로 부터 다음의 개발 요청을 접수하였다. 
             * 
             * 상품에는 "가격", "출판사", "판매 권수", "수익률" 이 있습니다.
             * 저희 사업부는 위의 네 가지 기준 이외에도 추가적인 조건을 걸 수 있는
             * 검색 화면을 기획하여 이를 개발 요청을 드립니다.
             * 
             * 해석:
             * Product 클래스는 위의 4 가지 외 1 개 필드를 더 가지고 있다. 
             * 웹에서 개발하고 있으므로 추가 패턴은 작성하여 추가하면 그만이다.
             * 
             * 가격 정보는 수치(numeric)이므로 <, <= ,>=, == 등에 대한 연산이 필요하다.
             * 문자열 정보는 단순 매칭이므로 문자열 비교 == 만 사용하면 된다. 
             * 수익율은 double 혹은 float 이므로 별도의 로직이 필요할 것으로 생각된다. 
             * 
             * */

            Product[] goods = new Product[]
            {
                new Product{Name="행복은 자아성취감",
                    Color =Color.Blue,
                    Size =Size.Large,
                    Price =54000 },
                new Product{Name="짧은 글의 행복",
                    Color =Color.Red,
                    Size =Size.Small,
                    Price =12000 },
                new Product{Name="변화하기, 변화관리",
                    Color =Color.Green,
                    Size =Size.Medium,
                    Price =32000 },
            };

            // Product 의 가격이 20000 원 초과이고 
            // 색깔이 Blue 인 책을 출력해주세요

            var filter = new GenericFilter<Product>();
            foreach (var item in filter.Filter(goods, new ColorSpec(Color.Blue).And(new GreaterThanSpec(20000))))
            {
                WriteLine(item.Name); // Expected -> output: "행복은 자아성취감"
                Assert.AreSame(goods[0], item); // Expected -> True
            }

            foreach (var item in filter.Filter(goods, new PredicateSpec((t) => t.Color == Color.Green && t.Price > 30000 && t.Price < 40000)))
            {
                WriteLine(item.Name); // Expected -> output: "변화하기, 변화관리"
                Assert.AreSame(goods[2], item); // Expected -> True
            }
        }
    }

    public class ColorSpec : CompositeSpecification<Product>
    {

        protected Color Color;
        public ColorSpec(Color color)
        {
            this.Color = color;
        }

        public override bool IsSatisfiedBy(Product t1)
        {
            return t1.Color == Color;
        }
    }

    public class PredicateSpec : CompositeSpecification<Product>
    {
        public Predicate<Product> predicate;

        public PredicateSpec(Predicate<Product> predicate)
        {
            this.predicate = predicate;
        }

        public override bool IsSatisfiedBy(Product t1)
        {
            return predicate.Invoke(t1);
        }
    }


    public class GreaterThanSpec : CompositeSpecification<Product>
    {

        protected int Price;
        public GreaterThanSpec(int price)
        {
            this.Price = price;
        }

        public override bool IsSatisfiedBy(Product t1)
        {
            return t1.Price > Price;
        }
    }

    public class EqualToSpec : CompositeSpecification<Product>
    {

        protected int Price;
        public EqualToSpec(int price)
        {
            this.Price = price;
        }

        public override bool IsSatisfiedBy(Product t1)
        {
            return t1.Price == Price;
        }
    }
}
