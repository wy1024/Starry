CREATE PROCEDURE [dbo].[KolUser_Insert]
	@name NVARCHAR(50),
	@user_id nvarchar(50),
	@email nvarchar(100),
    @password_hashed NVARCHAR(50),
	@created_date datetime,
	@email_verified int, 
	@email_verification_code NVARCHAR(10)
AS
	INSERT INTO [dbo].[KolUser]
	VALUES (@name, @user_id, @email, @password_hashed, @created_date, @email_verified, @email_verification_code);
RETURN 0

