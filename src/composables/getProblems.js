import {ref } from 'vue'
import { projectFirestore } from '@/firebase/config';
import { collection, getDocs, query, limit, startAfter, orderBy, getDoc, doc} from 'firebase/firestore'

const getProblems = () => {
    const problems = ref([])
    const error = ref(null);
    let pagecount = 10;

    const load = async () => {
      console.log("running load...")
      try {
        const res = await getDocs(query(collection(projectFirestore, 'problems'), orderBy("difficulty"), limit(10)))
        problems.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        })
      }
      catch (err){
        error.value = err.message
        console.log(err.message)
      }
    }

    const left = async () => {
      console.log("running switch...")
    }
    const right = async () => {
      console.log("running switch...")
      try {
        console.log(pagecount)
        const res = await getDocs(query(collection(projectFirestore, 'problems'), orderBy("difficulty"), startAfter(await getDoc(doc(projectFirestore,"problems",problems.value.at(-1).id))) , limit(10)))
        console.log(res.docs[0].data())
        problems.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        })
      }
      catch (err){
        error.value = err.message
        console.log(err.message)
      }

      if(!error.value) {
        pagecount += 10;
      }
    }



    return {problems, error, load, left, right}
}

export default getProblems