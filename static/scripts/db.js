let db = null;
// let lottoInformation = {
//   SUPER: null,
//   DOUBLE: null,
//   EXPRESS: null,
//   MEGA6: null,
// };

// //   console.log(res[0]["values"][3]);
// const setLottoValues = (table) => {
//   res = db.exec(`SELECT * FROM ${table} LIMIT 10`);
//   lottoInformation[table] = res[0]["values"];
// };

const prepareDB = async function () {
  const sqlPromise = initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  const dataPromise = fetch("/static/db.sqlite").then((res) =>
    res.arrayBuffer()
  );
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
  db = new SQL.Database(new Uint8Array(buf));

  //   for (tableName of Object.keys(lottoInformation)) setLottoValues(tableName);
};

prepareDB();

const getAllTimeFreq = (tableName, limit) => {
  const cursor = db.exec(`SELECT NUMBERS FROM ${tableName} LIMIT ${limit}`);
  const results = cursor[0]["values"];
  //   console.log(results);
  const freqs = getFrequencies(results);
  return freqs;
};
