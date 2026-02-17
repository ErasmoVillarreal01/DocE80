Encapsulation refers to containing information inside of the object. Where only certain information is exposed. The internal data and implementations are hidden.
## C# Example

### Adding private to atributes
```CS
public class Employee
{
  private string firstName;
  private int age;
}
```
### Adding methods to view and alter data
```CS
public class Employee
{
  private string firstName;
  private int age;
	
  public int GetAge()
  {
    return age;
  }
	
  public void SetAge()
  {
    age = newAge;
  }
}
```
### Optimal Choice: Adding Properties to Attributes
Properties:
- Wraps data (fields) of a class
- Hide implementation
- Define get and set implementation
```CS
public class Employee
{
  private int age;
  public int Age
  {
    get { return age; }
    set {
	  age = value;
    }
  }
}
```