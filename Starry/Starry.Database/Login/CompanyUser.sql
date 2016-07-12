CREATE TABLE [dbo].[CompanyUser]
(
	[_id] BIGINT NOT NULL IDENTITY(1, 1) UNIQUE PRIMARY KEY, 
    [name] NVARCHAR(50) NOT NULL, 
	[user_id] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(100) NOT NULL,  
    [password_hashed] NVARCHAR(50) NOT NULL, 
    [created_date] DATETIME NOT NULL, 
    [email_verified] INT NOT NULL, 
    [email_verification_code] NVARCHAR(10) NOT NULL
)
