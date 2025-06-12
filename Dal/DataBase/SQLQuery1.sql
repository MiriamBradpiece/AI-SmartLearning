DELETE FROM [dbo].[prompts]
WHERE user_id = 326894813
  AND category_id = 3
  AND sub_category_id = 1
  AND (prompt = N'Example prompt 1' OR prompt = N'Example prompt 2');