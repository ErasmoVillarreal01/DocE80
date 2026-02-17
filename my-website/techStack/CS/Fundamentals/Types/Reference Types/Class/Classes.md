With classes we can create custom types. **A class is the blueprint of an object**.
- Defines data and functionality to work on its data.
- Most Code in C# lives inside a class
### Template
```CS
public class MyClass
{
  public int a;
  public string b;
	
  public void MyMethod()
  {
    Console.WriteLine("Hello World");
  }
}
```
Classes contain:
- Fields ->Class level variables that contain data
- Methods -> Class level functionality (functions)
- Properties -> Wrap fields
### Employee Class Example
```CS
public class Employee
{
  public string firstName;
  public int age;
	
  public void PerformWork()
  {
	
  }
}
```
To create an object from a class:
```CS
Employee employee = new Employee();
//or
Employee employee = new;
```
- `Employee`: Variable type
- `employee`: Variable name
- `new Employee()` Create object
## Records
A record is a type of class that does not allow to modify its data once its been initialized or created.
```CS
public record Account
{
  private string accountNumber;

  public string AccountNumber
  {
    get { return accountNumber; }
    set 
    {
      accountNumber = value;
    }
  }
}
```

**Important**
A short hand syntax (auto property) exists for declaring a record since its very common.
This code: 
```cs
public class MyClass
{
  public string Name { get; set; }
}
```
Represents this code:
```cs
public class MyClass
{
  private string name;
  public string Name 
  {
    get { return this.name; }
    set { this.name = value; }
  }
}
```
