When creating a [Class](../Reference%20Types/Class/Classes.md) (or [Strings](Strings.md)), a reference to the objects data is created in the stack, the actual data is stored in the heap. When creating a copy of the object they share the same reference.

Value types do not have this behavior. Each one has its own value on stack.

![](../../../../../static/img/techStack/cs/reference.png)

| `ref` keyword                                                                                                                  | `out` keyword                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| It is necessary the parameters should initialize before it pass to ref.                                                        | It is not necessary to initialize parameters before it pass to out.                              |
| It is not necessary to initialize the value of a parameter before returning to the calling method.                             | It is necessary to initialize the value of a parameter before returning to the calling method.   |
| The passing of value through ref parameter is useful when the called method also need to change the value of passed parameter. | The declaring of parameter through out parameter is useful when a method return multiple values. |
| When ref keyword is used the data may pass in bi-directional.                                                                  | When out keyword is used the data only passed in unidirectional.                                 |              |
When using out it is possible to get several outputs from a single function. bonusTax's value will also be updated.
```CS
int minimumBonus = 100;
int bonusTax;
int receivedBonus = bethany.CalculateBonusAndBonusTax(minimumBonus, out bonusTax);
```