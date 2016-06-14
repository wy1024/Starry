CREATE TABLE [dbo].[PeopleDetails]
(
	[_id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY, 
    [weight] NVARCHAR(50) NULL, 
    [avg_audience] INT NULL, 
    [analysis] NVARCHAR(MAX) NULL
)
