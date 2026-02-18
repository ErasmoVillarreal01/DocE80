# Putaway

This schema specifies the logic that determines the destination of a stock unit once it is picked. It evaluates a set of rules and conditions based on the unit’s characteristics to assign the correct storage or handling location.

For this the tables **Putaway.Condition**, **Putaway.ConditionSequence**, **Putaway.LoadCheckingRule**, **Putaway.Stategy**, **Putaway.ConditionLocation**

1. **Condition**: In this table its where you fill the caracteristics you are looking for in a Stock Unit, like it is shown in the image below, in the column of ItemClass that you dont want in the corresponding condition id 1.

![Condition](../../static/img/putaway/putawaycondition.png)

2. **Condition Sequence**: This table specifies the routing logic used to determine the target container for each stock unit. After a stock unit satisfies a defined condition, the system evaluates the configured sequence and assigns the unit to the appropriate container according to the operational rules and prioritization criteria.
![Condition Sequence](../../static/img/putaway/putawaycondseq.png)

3. **Load Checking Rule**: This table is used to set for example Stacking or No Stacking rules for certain for certain locations.

4. **Strategy**: It is literally the name of the procedure which is used to decide in which location is the Stock Unit going to go.

5. **Condition Location**: Is a table that is automatically filled to assign the corresponding IdCondition to a IdLocation.