using Microsoft.AspNetCore.Mvc;
using User.Context;
using User.Controllers;
using User.Models;

// // Code by https://hamidmosalla.com/2018/08/16/xunit-control-the-test-execution-order/ 
[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace User.Tests;

public class UserControllerTests
{
    string Min8Chars_Max64Chars_Required_Password = "12345678";
    string Min8Chars_Max32Chars_Required_Username = "username";
    string Correct_Max255Chars_Required_Email = "username@user.com";

    private readonly MscDbContext _context;
    private readonly UserController _userController;

    public UserControllerTests()
    {
        _context = new MscDbContext();
        _userController = new UserController();
    }

    [Fact]
    public async void Register_CheckValidityOfUserRegistrationDataAndInsertToDatabase_Ok()
    {

        var registerModel = new UserRegisterModel
        {
            Password = Min8Chars_Max64Chars_Required_Password,
            Username = Min8Chars_Max32Chars_Required_Username,
            Email = Correct_Max255Chars_Required_Email
        };

        IActionResult response = await _userController.Register(registerModel);

        ObjectResult result = (ObjectResult)response;

        Assert.Equal(200, result.StatusCode);
    }

    [Fact]
    public void Login_CheckValidityOfUserLoginDataAndSelectFromDatabase_Ok()
    {
        AddUserIfNotExists();
        IActionResult response = _userController.Login(new UserLoginModel
        {
            Password = Min8Chars_Max64Chars_Required_Password,
            Username = Min8Chars_Max32Chars_Required_Username
        });

        ObjectResult result = (ObjectResult)response;

        Assert.Equal(200, result.StatusCode);
    }

    [Fact]
    public async void RemoveAccount_CheckValidityOfUserLoginDataAndDeleteFromDatabase_Ok()
    {
        AddUserIfNotExists();
        IActionResult response = await _userController.RemoveAccount(new UserLoginModel
        {
            Password = Min8Chars_Max64Chars_Required_Password,
            Username = Min8Chars_Max32Chars_Required_Username
        });

        ObjectResult result = (ObjectResult)response;

        Assert.Equal(200, result.StatusCode);
    }

    private async void AddUserIfNotExists()
    {
        var user = _context.Users.FirstOrDefault(x => x.Username == Min8Chars_Max32Chars_Required_Username);

        if (user == null)
        {
            await _context.Users.AddAsync(new UserDbEntryModel
            {
                Username = Min8Chars_Max32Chars_Required_Username,
                Password = Min8Chars_Max64Chars_Required_Password,
                Email = Correct_Max255Chars_Required_Email
            });

            await _context.SaveChangesAsync();
        }
    }
}