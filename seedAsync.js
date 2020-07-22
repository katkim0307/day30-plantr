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
        size: 8,
        shaded: false,
    },
];

const seedDB = async () => {
    try {
        await db.sync();
        const vegetablesPromise = await Vegetable.bulkCreate(vegetables, {returning: true});
        const gardenersPromise = await Gardener.bulkCreate(gardeners, {returning: true});
        const plotsPromise = await Plot.bulkCreate(plots, {returning: true});
        
        const [peper, tomato, lettuce] = vegetablesPromise;
        const [kat, mum, dad] = gardenersPromise;
        const [plot1, plot2, plot3] = plotsPromise;
        kat.favVegetableId = tomato.id;
        mum.favVegetableId = lettuce.id;
        dad.favVegetableId = pepper.id;

        await db.close();
    } catch (err) { console.error(err); }
}

seedDB();