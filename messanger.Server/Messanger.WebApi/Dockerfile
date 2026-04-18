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
COPY ["Messanger.WebApi/Messanger.WebApi.csproj", "Messanger.WebApi/"]
COPY ["Modules/Notes/Notes.WebApi/Notes.WebApi.csproj", "Modules/Notes/Notes.WebApi/"]
COPY ["Modules/Notes/Notes.Logic/Notes.Logic.csproj", "Modules/Notes/Notes.Logic/"]
COPY ["Modules/Notes/Notes.Data/Notes.Data.csproj", "Modules/Notes/Notes.Data/"]
COPY ["Core/Core.Data/Core.Data.csproj", "Core/Core.Data/"]
COPY ["Core/Core.Logic/Core.Logic.csproj", "Core/Core.Logic/"]
COPY ["Core/Core.WebApi/Core.WebApi.csproj", "Core/Core.WebApi/"]

# Восстанавливаем зависимости для запускаемого проекта
RUN dotnet restore "Messanger.WebApi/Messanger.WebApi.csproj"

# Копируем весь код
COPY . .

# Переходим в папку с проектом
WORKDIR /src/Messanger.WebApi

# Запускаем
CMD ["dotnet", "watch", "run", "--urls", "http://+:80"]