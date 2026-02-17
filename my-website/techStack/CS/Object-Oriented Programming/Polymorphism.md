Allows objects of different types to be treated through a common interface, with a single function or method behaving differently depending on the object it acts upon.
- Override a base class method with a new implementation
- Uses `virtual` and `override` keywords
### `virtual`
`virtual` keyword is used in the base class to define a method that can be overridden in a derived class.
### `override`
`override` keyword is used in the derived class to provide a specific implementation of a method defined in the base class.
## C# Example

### Polymorphism Example
```CS
public class Employee
{
  public virtual void PerformWork()
  {...}
}

public class Manager: Employee
{
  public override void PerformWork()
  {...}
}
```