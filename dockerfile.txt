# Используем официальный образ .NET SDK для сборки
FROM mcr.microsoft.comdotnetsdk8.0 AS build
WORKDIR app

# Копируем и восстанавливаем зависимости
COPY .csproj .
RUN dotnet restore

# Копируем остальные файлы и собираем приложение
COPY . .
RUN dotnet publish -c Release -o out

# Используем официальный образ .NET Runtime для запуска
FROM mcr.microsoft.comdotnetaspnet8.0 AS runtime
WORKDIR app
COPY --from=build appout .

# Указываем команду запуска приложения
ENTRYPOINT [dotnet, SweetTogether.dll]
