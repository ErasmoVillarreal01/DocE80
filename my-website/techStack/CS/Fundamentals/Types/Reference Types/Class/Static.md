The keyword `static` defines something on the class level, not on the object level. A value for one object is the same for the others.

When a static variable is changed, the new value is immediately reflected everywhere in the program that accesses that variable.
### Example:
```CS
public class Employee
{
  public static double bonusPercentage = 0.15;
}
```
### Changing static data with static method:
```CS
public class Employee
{
  public static double bonusPercentage = 0.15;
  public statuc void IncreaseBonusPercentage(double newPercentage)
  {
    bonusPercentage = newPercentage;
  }
} 
```
### Invoking a static method
```CS
Employee.IncreaseBonusPercentage(0.2);
//Called on the Employee class not on an Employee object! 
```