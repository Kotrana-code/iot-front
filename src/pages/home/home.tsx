import React from "react";

import "./home.css";

import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonPage,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon
} from "@ionic/react";
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';

import { webSocket, WebSocketSubject } from "rxjs/webSocket";

interface AppProps {
  //code related to your props goes here
}

interface AppState {
  message: string;
  date: string;
  data: any[];
}

class Home extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      message: "",
      date: "",
      data: []
    };
  }

  componentDidMount() {
    webSocket("wss://iot-project-eni.herokuapp.com").subscribe(
      (msg: any) => {
        let joined = this.state.data;
        joined.push(msg);
        // console.log(joined);
        console.log("message received: ", msg);
        // this.setState({ data: joined });
        // console.log(this.state.data);
        this.setState({
          message: "Danger!" + msg.status ? msg.status : "",
          date: msg.date ? msg.date : new Date() + "",
          data: joined
        });
      },
      // Called whenever there is a message from the server
      err => console.log("Erro recebido:", err),
      // Called if WebSocket API signals some kind of error
      () => console.log("complete")
      // Called when connection is closed (for whatever reason)
    );
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonToolbar>
            <IonTitle>Secutiter appartement</IonTitle>
          </IonToolbar>

          {/*-- List of Text Items --*/}
          <IonList>
            {this.state.data.map(function(info, i) {
              return (
                <IonCard
                  key={i}
                  color={info.code === "1" ? "primary" : "danger"}
                >
                  <IonCardHeader>
                    <IonCardSubtitle>INFORMARION</IonCardSubtitle>
                    <IonCardTitle>Code {info.code}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>{info.status}</IonCardContent>

                  <IonItem>
                    <IonIcon icon={warning} slot="start" />
                    <IonLabel>{info.code ==="1" ? "Changer le mot de passe ou bloquer l'accès" : "Informer la police"}</IonLabel>
                  </IonItem>
                </IonCard>
              );
            })}
          </IonList>
        </IonContent>
        {/*-- Fade Footer --*/}
        <IonFooter collapse="fade">
          <IonToolbar>
            <IonTitle>Hello JOHN LUCA !!!</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }
}

export default Home;
