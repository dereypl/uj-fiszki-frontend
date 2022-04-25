import {DataService} from "./abstr/DataService";
import {getDocs, query, where, addDoc} from "firebase/firestore";
import {TSet} from "./DataTypes";


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


    create = (name: string, uid: string) => {
        return addDoc(this.collection, {name, userId: uid, isPublic: false});
    }
}

export default new SetService("set");