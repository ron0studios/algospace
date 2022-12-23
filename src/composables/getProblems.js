import {ref } from 'vue'
import { projectFirestore } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore'

const getProblems = () => {
    const problems = ref([])
    const error = ref(null);

    const load = async () => {
      console.log("running load...")
      try {
        const res = await getDocs(collection(projectFirestore, 'problems'))
        problems.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        })
      }
      catch (err){
        error.value = err.message
        console.log(err.value)
      }
    }


    return {problems, error, load}
}

export default getProblems