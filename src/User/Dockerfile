FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5113:80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ./User/. /src/
RUN dotnet restore User.csproj
RUN dotnet build User.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish User.csproj -c Release -o /app

FROM base AS final
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "User.dll"]