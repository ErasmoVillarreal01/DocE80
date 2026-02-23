---
title: Host Messages Processing Scripts
tags: [sql, message-processing, scripts, sdm, host-messages]
---

# Host Messages Processing Scripts

This section contains SQL scripts designed to simulate the processing of host incoming  messages in **SDM**.

## Available Scripts
- [ITM_MST](./ITM_MST.md)
- [RET_CNL](./RET_CNL.md) 
- [RET_RQS](./RET_RQS.md)  
- [SHP_INS](./SHP_INS.md)  
- [SU_CNG](./SU_CNG.md) 
- [SU_DATA](./SU_DATA.md)

## Best Practices
:::tip
- Always run scripts inside a **ROLLBACK transaction** before commit them.  
- Always run scripts in a **test environment** before production.  
:::