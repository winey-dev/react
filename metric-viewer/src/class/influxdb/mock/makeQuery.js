import QueryBuilder from "../querybuilder";

const inQuery = (queryMap) => {
  //   const builder = new QueryBuilder();

  //   return builder.Builder();
  console.log(queryMap);
};

const MakeQuery = (queryArray) => {
  const queries = [];
  for (let i = 0; i < queryArray.length; i++) {
    const query = inQuery(queryArray[i]);
    if (query) {
      queries.push(query);
    }
  }
  return queries;
};

export default MakeQuery;
