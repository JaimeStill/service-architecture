# Azure and GitHub Actions Configuration

* [Resource Group](#resource-group)
* [Azure SQL](#sql-setup)
* [App Services - API](#app-services---api)
    * [API Configuration](#api-configuration)
    * [CORS](#cors)
* [App Services - App](#app-services---app)
    * [App Configuration](#app-configuration)
    * [URL Rewrite](#url-rewrite)
    * [App Environment](#app-environment)
* [Actions Configuration](#actions-configuration)
    * [Actions Secrets](#actions-secrets)
    * [API Actions](#api-actions)
    * [App Actions](#app-actions)

The following document captures the configuration steps necessary to get a .NET 6 + Angular 14 monorepo independently deployed to Azure from a GitHub repository via Actions. The .NET 6 project contains EF Core, Web API, SignalR, and a database seeding CLI utility.

> All of the following steps were conducted through the [Azure Portal](https://portal.azure.com).
>
> All of the values provided below are relevant to my configuration. Replace with whatever is relevant to your own configuration needs.

## Resource Group
[Back to Top](#azure-and-github-actions-configuration)  

From the toolbar menu, click **Resource Groups**, then click **Create**.

**Project details**  
* Subscription: `Visual Studio Professional`  
* Resource group: `AzureDev`

**Resource details**  
* Region: (US) East US

## Azure SQL
[Back to Top](#azure-and-github-actions-configuration) 

From the toolbar menu, click **SQL Databases**, then click **Create**.

**Basics**  

* **Project details**
    * Subscription: `Visual Studio Professional`
    * Resource group: `AzureDev`
* **Database details**
    * Database name: `azure-sql`
    * **Server details**
        * Server name: `jps-azure-sql`
        * Location: `(US) East US`
        * **Authentication**
            * Authentication method: `Use SQL authentication`
            * Server admin login: `{admin}`
            * Password: `{password}`
    * Compute + storage: `General Purpose - Serverless`
* **Backup storage redundancy**: `Locally-redundant backup storage`

**Networking**

* **Firewall rules**
    * Allow Azure services and resources to access this server: `Yes`
    * Add current client IP address: `Yes`
* **Connection Policy**: `Default`
* **Encrypted connections**
    * Minimum TLS version: `TLS 1.2`

**Security**

* **Microsoft Defender for SQL**
    * Enable: `Not now`
* **Ledger**: `Not configured`

**Additional Settings**

* **Data source**
    * Use existing data: `None`
* **Database collation**
    * Collation: `SQL_Latin1_General_CP1_CI_AS`
* **Maintenance window**: `System default (5pm to 8am)`

## App Services - API
[Back to Top](#azure-and-github-actions-configuration) 

From the toolbar menu, click **App Services**, then click **Create**.

**Basics**

* **Project Details**
    * Subscription: `Visual Studio Professional`
    * Resource Group: `AzureDev`
* **Instance Details**
    * Name: `jps-sa-api`
    * Publish: `Code`
    * Runtime stack: `.NET 6 (LTS)`
    * Operating System: `Windows`
    * Region: `East US`
* **App Service Plan**
    * Windows Plan (East US): `{plan}`
        * This is auto-populated
    * Sku and size: `Free F1`
* **Zone redundancy**: `Disabled`

**Deployment**

* **GitHub Actions settings**
    * Continuous deployment: `Enable`
* **GitHub Actions details**
    * GitHub account: `JaimeStill`
    * Organization: `JaimeStill`
    * Repository: `service-architecture`
    * Branch: `main`

### API Configuration
[Back to Top](#azure-and-github-actions-configuration) 

1. Navigate to the **App Service** configured above.
2. Click **Settings: Configuration** in the sidemenu.
3. In the **Connection strings** section, click **New connection string** and provide the following values:
    * **Name**: `Project`
    * **Value**: `{connection-string}`
        * Get this by navigating the the sql database in the Azure portal, clicking **Settings: Connection strings** from the sidemenu, then copying the **ADO.NET (SQL authentication)** connection string.
    * **Type**: `SQLAzure`
4. Click **OK**.
5. Click the **General Settings** tab.
6. Under **Platform settings** set **Web sockets** to **On**.
7. Click **Save**.

### CORS
[Back to Top](#azure-and-github-actions-configuration) 

1. Navigate to the **App Service** configured above.
2. Click **API: Cors** in the sidemenu.
3. Under **Request Credentials**, check *Enable Access-Control-Allow-Credentials*.
4. Under **Allowed Origins**, add the following two entries:
    * `https://{app}.azurewebsites.net`
    * `http://{app}.azurewebsites.net`
        * `{app}` is whatever the App Service associated with the client app will be called in the following section.
5. Click **Save**.

### Production Appsettings

Ensure that production values for `CorsOrigins` and `AppModules` are set in [appsettings.json](./server/Playground.Web/appsettings.json).

## App Services - App
[Back to Top](#azure-and-github-actions-configuration)  
From the toolbar menu, click **App Services**, then click **Create**.

**Basics**

* **Project Details**
    * Subscription: `Visual Studio Professional`
    * Resource Group: `AzureDev`
* **Instance Details**
    * Name: `jps-sa-app`
    * Publish: `Code`
    * Runtime stack: `Node 16 LTS`
    * Operating System: `Windows`
    * Region: `East US`
* **App Service Plan**
    * Windows Plan (East US): `{plan}`
        * This is auto-populated
    * Sku and size: `Free F1`
* **Zone redundancy**: `Disabled`

**Deployment**

* **GitHub Actions settings**
    * Continuous deployment: `Enable`
* **GitHub Actions details**
    * GitHub account: `JaimeStill`
    * Organization: `JaimeStill`
    * Repository: `service-architecture`
    * Branch: `main`

### App Configuration
[Back to Top](#azure-and-github-actions-configuration) 

1. Navigate to the **App Service** configured above.
2. Click **Settings: Configuration** in the sidemenu.
3. Click the **General Settings** tab.
4. Under **Platform settings** set **Web sockets** to **On**.
5. Click **Save**.

### URL Rewrite
[Back to Top](#azure-and-github-actions-configuration) 

In order to facilitate the requirement that [routed apps must fallback to `index.html`](https://angular.io/guide/deployment#fallback-configuration-examples), a `web.config` file needed to be added at `/client/playground/src/web.config`.

To ensure this gets included in the build, add `client/playground/src/web.config` to the build options *assets** array in [angular.json](./angular.json#L81).

### App Environment
[Back to Top](#azure-and-github-actions-configuration) 

Ensure the production endpoints are configured in [endpoint.prod.ts](./client/playground/src/environments/environment.prod.ts).

## Actions Configuration
[Back to Top](#azure-and-github-actions-configuration)  

The GitHub Actions workflow configurations generated by the Azure App Service creation task are a great starting point, but there are some modifications that need to be made to ensure:

1. CI / CD is only executed when the relevant files are modified.
2. The commands point to the proper directories within the monorepo.
3. The database migrations get applied and any missing data is seeded.
4. Only the compiled [playground](./client/playground/) client app is stored as an artifact and deployed.

The sections that follow will only highlight the changes made from the default workflow template. The full workflow configuration will be linked.

### Actions Secrets
[Back to Top](#azure-and-github-actions-configuration)  

To facilitate database migrations / seeding, the Azure SQL connection string should be added as an Actions Secret.

Navigate to the repository, click **Settings**, then click the **Security: Secrets: Actions** link in the sidemenu. Click **New Repository Secret** and set the following:

> Get the connection string value by navigating the the sql database in the Azure portal, clicking **Settings: Connection strings** from the sidemenu, then copying the **ADO.NET (SQL authentication)** connection string.

**Name**: `AZUREAPPSERVICE_CONNECTIONSTRING`  
**Value**: `{connection-string}`

Click **Add Secret**.

### API Actions
[Back to Top](#azure-and-github-actions-configuration) 

[main_jps-sa-api.yml](./.github/workflows/main_jps-sa-api.yml)  

```yml
on:
  push:
    # do not trigger CI / CD if only the following files
    # are part of an update to main. 
    paths-ignore:
      - .angular/*
      - .github/workflows/main_jps-sa-app.yml
      - .vscode/*
      - client/*
      - properties/*
      - theme/*
      - .editorconfig
      - .gitignore
      - .angular.json
      - deployment.md
      - notes.md
      - package-lock.json
      - package.json
      - readme.md
      - tsconfig.json
jobs:
  build:
    steps:
      # ensure build targets the server directory
      - name: Build with dotnet
        run: dotnet build --configuration Release
        working-directory: server

      # execute database seeding
      - name: Seed database
        run: dotnet run -- '${{secrets.AZUREAPPSERVICE_CONNECTIONSTRING}}`
        working-directory: server/dbseeder

      # publish the API project
      - name: dotnet publish
        run: dotnet publish -c Release -o ${{env.DOTNET_ROOT}}/playground-api
        working-directory: server/Playground.Web

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v2
        with:
          name: .playground-api
          path: ${{env.DOTNET_ROOT}}/playground-api

  deploy:
    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v2
        with:
          name: .playground-api
```

### App Actions
[Back to Top](#azure-and-github-actions-configuration) 

[main_jps-sa-app.yml](./.github/workflows/main_jps-sa-app.yml)  

```yml
on:
  push:
    # do not trigger CI / CD if only the following files
    # are part of an update to main. 
    paths-ignore:
      - .angular/*
      - .github/workflows/main_jps-sa-api.yml
      - .vscode/*
      - dist/*
      - node_modules/*
      - properties/*
      - server/*
      - .editorconfig
      - .gitignore
      - deployment.md
      - notes.md
      - package-lock.json
      - readme.md

jobs:
  build:
    steps:
      # execute the proper npm scripts
      - name: npm install, build core, and build playground
        run: |
          npm install
          npm run package-core
          npm run package-playground

      # only uplaod the playground client app
      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v2
        with:
          name: node-app
          path: ./dist/playground
```
