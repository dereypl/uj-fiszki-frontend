import {DataService} from "./abstr/DataService";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "./firebase";
import {TSet} from "./DataTypes";


class SetService extends DataService {
    getAllByUserId = async (uid: string) => {
        const q = query(collection(db, "set"), where("userId", "==", uid));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as TSet[]
    }
}

export default new SetService("set");