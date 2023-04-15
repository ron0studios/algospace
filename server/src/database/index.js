//import PocketBase from 'pocketbase';

//const pb = new PocketBase('http://140.238.71.54');

//const test = await pb.collection('problem').getList(1,1, {expand: 'tag'})
//console.log(test.items.map(x=>x.expand.tag.map(y=>y.title)))

//SELECT tag.title FROM problem INNER JOIN problem_tag ON problem_tag.problem_id=problem.id INNER JOIN tag ON tag.id = problem_tag.tag_id WHERE problem.title = "Sum to N";

/*
const tags = (await pb.collection('tag').getFullList()).map(x => x.id)
console.log(tags)

const choice = inp => {
  return inp[Math.round(Math.random()*(inp.length-1))]
}
for(let i = 0; i < 1; i++)
{
  let out = "ZZFillerProblem"
  let tag = []
  for(let j = 0; j < 10; j++)
  {
    out += choice(" abcdefghijklmnopqrstuvwxyz")
  }
  for(let j = 0; j < Math.random()*5; j++)
  {
    tag.push(choice(tags))
  }

  const obj = {
    contest: choice(["BIO", "USACO", "IOI", "CF", "HR", "SPOJ", "DMOJ"]),
    difficulty: choice(["EASY", "MEDIUM", "HARD", "INSANE"]), 
    statement: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n $R_n(x)=\\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$\n ## Input\n ad minim veniam, quis nostrud exercitation ullamco $0 \\leq N \\leq 100$.\n ## Output\n reprehenderit in voluptate **X**.\n ## Example\n ### input\n \`\`\` \n 3 ABCD \n \`\`\`\n ### output\n\`\`\`\n23 esd\n329 lol\n231 III\n\`\`\`\n### explanation\nExcepteur sint occaecat cupidatat non proident.\n ",
    tag: tag,
    creator: 'wwh55szwbkw1ed3',
    title: out,
    testcase: {
      input: [1,2,3,4,5],
      output: [1,2,3,4,5]
    }
  }
  console.log(obj)

  //addDoc(collection(projectFirestore,"problems"),obj)
  await pb.collection('problem').create(obj)
}
*/
const pb = ()=>{}
export default pb;