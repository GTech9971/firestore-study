import { DocumentData, DocumentSnapshot, SnapshotOptions } from "@firebase/firestore";

export class OfferModel {

    public type: "offer" | "answer" | "candidate" | null;
    public sender: "controller" | "uploader" | null;
    public session: string | null;

    public candidate: string | null;

    constructor(type: "offer" | "answer" | "candidate" | null, sender: "controller" | "uploader" | null, session: string | null, candidate: string | null) {
        this.type = type;
        this.sender = sender;
        this.session = session;
        this.candidate = candidate;
    }
}

export const offertypeConverter = {
    toFirestore: (offer: OfferModel) => {
        return {
            type: offer.type,
            sender: offer.sender,
            session: offer.session,
            candidate: offer.candidate
        };
    },

    fromFirestore: (snapShot: DocumentSnapshot, options?: SnapshotOptions | undefined) => {
        const data: DocumentData | undefined = snapShot.data(options);
        return new OfferModel(data?.type, data?.sender, data?.session, data?.candidate);
    }
}