const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const {exec, spawn} = require('child_process');
const fs = require('fs');

const app = express()

app.use(bp.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))



app.get("/api", (req, res) => {
    //res.send("hello there")
    res.json({"users": ["userOne", "userTwo", "ron0studios"]})
})

const runPythonTests = async (testcases, answers) => {
    let results = []

    for(let i = 0; i < testcases.length; i++) {
      let result = await new Promise((resolve, _reject) => { 
        const python = spawn('python', ['code.py']);

        setTimeout(()=>{resolve("TLE")},1000) // time limit exceeded

        python.stdin.write(testcases[i].toString())
        python.stdin.end()
        let output = null;

        python.stdout.on('data', (data) => {
            console.log('Pipe data from python script ...');
            output = data.toString().trim();
            //console.log(output)
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            if(code != 0 || code === null){
              resolve("RE") // runtime error
            }
            
            // send data to browser
            if(output == answers[i])
            { 
                resolve("AC") // accepted
            }
            else
            {
                resolve("WA") // wrong answer
            }
        });
      })

      results.push(result)
      if(result != "AC")
      {
        break;
      }
    }

    return results;
}


const runCpp20Tests = async (testcases, answers) => {
    let results = []

    console.log("compiling c++20...")
    let compile = await new Promise((resolve, _reject) => {
      exec('g++ -Wall -Wextra -std=c++20 '+'code.cpp'+' -o ' + 'code', (error, _stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          resolve("CE");
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          resolve("CE"); // compilation error
          return;
        }
        resolve("CS") // compilation successful
      });
    }).catch((err)=>{throw err})

    if(compile == "CE") return ["CE"]

    console.log("compiled! now running testcases...")
    
    for(let i = 0; i < testcases.length; i++) { 
      console.log(`Testcase #${i+1}:`)
      let result = await new Promise((resolve, _reject) => {
          const cpp = spawn('./code');

          setTimeout(()=>{resolve("TLE")},1000) // time limit exceeded

          cpp.stdin.write(testcases[i].toString())
          cpp.stdin.end()

          let output = null;

          cpp.stdout.on('data', (data) => {
              output = data.toString().trim();
          });

          cpp.stderr.on('data', (data) => console.log(data.toString()))


          // in close event we are sure that stream from child process is closed
          cpp.on('close', (code) => {
              if(code != 0 || code === null){
                resolve("RE") // runtime error
              }
              
              // send data to browser
              if(output == answers[i])
              { 
                  resolve("AC") // accepted
              }
              else
              {
                  resolve("WA") // wrong answer
              }
          });

      });

      results.push(result);
      if(result != "AC")
      {
        break;
      }

      
    }

  return results;
}




app.post("/submit", async (req,res) => {
    console.log("received")

    const {code, language} = req.body
    const lang2ext = {cpp20:"cpp",py3:"py"}
    
    await new Promise( (resolve, reject) => {
      fs.writeFile('code.'+lang2ext[language], code, (err) => {
        if (err) reject(err);
        console.log("saved!")
        resolve();
      }); 
    }).catch((err)=>{console.log(err)});


    // example problem statement:
    // print the sum of the first n numbers, given n (inclusive) 
    // if n is even, also print "even"
    const testcases = ["7","3","2","1","5","10000000","10000000000", "10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", "923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296983247106012836081263480163000832128","923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296983247106012836081263480163000832128923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296983247106012836081263480163000832128923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296923716948763218497698317469873649872163987469187364987632198746982179643876219837469821736498712369847632198476321987463981726476219874698217364987129692371694876321849769831746987364987216398746918736498763219874698217964387621983746982173649871236984763219847632198746398172647621987469821736498712969237169487632184976983174698736498721639874691873649876321987469821796438762198374698217364987123698476321984763219874639817264762198746982173649871296983247106012836081263480163000832128"]
    const answers   = ["28","6","3\neven","1","15","50000005000000\neven","50000000005000000000\neven", "50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\neven", "426626500716215213642286075621208120065542140250605428701048222339585535927215754012841120951030637854747683127985316365054827827684161299498066970847703185275877885867976664937678578422319487194679284603439660005030314781379567947820683096499515031653688346532754271756427191779655287935625200217767616370790168415021458910126779503603263242017533350866400921518782667100916641432024008208090392699952190192475271001187634890077654215974130059373845046242305274904145612015375979114936429453531559877327245787703706230272369532606926594810653083389673901155029726657519962706097734290315469759872591333084753153296678907813973928027951253258286136641956785148325553419383464740107065078880049712750935258329081192621492116192318770315903352651380779816154527577910294325442641025814440886357121911729618084571788073621573969252695343749827903411716290312654265941257723223611402776720277515832677430049900057984049092076010388465882608664738841520979504049062874359190120959203137998099176780185215748709947562376325329723560357367640896469640021678211818466321030715471947651282918377324084197085078604628966856991101808452148100646182337077002925986838862969815852488712475957445760976518769677561341864692684365652173629426371924849378169451001805925885302742654628460480837588749255475647598733039880673118339407244445259587915475786339057535295486254753928651838494017754403300562866403256545116710304756218942903797446433649755301692759777722760685962802989896860006453738307924894772149158924466280506857569482956906768643372451662856068941578690376251561324735196948287137188683796856578787871656628412085411466044905253909083492590343110217053107367839704685715064242203093612154639845862864570972202750075518001415193090940183742443717980346724466054387183324608916513398737449570347130454165958668499365242313443780754184997914299408483157127290678034401856248313555746816149910520177808190628326926756582550261334250140656654988165994988662660660021476001605538113728806063461313483238002779748413579379616069648559218453828144679598381834658420724807444676806177684894143956501929727693190872545319301547897973184938219362713119702562768984676775935531904651446576286222604129830717898285025400875693923109858622194477422224750504285588751547902463645549563539255850355811908010805680173769137871051312584769592829665059982544519347595838658495967890710175203662662046543005385081559840818400855039536094433728119320688968754470964110407063980806450907197907404100170149770467605562340184881445184821202803942146310464534378829511269112276164691983270763391110231305634235631814084765279675104782579668313733784891737379354268075918992078589704077285333459036392635472441445712051438224047048929846258791735656684879002055909567331176811335188327903416300942352817291718920256\neven", "426626500716215213642286075621208120065542140250605428701048222339585535927215754012841120951030637854747683127985316365054827827684161299498066970847703185275877885867976664937678578422319487194679284603439660005030314781379567947820683096499515031653688346532754271756427191779655287935625200217767616370790168415021458910126779503603263242017533350866400921518782667100916641432024008208090392699952190192475271001187634890077654215974130059373845046242305274904145612015375979114936429453531559877327245787703706230272369532606926594810653083389673901155029726657519962706097734290315469759872591333084753153296678907813973928027951253258286136641956785148325553419383464740107065078880049712750935258329081192621492116192318770315903352651380779816154527577910294325442641025814440886357121911729618084571788073621573969252695343749827903411716290312654265941257723223611402776720277515832677430049900057984049092076010388465882608664738841520979504049062874359190120959203137998099176780185215748709947562376325329723560357367640896469640021678211818466321030715471947651282918377324084197085078604628966856991101808452148100646182337077002925986838862969815852488712475957445760976518769677561341864692684365652173629426371924849378169451001805925885302742654628460480837588749255475647598733039880673118339407244445259587915475786339057535295486254753928651838494017754403300562866403256936511237355577397378317213752024953804392238667306086346683033991071146776328043029079298547477239944603733298316496567601749324027028622339114304199501763394693862372393149198811761488219458812755779745369366701123605992031369809021784189666684787925212136249060283844341012299741785229951686826024610987566565216700504846667624832048105847840164482888210406509884810486938510681374066044947862185185596389916828891803192184966708086759766946222162927179879366104716377037841536848794738974979905338780188387634965726037467388438184595367092905589157867156620875175522195026870344199499653872376172339326100207568776270359101631121438466736517579422927155573461894297102624092580823178412969102495979717467425006746186407083524401759032333105013012838593421247852708090301441910855799745957553716831197629230816029202160150144631782789728922891443304364821918792597482059466436176909811470082278840844325423247494853855356697365859945564524145567572010254290428586897461003788000548326161654887263701075789709508452034547822451991364371970685405638040479150437020443690168325054063431115445253576346090074565777557087470599256153791837335041748538307171509722713764432088969826036503776279436258339199652575854929140199480098037154086767443809259593497912370251225548519509813350752884205391800835024423544047447668366072317512607198193634651146835324385194554008027397918410527678335951310705446395973994939581114348351882841787543242337084006743992317845642556757625440332045317476143923842034459783468647676770148670820369895945180161637551300341513509838876809633459944944554119430430832274887299073397216897202683171670222885282833854544196735925965366295932254832819828282524278173434281605604342962018379550783208470160492948453662795614910019891500986953872960379930724123881805331670419002587358386782418749479855761957545403833070480808117453457305287142060307094582653048496428250800233130987566225221802565244269442595923532727788641833158212023693524427347642954108683837984879753345567447261840873632904229334214925680214749022203897525998598235174821783445054581277945888492241024176605768820870880697974730033202161313558645245861032314917795121855160242795897158605557985521932777173889843984782746331036568221829629942371170318416989571643937240895321469577099345424331880251638750788510940615634703006265837282464309449614164516459517982814604801048372863098553146529589311653441631856640578739372084546615087847471730789597869139834553010171908388998825208484906806310067613575520164698123073132746364206937492333006494150627504156475611676375465463694627246576040102839117057440459025492628225330769702383324156718167517381069939437759796468578538789112756512935136002937008966414976555929487699375437298920600930244758375162515635179364216301819066652056109036218153564886183583480586414966073708067317233001889593179038051955586105961118558231031770784280087665353338636566621169217974576799899454378018133757522772538734928008204570157703719214653268988627033009569071731070020598667832769648627656111269826929855653264632539979863880513356104415197682265127856359852098123765806108167391083105849980625395387705982023965694448258673955368347415213514411164509317597266560841784280596356903221888495756271687996044245032275473079175931901179429023463435192807211100714075828189445748112745972996766141769534632564962920665842957057480466247083333547174431686320645250485473856957774104706325054746192880784607565160322575508693406562882995511125201093209795281419816611467560173568690129680384447824477323620384168607646772016660763061622253216659003941804993440921057374343456786855095471642495072557224263709958313693086853605143163221273606056229423720407213627269024499664762574871277387392784338859553152612532608249113604423305390264373387762500512754789177464572502695119292945742957917366767639970845238883767728432212785907343639254946390277732492580588097311076079286316792527098158252601774530308320735909777569670487807157516378847412791233756964975640480855441445909555720015077115350212157902984591494136132724721219125451516987916642729900934116255407309788907146368502045851506068323816647096790410853072216439040281224102254601572837888735153055001446944118402678934935577250483494151791176478380406320774454475507709118742754546102491218751248780516450838037772029878403111510695292710189420740156809192228065741219458081470203088655414933073929801363324505376622117846766455010176659760099381740842823673851792599535584328700387938641248102857481347369004429121454542260521535782789565074850002156209457156530569346478165863456574307039832363860363400226389980799608332834624970634801147726364094701381878605166878713871289605125671358865639261133228258186252347648117165508141213094810365478954664251808539478233926310723637990247573817064244244126802685676742161197351652705667306376122379352205083557065685163836158651442993676875891674772152329216359443995838789178816381348343166751935585207878346718349296763452331617645082204561635819477829684428831274509290750558633517323244230231299640919200753803404385418572656039889766157612216474599134401316813091931078492807001959767848565940102043886050195598050219788525212273527880087129512206660547987166240918695822743044164469799854923939067748096796179125418581175245223941131524096829825630480365750806864951050199456119532343575123589444922917589895214139884978822048433996298394862623067558275346067694164405450120974768628626333706564105657212648205392488012154639101171189914153422766917978038107380418793581376601409351503178871014941775813684092320201598477195064803827704545116710304756218942903797446433649755301692759777722760685962802989896860006453738307924894772149158924466280506857569482956906768643372451662856068941578690376251561324735196948287137188683796856578787871656628412085411466044905253909083492590343110217053107367839704685715064242203093612154639845862864570972202750075518001415193090940183742443717980346724466054387183324608916513398737449570347130454165958668499365242313443780754184997914299408483157127290678034401856248313555746816149910520177808190628326926756582550261334250140656654988165994988662660660021476001605538113728806063461313483238002779748413579379616069648559218453828144679598381834658420724807444676806177684894143956501929727693190872545319301547897973184938219362713119702562768984676775935531904651446576286222604129830717898285025400875693923109858622194477422224750504285588751547902463645549563539255850355811908010805680173769137871051312584769592829665059982544519347595838658495967890710175203662662046543005385081559840818400855039536094433728119320688968754470964110407063980806450907197907404100170149770467605562340184881445184821202803942146310464534378829511269112276164691983270763391110231305634235631814084765279675104782579668313733784891737379354268075918992078589704077285333459036392635472441445712051438224047048929846258791735656684879002055909567331176811335188327903416300942352817291718920256\neven"]

    let results     = [];

    

    let start = performance.now();
    switch(language){
      case 'py3':
        results = await runPythonTests(testcases,answers);
        break;
      case 'cpp20':
        results = await runCpp20Tests(testcases,answers);
        break;
    }
    let end = performance.now();
    console.log(Math.round(end-start)+'ms')


    res.json({output: results})


    //res.json({hi:2})
})

app.listen(5000, () => {console.log("server started on port 5000 :D")})
