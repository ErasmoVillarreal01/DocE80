- Called when instantiating an object
- Default or custom
- Used to set initial values

```CS
public class MyClass
{
  public string firstName;
  public int age;
	
  public Employee(string name, int ageValue)
  {
    firstName = name;
    age = ageValue;
  }
}
```

A default constructor will be generated of no other constructors are defined.