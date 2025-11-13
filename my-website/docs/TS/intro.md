---
sidebar_position: 1
---

# Transport System

## Getting Started

**Transport System** is responsible of the validation and induction of the pallets through transport units such as an inbound conveyor.

Once Transport System gets the request and start reading the profiler it process the data so it can generate a new request to share with **WMS/SDM (Warehouse Management System)** which will be responsible to validate the pallet data and retrieve a response for the Transport System to know what to do with the pallet.

To achieve its main purpose Transport System needs to communicate with a PLC which will raise a request once the pallet is introduced, weighted, measured, scanned and finally moved through the conveyor in order to get the data of the pallet so it can be written to the profiler so the Transport System is able to read it. 

## Profiler Process
![Profiler Process](../../static/img/profiler_process.png)

In order for Transport System to work it is necessary to configure the entities for its database. Some of these are described below:

## Database


`TransportSystem.TransportUnit` -> It represents the unit which will handle the pallet and its transportation. Usually represents the inbound conveyor.

`TransportSystem.TransportUnitPosition` -> It represents the position on the unit in which the pallet will be evaluated.

`TransportSystem.OperationStation` -> It defines the operation point where pallets will be offered to pick up or requested to be dropped.

`TransportSystem.DataStructure` -> It defines the structures that will be used in the system so they can be referenced in the TransportSystem.TransportUnitPosition entity.

`TransportSystem.Plc` -> It represents the PLC to be used.

`TransportSystem.PlcItem` -> It represents a PLC item to be read.

## Requirements 

### Development Requierements
- Microsoft SQL Server
- Microsoft Visual Studio
### Other requirements
- Communication Channel (Microsoft Message Queuing RabbitMQ, SQL Shared Tables).
- Kepware OPC Server.
- WMS/SDM Instances (WMS Service and SDM DB)


### Installation & Startup 
- Solution structure overview 
- Solution configuration 
- Build and run instructions 

### Additional Topics 
- Logging and diagnostics 
- Error handling strategy 
- Integration points with LGVM 
- Deployment checklist 

