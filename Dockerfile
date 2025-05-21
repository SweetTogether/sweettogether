# Используем официальный образ .NET SDK 8.0 для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . ./
RUN dotnet publish -c Release -o out

# Используем официальный образ .NET ASP.NET для запуска
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app
COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "SweetTogether.dll"]

