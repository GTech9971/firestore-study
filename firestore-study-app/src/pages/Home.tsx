import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FirebaseService } from '../services/Firebase.service';

const Home: React.FC = () => {

  const service: FirebaseService = new FirebaseService();


  const onClickCreateRoomV1Btn = async () => {
    const uid: string = "OhfyuMoPqb1gdDSDKfYU";
    await service.createRoomV1(uid);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={onClickCreateRoomV1Btn}>test createRoom v1</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
