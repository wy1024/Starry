CREATE TABLE [dbo].[Comments]
(
	[_id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [room_id] INT NOT NULL, 
    [user_id] INT NOT NULL, 
    [user_name] NVARCHAR(50) NOT NULL, 
    [comments] NVARCHAR(MAX) NULL, 
    [timestamp] DATETIME NOT NULL, 
    CONSTRAINT [FK_Comments_ToRoom] FOREIGN KEY ([room_id]) REFERENCES [Room]([room_id])
)
