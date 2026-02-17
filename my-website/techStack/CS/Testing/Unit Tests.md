### What are unit tests?
- Code that tests other code
- Small components of the application
- Validate Value
- Isolate part of the code
### Advantages:
- Find bugs
- Change without fear of breaking something
- Improve quality
- Documentation of the code
### Writing a Unit Test
```CS
public class EmployeeTests
{
  [Fact]
  public void PerformWork_Adds_DefaultNumberOfHours_IfNoValueSpecified()
  {
    //Arrange
    Employee employee = new Employee(...);
		
    //Act
    employee.PerformWork();
		
    //Assert
    Assert.Equal(1, employee.NumberOfHoursWorked);
  }
}
```