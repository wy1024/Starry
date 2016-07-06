CREATE TYPE [dbo].[PeopleEntityType] AS TABLE (
	[owner_id] NVARCHAR(50) NOT NULL,
    [owner_name] NVARCHAR(50) NOT NULL, 
    [verified] SMALLINT NOT NULL DEFAULT 0
	);
GO

CREATE PROCEDURE [dbo].[People_Upsert] @tempEntities AS PeopleEntityType READONLY
AS
	BEGIN

		MERGE INTO [dbo].[People] AS target
		USING @tempEntities AS source
		ON (target.owner_id = source.owner_id)
		WHEN MATCHED THEN
			UPDATE SET 
					target.verified = source.verified
		WHEN NOT MATCHED THEN
			INSERT (owner_id, owner_name, verified)
			VALUES (source.owner_id,
					source.owner_name,
					source.verified
				);	
	END;

GO