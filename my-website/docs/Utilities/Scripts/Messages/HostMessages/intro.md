---
title: Host Messages Processing Scripts
tags: [sql, scripts, message-processing]
---

# Host Messages Processing Scripts

This section contains SQL scripts designed to simulate the processing of host incoming  messages in **SDM**.

## Available Scripts
- [ITM_MST](./ITM_MST.md)  
- [Clean Message Queue](./script2.md)  

## Best Practices
:::tip
- Always run scripts inside a **ROLLBACK transaction** before commit them.  
- Always run scripts in a **test environment** before production.  
:::