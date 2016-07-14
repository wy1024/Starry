CREATE PROCEDURE [dbo].[CompanyUser_Select]
	@username NVARCHAR(50)
AS
	SELECT password_hashed FROM dbo.CompanyUser WHERE user_id = @username;
RETURN 0
