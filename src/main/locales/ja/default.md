# Quick Markdown

Quick Markdown は完全にローカルで動作する軽量  Markdown エディターです。

## 使用方法

### 編集
画面右上の「編集」ボタンを押下する (または Ctrl+E) と編集モードになります。    
表示された編集エリアに Markdown でドキュメントを入力するとプレビューエリアがリアルタイムに更新されます。

Markdown は [GitHub Flavored Markdown](https://github.github.com/gfm/) に対応しています。    
また、コード 入力時に言語を記載することでコードハイライトも可能です。    
対応している言語は [src/main/ts/lib/prismjs.ts](https://github.com/murank/quickmd/blob/master/src/main/ts/lib/prismjs.ts) を参照してください。

編集エリアで「CSS」タブに切り替えるとデザインをカスタマイズするための CSS を入力できます。
編集した内容はプレビューエリアにリアルタイムに反映されます。


### プレビュー
編集中に画面右上の「プレビュー」ボタンを押下する (または Ctrl+E) とプレビューモードになります。    

プレビューモードでは HTML ファイルの実際の表示を確認することが可能です。


### 保存
画面右上の「保存」ボタンを押下する (または Ctrl+E) と現在編集中のドキュメントを保存することができます。


### Quick Markdown のバージョンアップ
`scripts` フォルダ内の `quickmd.js` を更新した上でドキュメントを保存し直してください。


## 注意事項
[Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) オブジェクトを使用してドキュメントを保存するため、Blob オブジェクトに対応していないブラウザ (IE9 以下等) では閲覧のみ可能です。

また、IE10 以上で編集ボタン等が表示されない場合、ローカルファイルの javascript 実行がブロックされている可能性があるため、HTML ファイルを再度開き直してみてください。


## バグ報告、要望等
バグ報告や要望等がありましたら [Github](https://github.com/murank/quickmd/) の issue または PR にて連絡をお願いします。


## ライセンス
Quick Markdown は MIT ライセンスで配布されています。
