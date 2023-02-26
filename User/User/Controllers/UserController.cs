using Microsoft.AspNetCore.Mvc;
using User.Models;
using User.Context;

namespace User.Controllers
{
    [Route("v1/[controller]/auth")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MscDbContext _context;

        public UserController()
        {
            _context = new MscDbContext();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterModel userData)
        {
            System.Console.WriteLine(userData.Password);
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
            return Ok(new { message = "User created" });
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

    }
}