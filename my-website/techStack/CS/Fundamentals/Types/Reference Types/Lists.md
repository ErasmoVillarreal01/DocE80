A list is a type of collection. Similar to [Arrays](Arrays.md) but can have dynamic length.
## Basic Functions
```CS
List<int> employeeIds = new List<int>();
```

Adding or removing items are done with methods:
```CS
List<int> employeeIds = new List<int>();

employeeIds.Add(1);
employeeIds.Add(99);
employeeIds.Add(458);

employeeIds.Remove(1);

int selectedId = employeeIds[2];
```

To get the length we use Count:
```CS
int length = employeeIds.Count;
```
## Methods
### Contains()
```CS
if(employeeIds.Contains(78))
{
  Console.WriteLine("78 is found");
}
```
### ToArray()
```CS
var employeeIdsArray = employeeIds.ToArray();
```
### Clear()
```CS
employeeIds.Clear();
```