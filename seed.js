const { db } = require('./models');

db.sync({ force: true })
    .then(() => {
        console.log('DB sync SUCCESSFUL!')
    })
    .catch(err => {
        console.log('DB sync FAILED: ');
        console.error(err);
    })
    .finally(() => {
        db.close();
    })