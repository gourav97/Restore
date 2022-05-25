using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

using var scope = app.Services.CreateScope(); //using keyword is used to dispose any un used data same as garbage collection.

var services = scope.ServiceProvider;

var context = services.GetRequiredService<StoreContext>();

var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch(Exception ex)
{
    logger.LogError(ex, "PROBLEM MIGRATING DATA");
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
