const vegPickles = [
    { image: '/images/gongura_pickle.webp', name: 'Gongura Pickle', price: 700 },
    { image: '/images/ginger_pickle.webp', name: 'Ginger(Allam) Pickle', price: 750 },
    { image: '/images/corriander_pickle.webp', name: 'Kothimeera Pickle', price: 700 },
    { image: '/images/mango_pickle.webp', name: 'Mango Pickle', price: 750 },
    { image: '/images/lemon_pickle.webp', name: 'Lemon Pickle', price: 700 },
    { image: '/images/red chillie_pickle.webp', name: 'PanduMirchi Pickle', price: 700 },
     { image: '/images/pudina_pickle.webp', name: 'Pudhina Pickle', price: 750 },
    { image: '/images/tomato_pickle.webp', name: 'Tomato Pickle', price: 700 },
    { image: '/images/amla_pickle.webp', name: 'UsiriKaya(Amla) Pickle', price: 800 },
];

const nonVegPickles = [
    { image: '/images/chicken_pickle.webp', name: 'Chicken Pickle(Bone)', price: 1150 },
    { image: '/images/chicken_pickle.webp', name: 'Chicken Pickle(BoneLess)', price: 1450 },
    { image: '/images/chicken_pickle.webp', name: 'Chicken Gongura Pickle', price: 1350 },
    { image: '/images/mutton_pickle.webp', name: 'Mutton Pickle(Bone)', price: 1850 },
    { image: '/images/mutton_boneless_pickle.webp', name: 'Mutton Pickle(BoneLess)', price: 2200 },
    { image: '/images/mutton_boneless_pickle.webp', name: 'Mutton Gongura Pickle(BoneLess)', price: 2100 },
    { image: '/images/prawns_pickle.webp', name: 'Prawns Pickle', price: 2000 },
     { image: '/images/prawns_gongura_pickle.webp', name: 'Prawns Gongura Pickle', price: 2050 },
    { image: '/images/fish_pickle.webp', name: 'Fish Pickle', price: 1300 },
    { image: '/images/fish_pickle.webp', name: 'Koramenu Fish Pickle', price: 1500 },
];
export const getImageSrcByName = (name) => {
    const allPickles = [...vegPickles, ...nonVegPickles];
    const pickle = allPickles.find(pickle => pickle.name === name);
    return pickle ? pickle.image : null; // Returns image path or null if not found
};

