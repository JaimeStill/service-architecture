# Service Architecture
[Playground App](https://jps-sa-app.azurewebsites.net) | [Playground API](https://jps-sa-api.azurewebsites.net/swagger)

[![Build and Deploy App to Azure Web App](https://github.com/JaimeStill/service-architecture/actions/workflows/main_jps-sa-app.yml/badge.svg?branch=main)](https://github.com/JaimeStill/service-architecture/actions/workflows/main_jps-sa-app.yml) [![Build and Deploy API to Azure Web App](https://github.com/JaimeStill/service-architecture/actions/workflows/main_jps-sa-api.yml/badge.svg?branch=main)](https://github.com/JaimeStill/service-architecture/actions/workflows/main_jps-sa-api.yml)  

* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Architecture](#architecture)
* [Data Synchronization Examples](#data-synchronization-examples)

The intent of this repository is to establish a full stack service-oriented architecture in a .NET + Angular monorepo. Additionally, the architecture supports endpoint-based data synchronization across distributed clients via web sockets.

> For details on Azure Configuration and GitHub Actions deployment, see [deployment.md](./deployment.md).  

## Prerequisites
[Back to Top](#service-architecture)  

* [git](https://git-scm.com)
* [Node.js - LTS](https://nodejs.org)
* [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
* [SQL Server 2019 Express](https://www.microsoft.com/en-us/download/details.aspx?id=101064)
  * The connection strings in this project assume a server name of `DevSql`. You can change these in the [package.json](./package.json) `seed` script, as well as [appsettings.Development.json](./server/Playground.Web/appsettings.Development.json).

## Getting Started
[Back to Top](#service-architecture)  

### Clone

```
git clone https://github.com/JaimeStill/service-architecture.git
```

### Install Dependencies

```bash
npm i
```

### Create / Update Database

With seeding:

```bash
npm run seed
```

Without seeding:

```bash
npm run update-db
```

### Run .NET Server

> http://localhost:5000/swagger

**Debug**  
In VS Code, start launch the *Debug Playground* config.

**Start without debugging**

```bash
npm run start-server
```

**Start in watch mode**

```bash
npm run watch-server
```

### Build `core` Angular Library

**Simple Build**

```bash
npm run build
```

**Build in Watch Mode**

```bash
npm run watch
```

### Run `playground` Angular App

> http://localhost:3000

```bash
npm run start-playground
```

## Architecture
[Back to Top](#service-architecture)  

### .NET Server

Element | Description
--------|------------
[Entities](./server/Playground.Data/Entities) | EF Core entity models, all of which derive from [EntityBase.cs](./server/Playground.Data/Entities/EntityBase.cs).
[Config](./server/Playground.Data/Entities/Config) | Fluent API configuration extensions.
[DbInitializer.cs](./server/Playground.Data/Extensions/DbInitializer.cs) | Data seeding that gets executed by the [dbseeder](./server/dbseeder) console utility. This is available as an npm script in [package.json](./package.json).
[Services](./server/Playground.Data/Services/) | Entity business logic service classes. Base functionality is encapsulated in [ServiceBase.cs](./server/Playground.Data/Services/ServiceBase.cs), which implements the [IService.cs](./server/Playground.Data/Services/IService.cs) interface.
[ServiceExtensions.cs](./server/Playground.Data/Services/ServiceExtensions.cs) | Extensions for registering services with .NET Dependency Injection in [Startup.cs](./server/Playground.Web/Startup.cs#L84).
[Sync.cs](./server/Playground.Data/Models/Sync/Sync.cs) | Synchronization model used for transmitting / receiving web socket synchronization messages.
[AppDbContext.cs](./server/Playground.Data/AppDbContext.cs) | EF Core DbContext class.
[Controllers](./server/Playground.Web/Controllers) | .NET Web API endpoints. Common functionality is encapsulated in [EntityController.cs](./server/Playground.Web/Controllers/EntityController.cs), of which each service-based controller derives. See [ArmorController.cs](./server/Playground.Web/Controllers/ArmorController.cs).
[SyncHub.cs](./server/Playground.Web/Hubs/SyncHub.cs) | SignalR Hub that orchestrates broadcasting of [`Sync`](./server/Playground.Data/Models/Sync/Sync.cs) messages. SignalR endpoints are mapped in [Startup.cs](./server/Playground.Web/Startup.cs#L128) via [HubExtensions.cs](./server/Playground.Web/Hubs/HubExtensions.cs).

### Angular Client Infrastructure

Element | Description
--------|------------
[api models](./client/core/models/api/) | TypeScript interfaces that map to EF Core Entity classes. Each interface extends the [EntityBase](./client/core/models/entity-base.ts) abstract class. Each model also provides a [FormGroup](https://angular.io/api/forms/FormGroup) generation function. Additionally, each api model defines a derived [`SyncNode`](./client/core/models/sync/sync-node.ts) class for determining relevant synchronization endpoints.
[apis](./client/core/apis) | Angular services that map to API endpoints. Common functionality is encapsulated in the [EntityApi](./client/core/apis/entity.api.ts) service, from which all API services extend. See [ArmorApi](./client/core/apis/armor.api.ts).
[components](./client/core/components/) | App UI Components
[forms](./client/core/forms/) | Reactive form components.
[api-validator.ts](./client/core/models/api-validator.ts) | Mechanism for managing asynchronous form field validation with [Reactive Forms](https://angular.io/guide/reactive-forms). See [async-form-validation](https://github.com/JaimeStill/async-form-validation).
[dialogs](./client/core/dialogs/) | [Angular Component Dialogs](https://material.angular.io/components/dialog/overview) primarily for adding / updating entity data.
[sync.ts](./client/core/models/sync/sync.ts) | Synchronization model used for transmitting / receiving web socket synchronization messages.
[sync-node.ts](./client/core/models/sync/sync-node.ts) | Model for isolating which synchronization endpoints are relevant to a particular route.
[sync.socket.ts](./client/core/sockets/sync.socket.ts) | Angular service for interacting with the [`SyncHub`](./server/Playground.Web/Hubs/SyncHub.cs) endpoint.
[sync.route.ts](./client/core/models/routes/sync.route.ts) | Abstract class that encapsulates common functionality of working with a synchronized route. See [ArmorRoute](./client/playground/src/app/routes/home/children/armor.route.ts).
[playground](./client/playground/) | Angular application for demonstrating this architecture.

## Data Synchronization Examples
[Back to Top](#service-architecture)  

### Syncing Data on the Same Route

https://user-images.githubusercontent.com/14102723/173453036-fee9c53c-82eb-4d65-b134-12f6b0a238a6.mp4

### Syncing Existing Data on Related Routes

https://user-images.githubusercontent.com/14102723/173453222-af97e300-296f-4839-8a71-4622bcb01b45.mp4

### Syncing New Data on Related Routes

https://user-images.githubusercontent.com/14102723/173453252-3fdd893c-bc88-4471-9563-9e9e2c3e5000.mp4

### Removing Data on Related Routes

https://user-images.githubusercontent.com/14102723/173453312-5dac56a1-80e0-42ad-9179-dc2e648fc87c.mp4
