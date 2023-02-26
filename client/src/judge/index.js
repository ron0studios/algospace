
const runProgram = async (code, language) => {
    console.log(code)
    console.log(language)

    const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code:code,language:language})
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))

    switch (language) {
        case "py3":
            //const resjson = await res.json().catch(err=>console.log(err))
            
            //.then(resp => console.log(resp))
            
            break;
    
        default:
            break;
    }

    return "YES"
}

export default runProgram
