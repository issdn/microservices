using Microsoft.AspNetCore.Mvc;
using User.Context;
using User.Controllers;
using User.Models;

// // Code by https://hamidmosalla.com/2018/08/16/xunit-control-the-test-execution-order/ 
[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace User.Tests;

public class RegisterMock
{
    private readonly MscDbContext _context;
    private readonly UserController _userController;

    public RegisterMock()
    {
        _context = new MscDbContext();
        _userController = new UserController();
    }

    [Fact]
    public async void Register_CheckValidityOfUserRegistrationDataAndInsertToDatabase_Ok()
    {

        string Min8Chars_Max64Chars_Required_Password = "12345678";
        string Min8Chars_Max32Chars_Required_Username = "username";
        string Correct_Max255Chars_Required_Email = "username@user.com";

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
        string Min8Chars_Max64Chars_Required_Password = "12345678";
        string Min8Chars_Max32Chars_Required_Username = "username";

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

        string Min8Chars_Max64Chars_Required_Password = "12345678";
        string Min8Chars_Max32Chars_Required_Username = "username";

        IActionResult response = await _userController.RemoveAccount(new UserLoginModel
        {
            Password = Min8Chars_Max64Chars_Required_Password,
            Username = Min8Chars_Max32Chars_Required_Username
        });

        ObjectResult result = (ObjectResult)response;

        Assert.Equal(200, result.StatusCode);
    }
}