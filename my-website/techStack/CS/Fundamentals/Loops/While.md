While loops are used to execute actions until a certain condition is met. The condition is first evaluated and then the actions are executed.
Braces required if more than one statement.

While loop C# syntax:
```CS
while (boolean expression) {
  //statements
}
```

Example:
```CS
int i = 0;
while (i <  10) {
  Console.WriteLine(i);
  i++;
}
```

## Do While
The do while is very similar to the while statement but executes the action before verifying the condition.
```CS
int i = 0;

do {
  Console.WriteLine(i);
  i++;
} while (i < 10);
```