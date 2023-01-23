import { FirebaseApp, initializeApp } from "@firebase/app";
import { DocumentReference, DocumentData, doc, addDoc, collection, getFirestore, Firestore, setDoc, Timestamp, getDoc, DocumentSnapshot, onSnapshot } from "@firebase/firestore";
import { FirebaseConsts } from "../consts/FirebaseConfig.const";
import { OfferModel, offertypeConverter } from "../models/Offer.model";

/**
 * rooms/{uid}(document)
 *  - roomCode(field)
 *  - createdAt
 *  - updatedAt
 *  - conections(collection)
 *      - controller(document)
 *          - type
 *          - sender
 *          - session
 *          - candidate
 *      - uploader(document)
 *          - type
 *          - sender
 *          - session
 *          - candidate
 */
export class FirebaseService {

    private database: Firestore;


    /** 
    * ルームへの参照
    * - rooms/{uid} *     
    *  */
    private roomRef(uid: string): DocumentReference { return doc(this.database, `rooms`, uid); }

    private controllerRef(uid: string): DocumentReference { return doc(this.database, "rooms", uid, "connections", "controller"); }

    private uploaderRef(uid: string): DocumentReference { return doc(this.database, "rooms", uid, "connections", "uploader"); }

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

    /**
     * サブコレクション
     * @param uid 
     */
    public async createRoomV2(uid: string) {
        await setDoc(this.roomRef(uid), {
            roomCode: null,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });

        await setDoc(this.controllerRef(uid), {
            type: null,
            sender: null,
            session: null,
            candidate: null,
        });

        await setDoc(this.uploaderRef(uid), {
            type: null,
            sender: null,
            session: null,
            candidate: null,
        });
    }

    public async listening(uid: string) {
        onSnapshot(this.controllerRef(uid).withConverter(offertypeConverter), async (doc) => {
            const data: OfferModel = doc.data()!;
            console.log("controller - notify update");
            console.log(data);
        });

        onSnapshot(this.uploaderRef(uid).withConverter(offertypeConverter), async (doc) => {
            const data: OfferModel = doc.data()!;
            console.log("uploader - notify update");
            console.log(data);
        });
    }

    public async updateRoomCode(uid: string) {
        const newRoomCode: string = "new room code !";
        await setDoc(this.roomRef(uid), {
            roomCode: newRoomCode,
            updatedAt: Timestamp.now()
        }, { merge: true });
    }

    public async updateController(uid: string) {
        const model = {
            type: "offer",
            sender: "uploader",
            session: "session data",
            candidate: null
        };
        await setDoc(this.controllerRef(uid), model, { merge: true });
    }

    public async updateUploader(uid: string) {
        const model = {
            type: "offer",
            sender: "controller",
            session: "session data",
            candidate: null
        };
        await setDoc(this.uploaderRef(uid), model, { merge: true });
    }

}