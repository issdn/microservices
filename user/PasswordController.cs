using Konscious.Security.Cryptography;
public class PasswordController
{
    public static string HashPassword(string password, string salt)
    {
        var argon2 = new Argon2id(System.Text.Encoding.UTF8.GetBytes(password))
        {
            DegreeOfParallelism = 4,
            MemorySize = 1024 * 256,
            Iterations = 3,
            Salt = System.Text.Encoding.UTF8.GetBytes(salt)
        };
        return Convert.ToBase64String(argon2.GetBytes(16));
    }

    public static bool VerifyHash(string password, string salt, string hash)
    {
        var new_hash = HashPassword(password, salt);
        return hash.SequenceEqual(new_hash);
    }

    public static string GetSalt()
    {
        var salt = new byte[16];
        var rng_generator = System.Security.Cryptography.RandomNumberGenerator.Create();
        rng_generator.GetBytes(salt);
        return Convert.ToBase64String(salt);
    }
}
