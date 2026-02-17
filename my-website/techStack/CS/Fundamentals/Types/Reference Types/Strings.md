Strings contain a text and are stored as a list of char objects.

To create a string there are two options:
```CS
//Option 1: With value
string s1 = "Hello world";
//Option 2: Without value
string s2 = string.Empty;
string s3 = "";
```

### String Methods
#### ToLower
Lower cases the string:
```CS
string lower = myString.ToLower();
```
#### ToUpper
Upper cases the string:
```CS
string upper = myString.ToUppercase();
```
#### Length
Gives the length of a string:
```CS
int l = myString.Length;
```
#### Contains
Check if a string contains another string, returns bool
```CS
bool b = myString.Contains("hello");
```
#### Replace
Replace a with b in the string
```CS
string s = myString.Replace("a", "b");
```
#### Substring
Get the part of the string (zero based)
```CS
string sub = myString.Substring(1, 3);
```
#### Concat
Joins strings:
```CS
string s3 = String.Concat(s1, s2);
```
#### Format
Another way to join strings:
```CS
string greetingText = string.Format("Hello {0}, you are {1} years", employeeName, age);
```
#### String Interpolation
Also another way to concatenate, often better and easier to read:
```CS
string greetingText = $"Hello {employeeName}, you are {age} years";
```
#### Trim
Cleans all white space from the string:
```CS
string s = myString.Trim()
```