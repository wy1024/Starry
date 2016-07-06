CREATE PROCEDURE [dbo].[Room_Insert]
	@room_id nvarchar(50),
    @owner_id NVARCHAR(50),
	@online INT, 
    @category NVARCHAR(50), 
    @gift NVARCHAR(MAX), 
    @timestamp DATETIME
AS
	INSERT INTO [dbo].[Room]
	VALUES (@room_id, @owner_id, @online, @category, @gift, @timestamp);
RETURN 0
