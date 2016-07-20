CREATE TABLE [dbo].[Goal]
(
	[_id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1), 
    [company_user_id] NVARCHAR(50) NOT NULL, 
    [campaign_name] NVARCHAR(50) NOT NULL, 
    [view] NVARCHAR(50) NOT NULL, 
    [click] NVARCHAR(50) NOT NULL, 
    [demography] NVARCHAR(200) NOT NULL, 
    [tags] NVARCHAR(200) NOT NULL, 
    [length] NVARCHAR(50) NOT NULL
)
