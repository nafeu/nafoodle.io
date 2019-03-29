import { isHost } from '../../helpers';

export default class GameRenderer {
  constructor(socket) {
    this.socket = socket;
  }

  render(state) {
    const { users } = state;
    console.log(users.map(user => user.username).join(', '));
    if (isHost(this.socket.id, users)) {
      console.log('Client is HOST');
    }
  }
}
