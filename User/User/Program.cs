using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using User.Context;
using User.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

string getEnvironmentVariableOrAppSetting(string variableName)
{
    var value = Environment.GetEnvironmentVariable(variableName);
    if (value != null)
    {
        return value;
    }
    return builder!.Configuration[variableName];
}

string Issuer = getEnvironmentVariableOrAppSetting("Issuer");
string Audience = getEnvironmentVariableOrAppSetting("Audience");
string Key = getEnvironmentVariableOrAppSetting("Key");

builder.Services.AddScoped<JWTDataModel>(provider => new JWTDataModel
{
    Issuer = Issuer,
    Audience = Audience,
    Key = Key,
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MscDbContext>(dbContextOptions =>
    dbContextOptions.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 31))));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.MapControllers();

app.Run();
