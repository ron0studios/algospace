import {ref } from 'vue'
import { projectFirestore } from '@/firebase/config';
import { collection, getDocs, query, limit, startAfter, orderBy, getDoc, doc, endBefore, limitToLast, getCountFromServer} from 'firebase/firestore'

const getProblems = () => {
    const problems = ref([])
    const error = ref(null);
    const pagecount = 10;
    const page = ref(1);
    const tot_problems = ref(0)
    
    let loading = false;

    const load = async () => {
      if(loading) return;
      loading = true;

      console.log("running load...")
      try {
        const res = await getDocs(query(collection(projectFirestore, 'problems'), orderBy("difficulty"), limit(pagecount)))
        problems.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        })
        const res2 = await getCountFromServer(collection(projectFirestore, 'problems'))
        tot_problems.value = res2.data().count
        //console.log(res2.data().count)
      }
      catch (err){
        error.value = err.message
        console.log(err.message)
      }

      loading = false;
    }

    const left = async () => {
      if(loading){
        console.log("blocked")
        return;
      } 
      loading = true;

      console.log("running switch...")
      if(page.value == 1){
        loading = false;
        return;
      }

      try {
        //console.log(pagecount)
        const res = await getDocs(query(collection(projectFirestore, 'problems'), orderBy("difficulty"), endBefore(await getDoc(doc(projectFirestore,"problems",problems.value.at(0).id))) , limitToLast(pagecount)))
        //console.log(res.docs[0].data())
        problems.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        })
      }
      catch (err){
        error.value = err.message
        console.log(err.message)
      }

      if(!error.value) {
        page.value -= 1
      }

      loading = false;
    }
    const right = async () => {
      if(loading) {
        console.log("blocked")
        return;
      }
      loading = true;

      console.log("running switch...")
      try {
        //console.log(pagecount)
        const res = await getDocs(query(collection(projectFirestore, 'problems'), orderBy("difficulty"), startAfter(await getDoc(doc(projectFirestore,"problems",problems.value.at(-1).id))) , limit(pagecount)))
        //console.log(res.docs[0].data())
        if(res.docs.length <= 0){ 
          loading = false;
          return;
        }

        problems.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        })
      }
      catch (err){
        error.value = err.message
        console.log(err.message)
      }

      if(!error.value) {
        page.value += 1
      }

      loading = false;
    }



    return {problems, error, load, left, right, page}
}

export default getProblems