CREATE PROCEDURE [dbo].[PeopleDetails_Select]
	@owner_id NVARCHAR(50)
AS
	SELECT * FROM dbo.PeopleDetails WHERE owner_id = @owner_id;
GO
