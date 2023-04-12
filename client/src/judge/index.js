const runProgram = async (code, language, testcases, answers) => {
  let ret = ""
  const res = await fetch("http://140.238.71.54:80/submit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
      language: language,
      testcases: testcases,
      answers: answers,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      ret = response
      console.log(JSON.stringify(response))
    });

  switch (language) {
    case "py3":
      //const resjson = await res.json().catch(err=>console.log(err))

      //.then(resp => console.log(resp))

      break;

    default:
      break;
  }

  return ret;
};

export default runProgram;
