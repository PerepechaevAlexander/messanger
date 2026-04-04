# Этап 1: Сборка приложения
FROM mcr.microsoft.com/dotnet/sdk:10.0
WORKDIR /src

# Устанавливаем Node.js (нужен для .esproj)
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs
    
# Устанавливаем dotnet-watch для hot reload
RUN dotnet tool install -g dotnet-watch
ENV PATH="${PATH}:/root/.dotnet/tools"
    
# Копируем .csproj и восстанавливаем зависимости
COPY ["messanger.Server/messanger.Server.csproj", "messanger.Server/"]
RUN dotnet restore "messanger.Server/messanger.Server.csproj"

# Копируем весь код
COPY . .

# Переходим в папку с проектом
WORKDIR /src/messanger.Server

# Запускаем
CMD ["dotnet", "watch", "run", "--urls", "http://+:80"]