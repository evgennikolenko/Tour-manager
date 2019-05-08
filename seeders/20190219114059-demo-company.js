module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Companies', [ {
            id: '69c45472-343c-11e9-b210-d663bd873d93',
            name: 'Evors',
            logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577143/Companies/logo-ru.png'
        },
            {
                id: '69c458e6-343c-11e9-b210-d663bd873d93',
                name: 'Koblenz',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577141/Companies/8d54dec037545bcf49639a56f6b74338.jpg'
            },
            {
                id: '69c45a58-343c-11e9-b210-d663bd873d93',
                name: 'Personal driver',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577141/Companies/iwan-batam-private-driver.jpg'
            },
            {
                id: '69c45b98-343c-11e9-b210-d663bd873d93',
                name: 'DriveSafer',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577142/Companies/DS-LOGO-MARK-FINAL-01.png'

            },
            {
                id: '69c45cce-343c-11e9-b210-d663bd873d93',
                name: 'AnexTour',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577143/Companies/Turoperator-Anex-Tour1.jpg'

            },
            {
                id: '69c45e0e-343c-11e9-b210-d663bd873d93',
                name: 'E-Tours',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577142/Companies/etours_logo.png'

            },
            {
                id: '69c4612e-343c-11e9-b210-d663bd873d93',
                name: 'TrendyTravel',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577142/Companies/logo_2x.png'

            },
            {
                id: '69c4628c-343c-11e9-b210-d663bd873d93',
                name: 'JitterSwing',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577340/Companies/images.png'

            },
            {
                id: '69c463c2-343c-11e9-b210-d663bd873d93',
                name: 'QDC',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577142/Companies/download.png'

            },
            {
                id: '69c464ee-343c-11e9-b210-d663bd873d93',
                name: 'Man can cook',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577143/Companies/MenCanCookCompany_MainLogo_Medium.png'

            },
            {
                id: '69c464ty-343c-11e9-b210-d663bd873d93',
                name: 'Cook',
                logo: 'https://res.cloudinary.com/di7nb1sra/image/upload/v1550577142/Companies/loren_cook_logo_hr.jpg'

            }
        ], {
            timestamps: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Companies', null, {});
    }
};