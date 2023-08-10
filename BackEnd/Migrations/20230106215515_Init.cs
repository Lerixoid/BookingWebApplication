using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webapi.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    AddressID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HouseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FlatNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.AddressID);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationForms",
                columns: table => new
                {
                    ApplicationFormID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Organization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationContact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationAdress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationForms", x => x.ApplicationFormID);
                });

            migrationBuilder.CreateTable(
                name: "ContactForms",
                columns: table => new
                {
                    ContactFormID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactForms", x => x.ContactFormID);
                });

            migrationBuilder.CreateTable(
                name: "Emails",
                columns: table => new
                {
                    EmailID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmailAddress = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emails", x => x.EmailID);
                });

            migrationBuilder.CreateTable(
                name: "Promotions",
                columns: table => new
                {
                    PromotionID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DiscountInPercent = table.Column<int>(type: "int", nullable: false),
                    DateFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTo = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.PromotionID);
                });

            migrationBuilder.CreateTable(
                name: "UserCredentials",
                columns: table => new
                {
                    UserCredentialsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHashed = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    UserRole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    RefreshToken = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    RefreshTokenExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCredentials", x => x.UserCredentialsID);
                });

            migrationBuilder.CreateTable(
                name: "Amentities",
                columns: table => new
                {
                    AmentityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IconPictureID = table.Column<int>(type: "int", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Amentities", x => x.AmentityID);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    AppointmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    IsCanceled = table.Column<bool>(type: "bit", nullable: false),
                    CalendarAppointmentURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NoteForSalon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AppointmentTypeID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.AppointmentID);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentTypes",
                columns: table => new
                {
                    AppointmentTypeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LengthMinutes = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PromotionID = table.Column<int>(type: "int", nullable: true),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentTypes", x => x.AppointmentTypeID);
                    table.ForeignKey(
                        name: "FK_AppointmentTypes_Promotions_PromotionID",
                        column: x => x.PromotionID,
                        principalTable: "Promotions",
                        principalColumn: "PromotionID");
                });

            migrationBuilder.CreateTable(
                name: "DayHours",
                columns: table => new
                {
                    DayHoursID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OpenTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CloseTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DayHours", x => x.DayHoursID);
                });

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    PictureID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Bytes = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.PictureID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalSpent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Birthdate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserCredentialsID = table.Column<int>(type: "int", nullable: false),
                    ProfilePicturePictureID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Pictures_ProfilePicturePictureID",
                        column: x => x.ProfilePicturePictureID,
                        principalTable: "Pictures",
                        principalColumn: "PictureID");
                    table.ForeignKey(
                        name: "FK_Users_UserCredentials_UserCredentialsID",
                        column: x => x.UserCredentialsID,
                        principalTable: "UserCredentials",
                        principalColumn: "UserCredentialsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Salons",
                columns: table => new
                {
                    SalonID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WebsiteURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalonType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressID = table.Column<int>(type: "int", nullable: false),
                    OwnerUserID = table.Column<int>(type: "int", nullable: false),
                    SalonPicturePictureID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salons", x => x.SalonID);
                    table.ForeignKey(
                        name: "FK_Salons_Addresses_AddressID",
                        column: x => x.AddressID,
                        principalTable: "Addresses",
                        principalColumn: "AddressID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Salons_Pictures_SalonPicturePictureID",
                        column: x => x.SalonPicturePictureID,
                        principalTable: "Pictures",
                        principalColumn: "PictureID");
                    table.ForeignKey(
                        name: "FK_Salons_Users_OwnerUserID",
                        column: x => x.OwnerUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserFavouriteSalons",
                columns: table => new
                {
                    UserFavouriteSalonID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalonID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavouriteSalons", x => x.UserFavouriteSalonID);
                    table.ForeignKey(
                        name: "FK_UserFavouriteSalons_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ReviewID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostedTimestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    SalonID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.ReviewID);
                    table.ForeignKey(
                        name: "FK_Reviews_Salons_SalonID",
                        column: x => x.SalonID,
                        principalTable: "Salons",
                        principalColumn: "SalonID");
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Amentities_IconPictureID",
                table: "Amentities",
                column: "IconPictureID");

            migrationBuilder.CreateIndex(
                name: "IX_Amentities_SalonID",
                table: "Amentities",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AppointmentTypeID",
                table: "Appointments",
                column: "AppointmentTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_UserID",
                table: "Appointments",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTypes_PromotionID",
                table: "AppointmentTypes",
                column: "PromotionID");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTypes_SalonID",
                table: "AppointmentTypes",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_DayHours_SalonID",
                table: "DayHours",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_Pictures_SalonID",
                table: "Pictures",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_SalonID",
                table: "Reviews",
                column: "SalonID");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserID",
                table: "Reviews",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Salons_AddressID",
                table: "Salons",
                column: "AddressID");

            migrationBuilder.CreateIndex(
                name: "IX_Salons_OwnerUserID",
                table: "Salons",
                column: "OwnerUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Salons_SalonPicturePictureID",
                table: "Salons",
                column: "SalonPicturePictureID");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavouriteSalons_UserID",
                table: "UserFavouriteSalons",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProfilePicturePictureID",
                table: "Users",
                column: "ProfilePicturePictureID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserCredentialsID",
                table: "Users",
                column: "UserCredentialsID");

            migrationBuilder.AddForeignKey(
                name: "FK_Amentities_Pictures_IconPictureID",
                table: "Amentities",
                column: "IconPictureID",
                principalTable: "Pictures",
                principalColumn: "PictureID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Amentities_Salons_SalonID",
                table: "Amentities",
                column: "SalonID",
                principalTable: "Salons",
                principalColumn: "SalonID");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_AppointmentTypes_AppointmentTypeID",
                table: "Appointments",
                column: "AppointmentTypeID",
                principalTable: "AppointmentTypes",
                principalColumn: "AppointmentTypeID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Users_UserID",
                table: "Appointments",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentTypes_Salons_SalonID",
                table: "AppointmentTypes",
                column: "SalonID",
                principalTable: "Salons",
                principalColumn: "SalonID");

            migrationBuilder.AddForeignKey(
                name: "FK_DayHours_Salons_SalonID",
                table: "DayHours",
                column: "SalonID",
                principalTable: "Salons",
                principalColumn: "SalonID");

            migrationBuilder.AddForeignKey(
                name: "FK_Pictures_Salons_SalonID",
                table: "Pictures",
                column: "SalonID",
                principalTable: "Salons",
                principalColumn: "SalonID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Salons_Pictures_SalonPicturePictureID",
                table: "Salons");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Pictures_ProfilePicturePictureID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Amentities");

            migrationBuilder.DropTable(
                name: "ApplicationForms");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "ContactForms");

            migrationBuilder.DropTable(
                name: "DayHours");

            migrationBuilder.DropTable(
                name: "Emails");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "UserFavouriteSalons");

            migrationBuilder.DropTable(
                name: "AppointmentTypes");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "Salons");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserCredentials");
        }
    }
}
