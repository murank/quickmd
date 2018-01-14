const srcDir = `${__dirname}/src/main`;
const tmpDir = `${__dirname}/tmp`;
const outputDir = `${__dirname}/dist`;

const version = require('./package.json').version;

import * as webpack from 'webpack';

import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as I18nPlugin from 'i18n-webpack-plugin';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { compileMarkdown, createToc } from './src/main/ts/lib/markdown';

import * as CustomLoader from 'custom-loader';

function concat(arr1: any[], arr2: any[]): any[] {
  Array.prototype.push.apply(arr1, arr2);
  return arr1;
}

CustomLoader.loaders = {
    markdown: (source: string) => {
      return compileMarkdown(source);
    },
    raw: (source: string) => {
      const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
        .replace(/\\r(?:\\n)?/g, '\\n');

        return `module.exports = ${json}`;
    },
    toc: (source: string) => {
      return createToc(source);
    }
};

const languages: {[lang: string]: any} = {
  'en': null,
  'ja': require(`${srcDir}/locales/ja/messages.json`)
};

const defaultRules: webpack.Rule[] = [
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          attrs: false,
          interpolate: true,
        },
      },
    ],
  },
  {
    test: /default\.scss$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')({ browsers: 'ie >= 9, last 2 versions' }),
          ]
        }
      },
      {
        loader: 'sass-loader',
      }
    ]
  },
  {
    test: /\.scss$/,
    exclude: /default\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')({ browsers: 'ie >= 9, last 2 versions' }),
          ]
        }
      },
      {
        loader: 'sass-loader',
      }
    ]
  },
  {
    test: /\.ts$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json'
        }
      },
    ]
  },
];
const defaultPlugins: webpack.Plugin[] = [
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(version),
  }),
  new webpack.BannerPlugin({
    banner: `Quick Markdown ${version}\nCopyright (c) 2018 murank`,
    test: /\.js$/i,
  }),
//  new webpack.optimize.OccurrenceOrderPlugin(false),
]
const defaultResolveOption: webpack.Resolve = {
  extensions: [ '.ts', '.js' ],
  modules: [ `${srcDir}/templates`, `${srcDir}/scss`, tmpDir, 'node_modules' ]
};

if (process.env.NODE_ENV === 'production') {
  defaultPlugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        comments: require('uglify-save-license'),
      },
      warnings: true,
    }
  }));
}

const options: webpack.Configuration[] = Object.keys(languages).map(language => {
  return {
    entry: {
      quickmd: [
        `${srcDir}/ts/editor.ts`,
        `${srcDir}/templates/default.html`,
      ]
    },
    module: {
      rules: concat([
        {
          test: /default\.html$/,
          use: ExtractTextPlugin.extract('extract-loader!html-loader'),
        }
      ], defaultRules),
    },
    output: {
      path: `${outputDir}/${language}/scripts`,
      filename: '[name].js',
    },
    plugins: concat([
      new ExtractTextPlugin('../template.html'),
      new I18nPlugin(languages[language]),
    ], defaultPlugins),
    resolve: {
      extensions: defaultResolveOption.extensions,
      modules: concat([ `${srcDir}/locales/${language}` ], defaultResolveOption.modules!),
    }
  };
});

module.exports = options;
