Switch is similar to the [If Statement](If.md) in that it is also used to perform actions based on conditions but is used to handle different cases and a default case.

Rules for switch statements:
- Works for must data types but **does not work for float or double**
- Each case must be unique
- First true will get executed
- Default will always be executed last.

Switch Syntax in C#:
```CS
switch(expression) {
  case constant expression 1:
    //Other statements
    break;
  case relational expression 2:
    //Other statements
    break;
  ...
  default:
    //Other statements
    break;
}
```

Example:
```CS
switch(age){
  case < 18:
    Console.WriteLine("Too young to apply");
    break;
  case > 65:
    Console.WriteLine("Too old to apply");
    break;
  case 23:
    Console.WriteLine("You are exactly what we are looking for");
    break;
  case < 0:
    Console.WriteLine("Invalid age");
    break;
  default:
    Console.WriteLine("You can continue with the application");
    break;
}
```