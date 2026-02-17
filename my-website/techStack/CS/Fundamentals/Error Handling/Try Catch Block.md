In C#, error handling code can be written separately:
- Application code executes
- Covered by exception handling code
- Exceptions that occur can be handled
## Structure
```CS
try
{
  // Code goes here
}
catch(Exception ex)
{
  //Here we can handle the exceptions
  throw;
}
```
### Example
```CS
try
{
  string input = Console.ReadLine();
  int a = int.Parse(input);
}
catch(FormatException fex)
{
	
}
```
### Using Multiple Exception Types
Multiple exceptions can be used. The ones on top are verified first. We can use the general Exception to catch all errors.
```CS
try
{
  string input = Console.ReadLine();
  int a = int.Parse(input);
  int b = 10 / a;
}
catch(FormatException fex)
{
  //Handle exception
}
catch(DivideByZeroException dbzex)
{
  //Handle exception
}
//This exception will be invoked if any other type of exception occurs
catch(Exception ex)
{
  //Handle exception
}
```
### Finally
If we have code that needs to run regardless if all went fine or not, we can add a finally block.
```CS
try
{
  // Code goes here
}
catch(Exception ex)
{
  //Here we can handle the exceptions
  throw;
}
finally
{
  //This will always execute
}
```