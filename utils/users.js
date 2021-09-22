const users = [];

// Join user to chat
function userJoin(id, username, room,agora_uid) {
    const user = { id, username, room,agora_uid };

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    console.log('show id',id);
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    console.log('show users before',users);
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    console.log('show users',users);
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};