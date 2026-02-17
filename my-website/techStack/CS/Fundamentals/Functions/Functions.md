Functions or Methods are code blocks that can receive parameters and can also return value.
- Methods are always declared inside an object or struct.
- Return type must be specified
- Value must be returned for all posible execution paths

C# Syntax for methods:
```CS
<access modifier> <return type> Method_Name (Parameters) {
  //Method Statements
}
```
### Method example
Example:
```CS
public int AddTwoNumbers (int a, int b) {
  return a + b;
}
```

To call the method:
```CS
int p1 = 3;
int p2 = 52;
int result = AddTwoNumbers(p1, p2);
```

To call the correct method you must ensure:
- Method Name
- Parameter types and arguments
- Number of parameters (because of [[#Overloading Methods]])
### No return value
If the method does not return a value we must use `void`:
```CS
public void DisplaySum(int a, int b) {
  int sum = a + b;
  Console.WriteLine("The sum is " + sum)
}
```
### Overloading Methods
Overloading methods is when there are multiple methods with the same name but with different:
- Number of parameters
- Types of parameters
```CS
public void DisplaySum(int a, int b) {
  int sum = a + b;
  Console.WriteLine("The sum is " + sum)
}
public void DisplaySum(int a, int b, int c) {
  int sum = a + b + c;
  Console.WriteLine("The sum is " + sum)
}
```
### Optional Parameters
Optional parameters are defined when the arguments have a default value:
```CS
public int AddNumbers(int a, int b, int c = 100)
{
  int sum = a + b + c;
  return sum;
}

AddNumbers(10, 20);
AddNumbers(10, 20, 30);
```
### Named Arguments
If arguments are named, the order does not matter:
```CS
public static int AddNumbers(int a, int b)
{
  ...
}

AddNumbers(b: 10, a: 20);
```
### Expression Bodied Members
When the method is single lined, can use a short hand syntax for a method:
```CS
public static int CalculateYearlyWageExpressionBodied(int monthlyWage, int numberOfMonthsWorked, int bonus) => monthlyWage * numberOfMonthsWorked + bonus;
```