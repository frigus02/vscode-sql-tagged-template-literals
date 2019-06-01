(function() {
  const sql = String.raw;

  const query = sql`
    SELECT * FROM users
  `;
})();

(function() {
  const sql = (name: string, optionalArg?: number) => (
    strings: TemplateStringsArray,
    ...values: any[]
  ) => ({
    name,
    text: String.raw(strings, ...values.map((_, i) => `$${i + 1}`)),
    values
  });

  const userId = 1;
  const query = sql("test")`
    SELECT
      *
    FROM
      users
    WHERE
      user_id = ${userId}
  `;

  const queryFunction = (userId: string) => sql(
    "test-name-which-is-too-long-for-this-line"
  )`
    SELECT
      *
    FROM
      users
    WHERE
      user_id = ${userId}
  `;
})();
