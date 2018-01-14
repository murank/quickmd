# Quick Markdown

Quick Markdown は [かんたんMarkdown](https://tatesuke.github.io/KanTanMarkdown/) にインスパイアされた、完全にローカルで動作する軽量 Markdown エディターです。

かんたんMarkdown と違い、ドキュメント本体となる HTML ファイルとエディタ部分の js ファイルに分かれているため、編集を行わないのであれば HTML ファイルのみを公開することも可能です。

## 機能
* モダンブラウザ (Chrome, Firefox, IE (>=10)) 上で動作するため、追加のツール (node.js など)は不要です。
* 静的な HTML ファイルを生成するため、古いブラウザであっても閲覧のみであれば可能です。
* 独自の CSS を定義してデザインをカスタマイズすることができます。


## 使い方
dist フォルダ内に格納されているテンプレートファイル (template.html)、および scripts フォルダを任意のフォルダにコピーして使用してください。

詳細な使用方法は [こちら](src/main/locales/ja/default.md) を参照してください。


## ビルド方法
要 node.js

1. リポジトリをクローンします。
2. `npm install` を実行します。
3. `npm run webpack` を実行します。    
   この時、環境変数 `NODE_ENV` に `production` を設定するとソースの minify が有効になります。


## バグ報告、要望等
バグ報告や要望等がありましたら [Github](https://github.com/murank/quickmd/) の issue または PR にて連絡をお願いします。


## ライセンス
Quick Markdown は MIT ライセンスで配布されています。
