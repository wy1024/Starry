CREATE PROCEDURE [dbo].[KolUser_Select]
	@username NVARCHAR(50)
AS
	SELECT password_hashed, name FROM dbo.KolUser WHERE user_id = @username;
RETURN 0
