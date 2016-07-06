CREATE PROCEDURE [dbo].[People_SelectAll]
AS
	SELECT People.owner_id, owner_name, avg_audience, profile_pic 
		FROM dbo.People AS People 
			JOIN dbo.Room AS Room ON People.owner_id = Room.owner_id 
			JOIN dbo.PeopleDetails AS PeopleDetails ON People.owner_id = PeopleDetails.owner_id;
GO
