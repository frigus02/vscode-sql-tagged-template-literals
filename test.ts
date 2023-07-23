function sqlTag() {
  interface Query<T> {
    text: string;
    values: any[];
  }

  const sql = <T = any>(
    strings: TemplateStringsArray,
    ...values: any[]
  ): Query<T> => ({
    text: String.raw(strings, ...values.map((_, i) => `$${i + 1}`)),
    values,
  });

  const createOrder = (userId: string, notes: string | null) => sql`
    INSERT INTO orders(
      user_id
      notes,
      status,
      created_at,
      updated_at
    ) VALUES(
      ${userId},
      ${notes},
      'created',
      NOW(),
      NOW()
    )
    RETURNING *
  `;

  interface Order {
    order_id: number;
  }

  const getOrder = (orderId: number) => sql<Order>`
    SELECT
      *
    FROM
      orders
    WHERE
      order_id = ${orderId}
  `;

  const getOdrerMultilineGeneric = (orderId: number) => sql<{
    order_id: number;
  }>`
  SELECT
    *
  FROM
    orders
  WHERE
    order_id = ${orderId}
`;

  const obj = { sql };

  const getAllOrders = () => obj.sql<Order[]>`
    SELECT
      *
    FROM
      orders
  `;

  class Test {
    sql: typeof sql;
    #sql: typeof sql;
    run() {
      this.sql`SELECT * FROM users`;
      this.#sql`SELECT * FROM users`;
    }
  }
}

function sqlComment() {
  const createOrder = (userId: string, notes: string | null) => /* sql */ `
    INSERT INTO orders(
      user_id
      notes,
      status,
      created_at,
      updated_at
    ) VALUES(
      ${userId},
      ${notes},
      'created',
      NOW(),
      NOW()
    )
    RETURNING *
  `;

  const createTable = () => /*sql*/ `
    CREATE TABLE \`teams\` (
      \`Id\` INT AUTO_INCREMENT PRIMARY KEY
    )
  `;
}

function sqlFunction() {
  interface Query<T1, T2> {
    name: string;
    text: string;
    values: any[];
  }

  const sql = <T1 = any>(name: string) => <T2 = any>(
    strings: TemplateStringsArray,
    ...values: any[]
  ): Query<T1, T2> => ({
    name,
    text: String.raw(strings, ...values.map((_, i) => `$${i + 1}`)),
    values,
  });

  const createOrder = (userId: string, notes: string | null) => sql(
    "create-order"
  )`
  INSERT INTO orders(
    user_id
    notes,
    status,
    created_at,
    updated_at
  ) VALUES(
    ${userId},
    ${notes},
    'created',
    NOW(),
    NOW()
  )
  RETURNING *
  `;

  interface Order {
    order_id: number;
  }

  const getOrder = (orderId: number) => sql<Order>("get-order")<Order>`
    SELECT
      *
    FROM
      orders
    WHERE
      order_id = ${orderId}
  `;

  const obj = { sql };

  const getAllOrders = () => obj.sql<Order[]>("get-all-orders")`
    SELECT * FROM orders
  `;

  class Test {
    sql: typeof sql;
    #sql: typeof sql;
    run() {
      this.sql("run")`SELECT * FROM users`;
      this.#sql("run")`SELECT * FROM users`;
    }
  }
}

function normalSqlFunction() {
  const test = () => "sql";
  const sql = () => "sql";

  const a = test();
  const b = sql();
  const c = test();
}
