CREATE TABLE [dbo].[People]
(
	[_id] INT NOT NULL IDENTITY(1, 1) UNIQUE PRIMARY KEY, 
    [owner_id] INT NOT NULL UNIQUE,
    [owner_name] NVARCHAR(50) NOT NULL, 
    [verified] SMALLINT NOT NULL DEFAULT 0
)
