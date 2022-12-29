import { projectFirestore } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import {ref } from 'vue'

const getProblem = (id)=>{
    const post = ref(null)
    const error = ref(null);
    
    const load = async () => {
      try {
        //let res = await projectFirestore.collection('problems').doc(id).get()
        let res = await getDoc(doc(projectFirestore, "problems", id))
        if(!res.exists){
          throw Error('post doesnt exist')
        }
        post.value = {...res.data(),id: res.id}
      }
      catch (err){
        error.value = err.message
        console.log(err.value)
      }
    }

    return {post, error, load}
}

export default getProblem
