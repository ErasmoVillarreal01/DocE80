An array is a data structure to store multiple variables.
- All variables must have the same type (can be objects)
- Accessed through the use of index (index starts at 0)
- Arrays are reference types
- Creation happens when using new
- Size is set when creating the array
## Basic Functions
#### Creating an array:
```CS
int[] allEmployeeIds;
DateTime[] startDates;

//Creating aray of 4 int values
int[] allEmployeeIds = new int[4];
```
#### Populating the array
```CS
int[] allEmployeeIds = new int[4] {11, 44, 179, 161};
int[] aupportStaffIds = new int[] {8, 22};
```
#### Updating an index value
```CS
allEmployeeIds[0] = 123;
```
## Array Methods
#### CopyTo()
```CS
int[] employeeIdsCopy = new int[length];
employeeIds.CopyTo(employeeIdsCopy, 0);
```
#### Sort()
```CS
Array.Sort(employeeIds);
```
#### Reverse()
```CS
Array.Reverse(employeeIds);
```
#### Length
```CS
int arrayLength = employeeIds.Length;
```