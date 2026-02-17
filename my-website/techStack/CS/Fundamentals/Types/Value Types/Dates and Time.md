`DateTime` type is used to represent a date and even hour.
`TimeSpan` type also exists to represent a duration.

To create a `DateTime` type:
```CS
//DateTime with only date
DateTime employeeStartDate = new DateTime(2025, 03, 28);
//DateTime with date and hour
DateTime hireDate = new DateTime(2022, 3, 28, 14, 30, 0);
//DateTime to today
DateTime today = DateTime.Today;
//Add 2 days to DateTime
DateTime twoDaysLater someDateTime.AddDays(2);
//Other options
DayOfWeek day = someDateTime.DayOfWeek;
bool isDST = someDateTime.IsDaylightSavingTime();
```

To create a `TimeSpan` type:
```CS
TimeSpan workTime = new TimeSpan(9,35,0);
DateTime startHour = DateTime.now;
DateTime endHout = startHour.Add(workTime);
```