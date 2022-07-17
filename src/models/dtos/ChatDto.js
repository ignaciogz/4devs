class ChatDto {
    constructor(data) {
        this.id = data.id;
        this.author = data.author;
        this.message = data.message;
        this.timestamp = data.timestamp;
    }
}

module.exports = ChatDto;