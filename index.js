const server = require('./config/app');
const models = require('./models/index');
const port = process.env.PORT || 9000;

models.sequelize.sync().then(function() {

    server.listen(port, () => {

        console.log(`Server has been started on ${port}`);

    });
}).catch((e) => console.log('WARNING', e.message, e));
