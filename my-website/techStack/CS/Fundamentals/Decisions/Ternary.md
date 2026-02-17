The ternary operator evaluates a boolean expression and returns the result of one of two expressions. Similar to [If Statment](If.md) but only supports to results.

Ternary syntax in C#:
```CS
condition ? consequent : alternative;
```

Example:
```CS
int tempInCelsius = 15;
string weather = tempInCelsius < 20.0 ? "Cold." : "Perfect!";

//Will print Cold
Console.WriteLine(weather);
```