const URL = 'ws://localhost:9001';

const states = {
    DEFAULT: 'default',
    OPENING: 'opening',
    OPEN: 'open',
    CLOSED: 'closed',
    ERROR: 'error',
};

export default {
    connection: null,
    status: states.DEFAULT,
    usersCount: 0,
    clientName: '',
    messages: [],
    colors: {},
    url: URL,

    get isOpen() {
        return this.status === states.OPEN;
    },

    get hasError() {
        return this.status === states.ERROR;
    },

    get otherUsersCount() {
        return this.usersCount && this.usersCount - 1;
    },

    open() {
        if (!this.isOpen) {
            this.status = states.OPENING;

            try {
                this.connection = new WebSocket(this.url);

                this.connection.onclose = () => this._handleClose();
                this.connection.onopen = () => this._handleOpen();
            } catch (error) {
                this.status = states.ERROR;

                throw error;
            }
        }
    },

    send(params) {
        this.connection.send(JSON.stringify({
            ...params,
            clientName: this.clientName,
        }));
    },

    async getRandomName() {
        try {
            return await fetch('https://randomuser.me/api/?inc=name')
                .then(res => res.json())
                .then(name => {
                    this.clientName = Object.values(name.results[0].name).join(' ');

                    return this.clientName;
                })
        } catch (_) {
            this.clientName = '';
        }
    },

    _handleOpen() {
        this.status = states.OPEN;

        this.connection.addEventListener('message', message => {
            const { messagesList, users } = JSON.parse(message.data);

            this.messages = messagesList.map(this._mapClients.bind(this));
            this.usersCount = users;
        })
    },

    _handleClose() {
        this.status = states.CLOSED;

        this.connection.send(JSON.stringify({ type: 'disconnect' }));
    },

    _mapClients(client) {
        const color = this.colors[client.clientName] || this._getRandomHue();
        this.colors[client.clientName] = color;

        return { ...client, color };
    },

    _getRandomHue() {
        const hue = Math.ceil(300 - Math.random() * 100);

        return `hsl(${hue}, 85%, 70%)`;
    },
}