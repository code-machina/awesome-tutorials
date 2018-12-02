# virtual modifier

아래와 같은 표현을 `auto-implemented property` 라고 부른다.
프로퍼티의 이름은 `Name` 이다.

```csharp
public virtual string Name { get; set; }
```

아래와 같은 표현을 `ordinary property` 라고 부른다.
프로퍼티의 이름은 `Number` 이다.

```csharp
private int num;
public virtual int Number
{
    get { return num; }
    set { num = value; }
}
```