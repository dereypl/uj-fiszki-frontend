import {DataService} from "./abstr/DataService";
import {getDocs, query, where, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {TSet} from "./DataTypes";
import {db} from "./firebase";


class SetService extends DataService {
    getAllByUserId = async (uid: string) => {
        const q = query(this.collection, where("userId", "==", uid));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as TSet[]
    }

    getAllPublic = async () => {
        const q = query(this.collection, where("isPublic", "==", true));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as TSet[]
    }

    update = async(name: string, userId: string, id: string, isPublic: boolean) => {
        const ref = doc(db, this.collection.id, id);
        return updateDoc(ref, {name: name, userId: userId, isPublic: isPublic});
    }

    create = (name: string, uid: string) => {
        return addDoc(this.collection, {name, userId: uid, isPublic: false});
    }

    delete = (setId: string) => {
        return deleteDoc(doc(db, this.collection.id, setId));
    }

}

export default new SetService("set");