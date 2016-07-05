CREATE PROCEDURE [dbo].[PeopleDetails_Select]
	@owner_id int = 0
AS
	SELECT * FROM dbo.PeopleDetails WHERE owner_id = @owner_id;
GO
