# SDK-образ для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем проект
COPY ./SweetTogether ./SweetTogether
WORKDIR /src/SweetTogether

# Публикуем
RUN dotnet publish SweetTogether.csproj -c Release -o /app/publish

# Runtime-образ для запуска
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Запуск
ENTRYPOINT ["dotnet", "SweetTogether.dll"]

