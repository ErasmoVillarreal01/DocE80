There are two different data types in C#:
- Predefined Types
- User-defined Types
### Predefined Data Types
- `bool`
- `int`
- `float`
- `double`
- `decimal`
- `char`
- `byte`
- `short`
- `object`
- `string`
### Variables
When creating a variable, you must specify the type:
```CS
int a;
a = 2;
int b = a + 3;
bool c = true;
```
Can create multiple variables from the same type in the same expression:
```CS
int first = 1, second = 2;
```
#### Converting Types
Types can be converted into other types using explicit type conversion:
```CS
double d = 123456789.0;
int x = (int)d;
```
### Var
We can use `var` to declare a variable without declaring type, type is inferred. An initial value must be declared:
```CS
var monthlyWage = 1234;
var isActive = true;

// This wont work!
var x;
```

### Constants
When declaring a constant, must use the keyword `const`:
```CS
const double insterstRate = 0.07;
```