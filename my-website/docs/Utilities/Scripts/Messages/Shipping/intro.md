---
title: Shipment Processing Scripts
tags: [sql, message-processing, scripts, sdm, shipping]
---

This section contains SQL scripts designed to simulate the processing of shipping in **SDM**.

## Available Scripts
- [Shipment Monitor Process](./ShipmentMonitorProcess.md)
- [Shipment_From_AMIS](./ShipmentFromAMIS.md) 

## Best Practices
:::tip
- Always run scripts inside a **ROLLBACK transaction** before commit them.  
- Always run scripts in a **test environment** before production.  
:::
