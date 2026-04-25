FROM mcr.microsoft.com/dotnet/sdk:10.0

RUN dotnet tool install -g dotnet-watch
ENV PATH="${PATH}:/root/.dotnet/tools"

WORKDIR /app

COPY ["Messanger.WebApi/Messanger.WebApi.csproj", "Messanger.WebApi/"]
COPY ["Modules/Notes/Notes.WebApi/Notes.WebApi.csproj", "Modules/Notes/Notes.WebApi/"]
COPY ["Modules/Notes/Notes.Logic/Notes.Logic.csproj", "Modules/Notes/Notes.Logic/"]
COPY ["Modules/Notes/Notes.Data/Notes.Data.csproj", "Modules/Notes/Notes.Data/"]
COPY ["Modules/Notes/Notes.Dto/Notes.Dto.csproj", "Modules/Notes/Notes.Dto/"]
COPY ["Core/Core.WebApi/Core.WebApi.csproj", "Core/Core.WebApi/"]
COPY ["Core/Core.Logic/Core.Logic.csproj", "Core/Core.Logic/"]
COPY ["Core/Core.Data/Core.Data.csproj", "Core/Core.Data/"]
COPY ["Core/Core.Dto/Core.Dto.csproj", "Core/Core.Dto/"]

RUN dotnet restore "Messanger.WebApi/Messanger.WebApi.csproj"

COPY . .

WORKDIR /app/Messanger.WebApi

CMD ["dotnet", "watch", "run", "--urls", "http://+:80", "--non-interactive"]