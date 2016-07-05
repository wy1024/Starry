CREATE TYPE [dbo].[PeopleDetailsType] AS TABLE (
    [weight] NVARCHAR(50) NULL, 
    [avg_audience] INT NULL, 
    [analysis] NVARCHAR(MAX) NULL, 
    [owner_id] INT NOT NULL, 
    [crawled_times] NCHAR(10) NOT NULL,
	[profile_pic] NVARCHAR(50) NOT NULL
	);
GO

CREATE PROCEDURE [dbo].[PeopleDetails_Upsert] @tempEntities AS PeopleDetailsType READONLY
AS
	BEGIN

		MERGE INTO [dbo].[PeopleDetails] AS target
		USING @tempEntities AS source
		ON (target.owner_id = source.owner_id)
		WHEN MATCHED THEN
			UPDATE SET 
					target.avg_audience = source.avg_audience,
					target.crawled_times = source.crawled_times,
					target.weight = source.weight,
					target.analysis = source.analysis,
					target.profile_pic = source.profile_pic
		WHEN NOT MATCHED THEN
			INSERT (weight, avg_audience, analysis, owner_id, crawled_times)
			VALUES (source.weight,
					source.avg_audience,
					source.analysis,
					source.owner_id,
					source.crawled_times,
					source.profile_pic
				);	
	END;

GO