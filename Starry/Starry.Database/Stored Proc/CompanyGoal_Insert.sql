CREATE PROCEDURE [dbo].[CompanyGoal_Insert]
	@company_user_id NVARCHAR(50),
	@campaign_name nvarchar(50),
	@view nvarchar(50),
    @click NVARCHAR(50),
	@demography NVARCHAR(200),
	@tags NVARCHAR(200),
	@length NVARCHAR(50)
AS
	INSERT INTO [dbo].[Goal]
	VALUES (@company_user_id, @campaign_name, @view, @click, @demography, @tags, @length);
RETURN 0

