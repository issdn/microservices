using Microsoft.AspNetCore.Mvc;
using User.Models;
using User.Context;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace User.Controllers
{
    [Route("v1/[controller]/auth")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly JWTDataModel _jwtData;
        private readonly MscDbContext _context;

        public UserController(JWTDataModel jwtData)
        {
            _jwtData = jwtData;
            _context = new MscDbContext();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterModel userData)
        {
            var user = _context.Users.Where(user => user.Username == userData.Username).FirstOrDefault();
            if (user != null)
            {
                return BadRequest(new { message = "Username already exists" });
            }
            var salt = PasswordController.GetSalt();
            var hashed_password = PasswordController.HashPassword(userData.Password!, salt);
            await _context.Users.AddAsync(new UserDbEntryModel
            {
                Username = userData.Username,
                Password = hashed_password,
                Email = userData.Email,
                Salt = salt
            });
            await _context.SaveChangesAsync();
            var token = CreateJwtToken(userData);
            return Ok(new { message = "User created", token = token });
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginModel userData)
        {
            var user = _context.Users.Where(user => user.Username == userData.Username).FirstOrDefault();
            if (user != null)
            {
                var is_valid = PasswordController.VerifyHash(userData.Password, user.Salt!, user.Password!);
                if (is_valid)
                {
                    return Ok(new { message = "Login successful" });
                }
                else
                {
                    return BadRequest(new { message = "Invalid password or username" });
                }
            }
            else
            {
                return BadRequest(new { message = "Invalid password or username" });
            }
        }

        [Authorize]
        [HttpPost("remove-account")]
        public async Task<IActionResult> RemoveAccount(UserLoginModel userData)
        {
            var user = _context.Users.Where(user => user.Username == userData.Username).FirstOrDefault();
            if (user != null)
            {
                var is_valid = PasswordController.VerifyHash(userData.Password, user.Salt!, user.Password!);
                if (is_valid)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Removed succesfully" });
                }
                else
                {
                    return BadRequest(new { message = "Invalid password or username" });
                }
            }
            else
            {
                return BadRequest(new { message = "Invalid password or username" });
            }
        }

        public string CreateJwtToken(UserRegisterModel user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
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
}