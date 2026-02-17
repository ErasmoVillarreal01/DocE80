Used to iterate over an array or list of items.
#### Example:
```CS
Employee[] employees = new Employee[2];

employees[0] = bethany;
employees[1] = george;

foreach(Employee e in employees)
{
  e.DisplayEmployeeDetails();
  var numberOfHoursWorked = new Random().Next(25);
  e.PerformWork(numberOfHoursWorked);
  e.ReceiveWage();
}
```