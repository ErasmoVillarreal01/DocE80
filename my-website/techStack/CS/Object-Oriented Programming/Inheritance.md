Classes can reuse functionality from other classes. Relation exists between classes. This means lower development time because of re usability.
- Parent (or base) and derived class
- Easier to maintain
- Can be one or more levels deep

We use the Is-A Relation to refer that a derived class **is also a** base class.
![Inheritance](../../../static/img/techStack/cs/inheritance.png)
## C# Example
### Creating a Derived Class
```CS
public class BaseClass
{
}

public class DerivedClass: BaseClass
{
}
```
### Accessing the Base Class Members
To access base class members, use the `protected` [[Access Modifiers|access modifier]] to be able to use the member.
```CS
public class Employee
{
  protected string name;
	
  public void PerformWork()
  {
	
  }
}

public class Manager: Employee
{
  public void DisplayData()
  {
    Console.WriteLine(name);
  }
}
```