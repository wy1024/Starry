CREATE TABLE [dbo].[Room]
(
	[room_id] INT NOT NULL PRIMARY KEY, 
    [owner_id] INT NOT NULL,
	 --FOREIGN KEY REFERENCES [People]([Owner_Id]),
    CONSTRAINT [FK_Room_ToPeople] FOREIGN KEY ([owner_id]) REFERENCES [People]([owner_id])
)
