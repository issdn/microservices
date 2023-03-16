using Microsoft.AspNetCore.Mvc;
using User.Models;
using User.Context;
using Microsoft.AspNetCore.Authorization;
using User.Services;

namespace User.Controllers
{
    [Route("[controller]/v1/auth")]
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
        /// <summary>
        /// Registers an user.
        /// </summary>
        /// <response code="201">User created</response>
        /// <response code="400">Username is already in use</response>
        /// <response code="500">Internal server error</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> Register(UserRegisterModel userData)
        {
            var user = _context.Users.Where(user => user.Username == userData.Username).FirstOrDefault();
            if (user != null)
            {
                return BadRequest(new { title = "Username is already in use" });
            }
            var salt = PasswordService.GetSalt();
            var hashed_password = PasswordService.HashPassword(userData.Password!, salt);
            try
            {

                await _context.Users.AddAsync(new UserDbEntryModel
                {
                    Username = userData.Username,
                    Password = hashed_password,
                    Email = userData.Email,
                    Salt = salt
                });
                await _context.SaveChangesAsync();
                return CreatedAtAction("Register", new { title = "User created" });
            }
            catch
            {
                return StatusCode(500, new { title = "Internal server error" });
            }
        }

        /// <summary>
        /// Login using username and password.
        /// </summary>
        /// <response code="200">User created</response>
        /// <response code="400">Invalid password or username</response>
        /// <returns>JWT token</returns>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public IActionResult Login(UserLoginModel userData)
        {
            var user = _context.Users.Where(user => user.Username == userData.Username).FirstOrDefault();
            if (user != null)
            {
                var is_valid = PasswordService.VerifyHash(userData.Password, user.Salt!, user.Password!);
                if (is_valid)
                {
                    var sessionJwtToken = new JWTService(_jwtData).CreateJwtToken(userData);
                    HttpContext.Response.Cookies.Append("sessionJwtToken", sessionJwtToken);
                    return Ok(new { title = "Login successful" });
                }
                else
                {
                    return BadRequest(new { title = "Invalid password or username" });
                }
            }
            else
            {
                return BadRequest(new { title = "Invalid password or username" });
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete("token");
            return Ok(new { title = "Logout successful" });
        }

        [Authorize]
        [HttpGet("session")]
        public IActionResult Session()
        {
            return Ok(new { title = "Session is valid" });
        }

        [Authorize]
        [HttpGet("verify")]
        public IActionResult Verify()
        {
            var claim = HttpContext.User.Claims.First(claim => claim.Type == "Username");
            var user = _context.Users.Where(user => user.Username == claim.Value).FirstOrDefault();
            if (user != null)
            {
                return Ok(new { id = user.Id, username = user.Username, email = user.Email });
            }
            else
            {
                return Unauthorized();
            }
        }

        [Authorize]
        [HttpPost("remove-account")]
        public async Task<IActionResult> RemoveAccount(UserLoginModel userData)
        {
            var user = _context.Users.Where(user => user.Username == userData.Username).FirstOrDefault();
            if (user != null)
            {
                var is_valid = PasswordService.VerifyHash(userData.Password, user.Salt!, user.Password!);
                if (is_valid)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return Ok(new { title = "Removed succesfully" });
                }
                else
                {
                    return BadRequest(new { title = "Invalid password or username" });
                }
            }
            else
            {
                return BadRequest(new { title = "Invalid password or username" });
            }
        }
    }
}