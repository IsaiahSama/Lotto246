let db = null;
const prepareDB = async function () {
  const sqlPromise = initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  const dataPromise = fetch("/static/db.sqlite").then((res) =>
    res.arrayBuffer()
  );
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
  db = new SQL.Database(new Uint8Array(buf));
};

prepareDB();

// const showSLT = () => {
//   const res = db.exec("SELECT * FROM SUPER LIMIT 10");
//   console.log(res[0]["values"][3]);
// };

// setTimeout(showSLT, 1000);
