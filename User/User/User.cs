using System;
using System.Collections.Generic;

namespace User
{
    public partial class User
    {
        public uint Id { get; set; }
        public string Nickname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Salt { get; set; } = null!;
    }
}
