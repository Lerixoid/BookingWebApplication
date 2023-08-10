using Microsoft.EntityFrameworkCore;
using Webapi.Contexts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Webapi.Helpers;

var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment.EnvironmentName;
string connectionString, secretKey;

if(environment == "Production")
{
    connectionString = Environment.GetEnvironmentVariable("DefaultConnection");
    secretKey = Environment.GetEnvironmentVariable("SecretKey");
}
else if(environment == "Development")
{
    connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
    secretKey = builder.Configuration["SecretKey"];

}
else
{
    throw new Exception("Unknown environment");

}

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = "https://bebra.azurewebsites.net/",
        ValidAudience = "https://bebra.azurewebsites.net/",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
    };
});

builder.Services.BuildServiceProvider().GetService<ApplicationDbContext>().Database.Migrate();

//builder.Services.AddControllers();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();


var app = builder.Build();

app.UseCors(
    options => options.WithOrigins("https://pro2team.github.io", "http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials()
) ;

app.UseExceptionLoggerMiddleware();
app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();