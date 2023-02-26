using Microsoft.EntityFrameworkCore;
using User.Models;

namespace User.Context
{
    public partial class MscDbContext : DbContext
    {
        public MscDbContext()
        {
        }

        public MscDbContext(DbContextOptions<MscDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserDbEntryModel> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;user=root;password=root;database=msc", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<UserDbEntryModel>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.Email, "email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Username, "username_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.Username)
                    .HasMaxLength(32)
                    .HasColumnName("username");

                entity.Property(e => e.Password)
                    .HasMaxLength(64)
                    .HasColumnName("password");

                entity.Property(e => e.Salt)
                    .HasMaxLength(16)
                    .HasColumnName("salt");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
