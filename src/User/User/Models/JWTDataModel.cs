namespace User.Models;

public class JWTDataModel
{
    public string Key { get; set; } = null!;
    public string Audience { get; set; } = null!;
    public string Issuer { get; set; } = null!;
}