const { db, Gardener, Plot, Vegetable } = require('./models');

const vegetables = [
    {
        name: 'pepper',
        color: 'green',
        planted_on: '2020-06-14',
    },
    {
        name: 'tomato',
        color: 'red',
        planted_on: '2020-06-25',
    },
    {
        name: 'lettuce',
        color: 'green',
        planted_on: '2020-06-30',
    },
];

const gardeners = [
    {
        name: 'kat',
        age: 32,
    },
    {
        name: 'mum',
        age: 64,
    },
    {
        name: 'dad',
        age: 65,
    },
];

const plots = [
    {
        size: 1,
        shaded: false,
    },
    {
        size: 10,
        shaded: false,
    },
    {
        size:8,
        shaded: false,
    },
];

db.sync({ force: true })
    // METHOD 1
    // .then(() => {
    //     console.log('DB sync SUCCESSFUL!');
    //     // RETURNING A VEGETABLE PROMISE
    //     const pepper = Vegetable.create({
    //         name: 'pepper',
    //         color: 'green',
    //         planted_on: '2020-06-14',
    //     });
    //     return pepper;
    // })
    // // ACCESSING THE VEGETABLE PROMISE
    // .then(veggie => console.log(veggie.dataValues))

    // METHOD 2
    // .then(() => {
    //     return Vegetable.bulkCreate(vegetables, {returning: true});
    // })
    // .then(vegetables => {
    //     return Gardener.bulkCreate(gardeners, {returning: true});
    // })

    // BEST METHOD
    .then(() => {
        const vegetablesPromise = Vegetable.bulkCreate(vegetables, {returning: true});
        const gardenersPromise = Gardener.bulkCreate(gardeners, {returning: true});
        const plotsPromise = Plot.bulkCreate(plots, {returning: true});
        return Promise.all([vegetablesPromise, gardenersPromise, plotsPromise])
            // .then(values => console.log(values))
    })
    .then(values => {
        // console.log(values);
        // const vegetableRows = values[0];
        // const gardenerRows = values[1];
        // const plotRows = values[2];
        const [vegetableRows, gardenerRows, plotRows] = values;
        const [pepper, tomato, lettuce] = vegetableRows;
        const [kat, mum, dad] = gardenerRows;
        const [plot1, plot2, plot3] = plotRows;
        kat.favVegetableId = tomato.id;
        mum.favVegetableId = lettuce.id;
        dad.favVegetableId = pepper.id;

        const pepperAssociation = pepper.addPlot(plot1);
        const plot1Gardener = plot1.setGardener(dad);
        const tomatoAssociation = tomato.addPlot(plot2);
        const plot2Gardener = plot2.setGardener(kat);
        const lettuceAssociation = lettuce.addPlot(plot3);
        const plot3Gardener = plot3.setGardener(mum);

        return Promise.all([
            kat.save(), mum.save(), dad.save(), 
            pepperAssociation, tomatoAssociation, lettuceAssociation,
            plot1Gardener, plot2Gardener, plot3Gardener
        ]);
    })
    // .then(results => {
    //     const plot1 = results[4];
    //     return plot1.getGardener();
    // })
    // .then(gardener => console.log(gardener.dataValues))
    .catch(err => {
        console.log('DB sync FAILED: ');
        console.error(err);
    })
    .finally(() => {
        db.close();
    })