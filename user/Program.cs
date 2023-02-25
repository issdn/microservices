using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
using var connection = new MySqlConnection(connectionString);
var app = builder.Build();

app.MapPost("/auth/login", (string username, string password) =>
{
    var command = new MySqlCommand("SELECT * FROM users WHERE username = @username", connection);
    command.Parameters.AddWithValue("@username", username);
    connection.Open();
    var reader = command.ExecuteReader();
    if (reader.Read())
    {
        var salt = reader.GetString("salt");
        var hash = reader.GetString("password");
        var is_valid = PasswordController.VerifyHash(password, salt, hash);
        if (is_valid)
        {
            return Results.Ok(new { message = "Login successful" });
        }
        else
        {
            return Results.BadRequest(new { message = "Invalid password" });
        }
    }
    else
    {
        return Results.BadRequest(new { message = "Invalid username" });
    }
});

app.MapPost("/auth/register", (user.Models.UserRegisterModel userInfo) =>
{
    var salt = PasswordController.GetSalt();
    var hashed_password = PasswordController.HashPassword(userInfo.Password!, salt);
    var command = new MySqlCommand("INSERT INTO users (username, password, email, salt) VALUES (@username, @password, @email, @salt)", connection);
    command.Parameters.AddWithValue("@username", userInfo.Username);
    command.Parameters.AddWithValue("@password", hashed_password);
    command.Parameters.AddWithValue("@email", userInfo.Email);
    command.Parameters.AddWithValue("@salt", salt);
    connection.Open();
    var reader = command.ExecuteReader();
    return Results.Ok(new { message = "User created" });
});

app.Run();
