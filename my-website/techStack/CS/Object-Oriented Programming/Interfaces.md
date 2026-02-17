An interface is a sort of contract that sets up rules that a class must follow if they are to follow the Interfaces established rules.
### Sample Interface
```CS
public interface IEmployee
{
  void PerformWork();
  int ReceiveWage();
}
```
### Implementing an Interface
```CS
public void Manager: IEmployee
{
  public void PerformWork()
  {
    ...
  }
	
  public int ReceiveWage()
  {
    ...
  }
}
```