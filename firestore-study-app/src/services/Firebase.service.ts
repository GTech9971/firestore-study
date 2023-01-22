import { FirebaseApp, initializeApp } from "@firebase/app";
import { DocumentReference, DocumentData, doc, addDoc, collection, getFirestore, Firestore, setDoc, Timestamp, getDoc, DocumentSnapshot, onSnapshot } from "@firebase/firestore";
import { FirebaseConsts } from "../consts/FirebaseConfig.const";


export class FirebaseService {

    private database: Firestore;


    /** 
    * ルームへの参照
    * - rooms/{uid} *     
    *  */
    private roomRef(uid: string): DocumentReference { return doc(this.database, `rooms`, uid); }

    constructor() {
        const app: FirebaseApp = initializeApp(FirebaseConsts.firebaseConfig);
        this.database = getFirestore(app);
    }

    public async createRoomV1(uid: string) {
        //作成日時の登録        
        await setDoc(this.roomRef(uid), {
            roomCode: null,
            controller: {
                type: null,
                sender: null,
                sessionDescription: null,
                candidate: null,
            },
            uploader: {
                type: null,
                sender: null,
                sessionDescription: null,
                candidate: null,
            },
            updatedAt: Timestamp.now(),
        });
    }

    public async createRoomV2(uid: string) {

    }

}