import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../firebase";

export abstract class DataService {
    collection;

    constructor(collectionName: string) {
        this.collection = collection(db, collectionName);
    }

    getAll = async () => {
        const snapshot = await getDocs(this.collection);
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
    };

    getOne = async (id: string) => {
        if (!id) return;
        const docRef = doc(db, this.collection.path, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.error("No such document!");
            return null;
        }
    };

}



