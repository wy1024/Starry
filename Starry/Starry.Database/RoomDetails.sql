CREATE TABLE [dbo].[RoomDetails]
(
	[_id] INT NOT NULL PRIMARY KEY, 
    [room_id] INT NOT NULL, 
    [online] INT NOT NULL, 
    [category] NVARCHAR(50) NULL, 
    [gift] NVARCHAR(MAX) NULL, 
    CONSTRAINT [FK_RoomDetails_ToRoom] FOREIGN KEY ([room_id]) REFERENCES [Room]([room_id])
)
