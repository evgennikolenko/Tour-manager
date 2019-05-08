const jwt = require('jsonwebtoken');

module.exports.sendInvitation = async(io, sequenceNumberByClient, item) => {
    const staffsId = [];
    const tour = item;

    item.staff.map((item) => {
        staffsId.push(item.id);
    });

    staffsId.forEach((item) => {
        for (let [ key, value ] of sequenceNumberByClient) {
            if (value === item) {
                io.to(key).emit('sendInvitationToCurrent', tour);
            }
        }
    });
};
