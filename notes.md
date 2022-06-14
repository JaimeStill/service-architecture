# Notes

## Seed Azure SQL

```bash
dotnet run -- $'Server=tcp:jps-azure-sql.database.windows.net,1433;Initial Catalog=azure-sql;Persist Security Info=False;User ID=sa-sql;Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'
```
