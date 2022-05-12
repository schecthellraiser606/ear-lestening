# みんなの耳コピ
サービスURL：https://my-listen-19f83.web.app

<img width="1676" alt="スクリーンショット 2022-05-12 21 53 57" src="https://user-images.githubusercontent.com/89838264/168082464-986b806d-3855-467e-8b7f-5be58b40a6d6.png">

## 概要
ギターなど楽曲を耳コピする方は思うかもしれない。<br/>
「自作曲を動画サイトに上げつつ、Tab譜にしたいけど、これを共有するサービスって中々ないな」<br/>
「この人の自作曲をコピーしたい！でもTab譜はない！そんな！」<br/>
「簡単にメモベースで耳コピ曲のフレーズをTab譜で残しておきたい」<br/>

上記のようなギタリスト、ベーシストのために本サービスをリリースする。<br/>
個々人が耳コピした曲やフレーズをWEB上で公開するサービスである。

## 使用技術
+ Frontend
  + Lang: JavaScript/TypeScript
  + FW: React.js
  + UI library: Chakra UI
  + other: email-validater, VexTab, etc...
+ Backend, Infra
  + Firebase

## 機能群
  + Youtube検索、再生機能
  + Tab関係機能
    + Tab譜作成
    + Tab譜削除
    + Tab譜いいね
    + UserごとのTab一覧機能
    + Tab検索機能
      + 曲名検索
      + アーティスト検索
  + ログイン機能
  + User情報変更機能
