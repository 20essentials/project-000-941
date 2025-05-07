import { createClient } from '@libsql/client';

const client = createClient({
  url: import.meta.env.DATABASE_URL ?? '',
  authToken: import.meta.env.DATABASE_TOKEN ?? ''
});

export const addUserVotes = async (
  username: string,
  allVotes: Array<Array<string>>
) => {
  const sql = `INSERT INTO votes (username, category_id, option_id, rank) VALUES (?, ?, ?, ?)`;

  const inserts = allVotes.map((arrayOptions, catId) => {
    const categoryId = catId + 1;

    return arrayOptions.map((optionValue, rankInd) => {
      const rannkId = rankInd + 1;

      return {
        sql,
        args: [username, categoryId, optionValue, rannkId]
      };
    });
  }).flat();

  const result = await client.batch(inserts, 'write');
  return result;
};

export const cleanUser = async (username: string) => {
  const result = await client.execute({
    sql: 'DELETE FROM votes WHERE username = ?',
    args: [username]
  });

  return result;
};
