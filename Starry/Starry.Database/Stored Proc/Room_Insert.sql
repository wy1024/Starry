CREATE PROCEDURE [dbo].[Room_Insert]
	@room_id INT,
    @owner_id INT,
	@online INT, 
    @category NVARCHAR(50), 
    @gift NVARCHAR(MAX), 
    @timestamp DATETIME
AS
	INSERT INTO [dbo].[Room]
	VALUES (@room_id, @owner_id, @online, @category, @gift, @timestamp);
RETURN 0
