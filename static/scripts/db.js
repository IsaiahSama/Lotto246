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

  const dataPromise = fetch("./static/db.sqlite").then((res) =>
    res.arrayBuffer()
  );
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
  db = new SQL.Database(new Uint8Array(buf));

  //   for (tableName of Object.keys(lottoInformation)) setLottoValues(tableName);
};

prepareDB();

const queryDb = (queryString) => {
  const cursor = db.exec(queryString);
  if (cursor[0] == undefined) return null;
  return cursor[0]["values"];
};

const getAllTimeFreq = (tableName) => {
  const queryString = `SELECT NUMBERS FROM ${tableName}`;

  const results = queryDb(queryString);
  if (results == null) return null;
  return getFrequencies(results);
};

const getDayFreq = (tableName, day) => {
  let queryString = `SELECT NUMBERS FROM ${tableName} WHERE DATE LIKE "%_/${day}/%_"`;
  if (day < 10) queryString += `OR DATE LIKE "$_/0${day}/%_"`;
  const results = queryDb(queryString);
  if (results == null) return null;
  return getFrequencies(results);
};

const getMonthFreq = (tableName, month) => {
  const queryString = `SELECT NUMBERS FROM ${tableName} WHERE DATE LIKE "${month}/%_/%_"`;
  const results = queryDb(queryString);
  if (results == null) return null;
  return getFrequencies(results);
};

const getYearFreq = (tableName, year) => {
  const queryString = `SELECT NUMBERS FROM ${tableName} WHERE DATE LIKE "%_/%_/${year}"`;
  const results = queryDb(queryString);
  if (results == null) return null;
  return getFrequencies(results);
};
