// Webpack utilise ce module Node.js pour travailler avec les dossiers.
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Ceci est la configuration principale de ton projet.
// Ici, tu peux écrire les différentes options que tu souhaites, et dire à Webpack quoi faire.
module.exports = {

    // Ceci est le chemin vers le "point d'entrée" de ton app.
    // C'est depuis ce fichier que Webpack commencera à travailler.
    entry: './src/index.js',

    // C'est ici qu'on dit à Webpack où mettre le fichier résultant avec tout ton JS.
    output: {
        // Le chemin relatif au dossier courant (la racine du projet)
        path: path.resolve(__dirname, 'dist'),
        // Le nom du fichier de ton bundle JS
        filename: 'bundle.js',
        // L'URL relatif au HTML pour accéder aux assets de l'application. Ici,
        // le HTML est situé à la racine du projet, donc on met une chaîne vide.
        publicPath: '',
    },

    //C'est ici qu'on dit a webpack comment transformer nos fichiers (ES6 -to-> ES5)
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        // On le met en tout premier, afin qu'il soit exécuté en dernier,
                        // une fois que tous les changements souhaités sont appliqués à notre CSS.
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    // Par défaut, le mode de Webpack est "production". En fonction de ce qui est
    // écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
    // Pour le moment, nous avons besoin du mode "développement", car nous n'avons,
    // par exemple, pas besoin de minifier notre code.
    mode: 'development',
};
