using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using User.Models;

namespace User.Services;

class JWTService
{
    private readonly JWTDataModel _jwtData;

    public JWTService(JWTDataModel jwtData)
    {
        _jwtData = jwtData;
    }

    public string CreateJwtToken(UserLoginModel user)
    {
        var claims = new List<Claim>
            {
                new Claim("Username", user.Username)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtData.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtData.Issuer,
            audience: _jwtData.Audience,
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}