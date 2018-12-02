# DotNet Syntax 정리

DotNet Core 에서 사용되는 문법을 정리한다.

## 문서 구조

이 문서의 구조는 다음과 같다.

```markdown
## [title/topic]

Some Descriptions ......

Some Sample Codes ......

[Code Sample Link](relative_link)
```

각각의 토픽은 다른 토픽과 독립적이며 연결되는 소스코드는 별도로 구성되거나 소스코드가 없다. 따라서, 이슈를 검색하고자 할 때 검색자는 키워드를 기반으로 해당 문서를 검색하여 원하는 정보를 얻어야 한다. 그리고 기록자는 문법적인 지식을 키워드 및 주제를 기반으로 여기에 간단히 정리한다.

## 인라인 함수 선언

아래와 같이 함수를 선언할 수 있음.

```csharp
static public int Area(Rectangle r) => r.Width * r.Height;
```

## 상속 및 초기화를 Getter Setter 에서?

Reactangle 을 상속한 Square 내에서 Rectangle 의 멤버 변수인 Width 와 Height 를 초기화한다. 이때 키워드가 new 임을 확인한다.

```csharp
public class Square : Rectangle
{
    public new int Width
    {
        set
        {
            base.Width = base.Height = value;
        }
    }
    public new int Height
    {
        set
        {
                base.Width = base.Height = value;
        }
    }
}
```

## virtual keyword

[csharp virtual](https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/virtual)

csharp 에서 virtual 키워드는 하위 클래스(파생 클래스)에서 재정의될 수 있도록 지정하는 키워드이다. 재정의되는 항목은 메서드, 프로퍼티, 인덱서, 이벤트 선언이다.

> The virtual keyword is used to modify a method, property, indexer, or event declaration and allow for it to be overridden in a derived class. For example, this method can be overridden by any class that inherits it:

가상 메서드가 호출될 때, 런타임 타입의 객체는 재정의 멤버를 검사한다. 가장 말단의 파생 클래스의 재정의 멤버가 호출될 떄, 만약 파생 클래스의 멤버가 재정의되지 않았다면 오리지널 멤버가 호출된다. 즉, virtual 이라고 지정하여도 호출가능한 멤버이다.

**TIP. virtual 한정자(modifier)는 static, abstract, private, override 한정자(modifier)들과는 쓸 수 없다.**

[샘플 참조](./virtual-keyword/README.md)

## override 와 new 키워드를 이용해서 버전 관리가 가능

[참조 문서 링크](https://docs.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/versioning-with-the-override-and-new-keywords)

요약:
파생 클래스의 멤버와 동일한 이름을 가진 기본 클래스에 새 멤버가 추가되면 ..... 아 귀찮아 

TODO: 이거 추가하자....