const uid = require('node-uid');

const mockUser = {
    firstname: '11John',
    lastname: '11Doe',
    birth: '12.12.2012',
    gender: 'male',
    role: 'manager',
    email: 'johndoe@gedsf2aiwl.com',
    status: 'active'
};

const loginMock = {
    email: 'jon@234.com',
    password: 'qwerty1'
};

const wrongLoginMock = {
    email: 'jon@234.com',
    password: 'sdsd23223'
};

const registerMock = {
    firstname: 'Jon',
    lastname: '12312',
    birth: '12.12.2012',
    gender: 'male',
    role: 'manager',
    email: 'jon@234.com',
    password: 'qwerty1',
    status: 'active'
};

module.exports = {
    mockUser, loginMock, wrongLoginMock, registerMock
};
