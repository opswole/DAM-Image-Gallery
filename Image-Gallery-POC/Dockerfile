FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Image-Gallery-POC/Image-Gallery-POC.csproj", "Image-Gallery-POC/"]
RUN dotnet restore "Image-Gallery-POC/Image-Gallery-POC.csproj"
COPY . .
WORKDIR "/src/Image-Gallery-POC"
RUN dotnet build "Image-Gallery-POC.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Image-Gallery-POC.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Image-Gallery-POC.dll"]
