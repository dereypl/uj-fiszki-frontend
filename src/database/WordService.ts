import {DataService} from "./abstr/DataService";
import {addDoc, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {TWord} from "./DataTypes";
import {db} from "./firebase";

class WordService extends DataService {
    create = (word: string, definition: string, setId: string) => {
        const setRef = doc(db, 'set', setId);
        return addDoc(this.collection, {word, setId: setRef, definition});
    }

    update = (word: string, definition: string, wordId: string) => {
        const ref = doc(db, this.collection.id, wordId);
        return updateDoc(ref, {word, definition});
    }

    delete = (wordId: string) => {
        return deleteDoc(doc(db, this.collection.id, wordId));
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