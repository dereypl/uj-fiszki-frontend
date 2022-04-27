import {DataService} from "./abstr/DataService";
import {addDoc, doc, getDocs, query, where} from "firebase/firestore";
import {TWord} from "./DataTypes";
import {db} from "./firebase";

class WordService extends DataService {
    create = (word: string, definition: string, setId: string) => {
        const setRef = doc(db, 'set', setId);
        return addDoc(this.collection, {word, setId: setRef, definition});
    }


    getAllBySetId = async (setId: string) => {
        const setRef = doc(db, 'set', setId);
        const q = query(this.collection, where("setId", "==", setRef));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as TWord[]
    }
}

export default new WordService("word");