import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { FirebaseService } from '../services/Firebase.service';

const Home: React.FC = () => {

  const service: FirebaseService = new FirebaseService();

  const UIDV2: string = "ge7ovTUN1iNJgVsvaPvW";

  const onClickListeningBtn = async () => {
    await service.listening(UIDV2);
  }

  const onCLickUpdateUploader = async () => {
    await service.updateUploader(UIDV2);
  }

  const onCLickUpdateController = async () => {
    await service.updateController(UIDV2);
  }

  const onClickUpdateRoomCode = async () => {
    await service.updateRoomCode(UIDV2);
  }

  const onClickCreateRoomV1Btn = async () => {
    const uid: string = "OhfyuMoPqb1gdDSDKfYU";
    await service.createRoomV1(uid);
  }

  const onClickCreateRoomV2Btn = async () => {
    const uid: string = "ge7ovTUN1iNJgVsvaPvW";
    await service.createRoomV2(uid);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={onClickListeningBtn}>listening</IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={onClickUpdateRoomCode}>update roomCode</IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={onCLickUpdateController}>update controller</IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={onCLickUpdateUploader}>update uploader</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={onClickCreateRoomV1Btn}>test createRoom v1</IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={onClickCreateRoomV2Btn}>test createRoom v2</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
