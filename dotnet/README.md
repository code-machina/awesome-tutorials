# .Net Syntax 정리

# 인라인 함수 선언

아래와 같이 함수를 선언할 수 있음.

```csharp
static public int Area(Rectangle r) => r.Width * r.Height;
```


# 상속 및 초기화를 Getter Setter 에서?

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