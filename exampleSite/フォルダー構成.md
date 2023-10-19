```
.
|-- LICENSE
|-- Makefile
|-- README.md
|-- STRUCTURE.md
|-- archetypes
|   `-- default.md
|-- assets
|   |-- js
|   |   `-- script.js
|   `-- scss
|       |-- _buttons.scss
|       |-- _common.scss
|       |-- _document.scss   新たに追加したスタイルシート。スタイルを独自設定したい場合に
|       |-- _mixins.scss
|       |-- _typography.scss
|       |-- _variables.scss
|       |-- main.scss
|       `-- templates
|           |-- _homepage.scss
|           |-- _navigation.scss
|           |-- _otherspage.scss
|           `-- _slider.scss
|-- exampleSite
|   |-- archetypes
|   |   `-- default.md
|   |-- config.toml          全体の変数の設定(ホームページの主コンテンツはhomepage.ymlに)
|   |-- content
|   |   |-- about            「化学科について」記事。今は未使用
|   |   |   |-- _index.ja.md
|   |   |   `-- _index.md
|   |   |-- author           ブログ(ニュース)著者の記事
|   |   |   |-- john-doe.ja.md
|   |   |   |-- john-doe.md
|   |   |   |-- mark-dinn.md
|   |   |   `-- vitroid.ja.md
|   |   |-- bachelor         学部入学情報記事
|   |   |   |-- 3nenji.ja.md
|   |   |   `-- _index.ja.md
|   |   |-- blog             ニュース記事
|   |   |   |-- 1.ja.md
|   |   |   |-- 2.ja.md
|   |   |   |-- _index.ja.md
|   |   |   `-- _index.md
|   |   |-- contact          「お問いあわせ」記事
|   |   |   |-- _index.ja.md
|   |   |   `-- _index.md
|   |   |-- event            イベント記事
|   |   |   |-- 2.ja.md
|   |   |   |-- _index.ja.md
|   |   |   `-- _index.md
|   |   |-- faculty          教員記事
|   |   |   |-- _index.ja.md
|   |   |   |-- _index.md
|   |   |   |-- alex-rook.md
|   |   |   |-- clark-malik.md
|   |   |   |-- devid-luis.md
|   |   |   |-- duis-rio.md
|   |   |   |-- jacke-mastio.md
|   |   |   |-- koga.ja.md
|   |   |   |-- koga.md
|   |   |   |-- kongo.ja.md
|   |   |   `-- zim-cook.md
|   |   |-- graduate         大学院関連記事
|   |   |   `-- _index.ja.md
|   |   |-- internal         学科内向け記事
|   |   |   |-- 1.ja.md
|   |   |   |-- _index.ja.md
|   |   |   `-- _index.md
|   |   |-- laboratory       研究室紹介記事
|   |   |   |-- _index.ja.md
|   |   |   |-- _index.md
|   |   |   |-- research-1.ja.md
|   |   |   |-- research-2.md
|   |   |   |-- research-3.md
|   |   |   |-- research-4.md
|   |   |   |-- research-5.md
|   |   |   |-- research-6.md
|   |   |   |-- theoalchemy.ja.md
|   |   |   |-- theochem.ja.md
|   |   |   `-- theophyschem.ja.md
|   |   |-- research-topic   研究紹介記事
|   |   |   |-- 1.ja.md
|   |   |   |-- 1.md
|   |   |   |-- 2.ja.md
|   |   |   |-- _index.ja.md
|   |   |   `-- _index.md
|   |   `-- scholarship      不使用
|   |       |-- _index.md
|   |       |-- scholarship-1.md
|   |       |-- scholarship-2.md
|   |       `-- scholarship-3.md
|   |-- data
|   |   |-- en
|   |   |   |-- homepage.yml  トップページのモジュール用変数
|   |   |   `-- months.yml    月の名前
|   |   `-- ja
|   |       |-- homepage.yml
|   |       `-- months.yml
|   |-- i18n
|   |   |-- en.yaml          用語の置きかえ
|   |   `-- ja.yaml
|   |-- netlify.toml         netlifyで公開する場合の設定
|   |-- resources            コンパイル後ファイルが入るフォルダー。手では編集しない。
|   `-- static               言語に依存しない(ja/やen/を付けない)ファイルの置き場
|       |-- images           画像置き場
|       `-- pdf              PDF置き場
|-- layouts                  テンプレートフォルダー
|   |-- 404.html
|   |-- _default
|   |   |-- baseof.html      基本レイアウト?
|   |   |-- event.html       イベント一覧のカードのレイアウト
|   |   |-- faculty.html     教員一覧のカードのレイアウト
|   |   |-- laboratory.html
|   |   |-- list.html        ニュース一覧のカードのレイアウト
|   |   |-- notice.html      用途不明
|   |   |-- post.html        用途不明
|   |   |-- research.html    不使用?
|   |   |-- scholarship.html 不使用
|   |   `-- single.html      ニュースの記事見開きのレイアウト
|   |-- about                「化学科について」のレイアウト
|   |   `-- list.html
|   |-- author               ブログ(ニュース)著者のレイアウト
|   |   `-- single.html
|   |-- bachelor             学部入学ページのレイアウト
|   |   `-- list.html
|   |-- contact              お問いあわせのレイアウト
|   |   `-- list.html
|   |-- event                イベントのレイアウト
|   |   |-- list.html        リスト表示
|   |   `-- single.html      ページ見開き (以下同様)
|   |-- faculty              教員一覧のレイアウト
|   |   |-- list.html
|   |   `-- single.html
|   |-- graduate             大学院情報のレイアウト
|   |   `-- list.html
|   |-- index.html           化学科トップページのレイアウト
|   |-- internal             学科内向け記事のレイアウト
|   |   |-- list.html
|   |   `-- single.html
|   |-- laboratory           研究室一覧のレイアウト
|   |   |-- list.html        研究室一覧のカードのレイアウト
|   |   `-- single.html
|   |-- memo.md
|   |-- notice               不使用
|   |   |-- list.html
|   |   `-- single.html
|   |-- pages                使途不明
|   |   `-- single.html
|   |-- partials             ページの部品のレイアウト
|   |   |-- blog-sidebar.html            ニュースリストのサイドバー
|   |   |-- event-sidebar.html           イベントリストのサイドバー
|   |   |-- footer.html                  フッタ(岡大ロゴを含む部分)
|   |   |-- head.html                    <head>ブロック
|   |   |-- header.html                  ヘッダ(メニュー部分)
|   |   |-- laboratory-sidebar.html      研究室リストのサイドバー
|   |   |-- page-header.html             サブページのバナー部分(パンくず)
|   |   |-- preloader.html               使途不明
|   |   |-- research-topic-sidebar.html  研究紹介のサイドバー
|   |   `-- success-story.html           「サクセスストーリー」モジュール
|   |-- research             不使用
|   |   |-- list.html
|   |   `-- single.html
|   |-- research-topic       研究紹介のレイアウト
|   |   |-- list.html
|   |   `-- single.html
|   |-- scholarship          不使用
|   |   `-- list.html
|   |-- shortcodes           Hugoショートコード
|   |   `-- youtube.html
|   `-- taxonomy             タグ等を選んだあとに自動生成されるリストのレイアウト
|       |-- keyword.html     研究キーワード
|       |-- la_category.html 研究室カテゴリ
|       |-- rt_category.html 研究紹介カテゴリ
|       `-- rt_tag.html      研究紹介タグ
|-- netlify.toml
|-- static
|   |-- fonts                フォント(現在はGoogle Fontを使っているのでここには置かない)
|   |   `-- Futura-Bold.woff
|   `-- plugins              動きのあるコンテンツを作るための部品。
`-- theme.toml

95 directories, 275 files
```

# 変数定義
`.yaml`または`.toml`フォーマットのファイルを編集する。
* ホームページの表示内容を変えたい

  `exampleSite/data/*/homepage.yml`

* メニュー&フッタの選択肢を増やしたい

  `exampleSite/config.toml`


# レイアウトの変更
`.html`フォーマットのファイルを編集する。

* ホームページの構成を変えたい

  `layout/index.html`

* 最上部の白い部分や上部メニューのデザインを変えたい

  `layout/partial/header.html`

* タグ選択した時に表示される画面(taxonomy)のバナーの背景画像

  `layout/partial/page-header.html`

# スタイルシートの変更
`.scss`フォーマットのファイルを編集する。

* 表示要素のサイズを調節したい

  `assets/scss/_document.scss`

* テーマカラーを変えたい

  `assets/scss/_variables.scss`

# 記事追加

* 記事を追加したい

`.md`フォーマットのMarkDown記法ファイルを編集する。


  `exampleSite/content/*/数字.ja.md`
