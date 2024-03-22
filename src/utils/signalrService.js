import { HubConnectionBuilder } from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
  }

  startConnection = () => {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7000/notificationHub') 
      .withAutomaticReconnect()
      .build();

    this.connection.start()
      .then(() => console.log('SignalR connection started.'))
      .catch((error) => console.error('Error starting SignalR connection:', error));
  };


  addNotificationCountListener = (callback) => {
    this.connection.on('ReceiveNotificationCount', (userId, count,message) => {
      callback(userId, count, message);
    });
  };
}

export default SignalRService;