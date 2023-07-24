# 化学科のサーバの設定

管理者のための覚え書き。

## Static Site Generator Hugo

Contents Management System (CMS)が、PHPやCMS自体のコードの老朽化により維持できなくなったことを反省し、新しいサイトはSSG(Static Site Generator)を使うことにした。

SSGでは、サーバ上では何らのソフトウェアも動作せず、ただhtmlとjavascriptで書かれた静的なファイルのみを提供する。華やかな画面表示などはすべて、クライアント(ブラウザ)側で行うことで、サーバはセキュリティ上の問題から開放される。

今回は、hugoを採用した。hugoを選んだ利点は以下の通り。
* コード生成処理が非常に速い
* MarkDown記法に対応
* いくつかの方法で多言語対応が可能

### hugoのインストール

化学科サーバのOS(CentOS7)では、パッケージマネージャからhugoをインストールできなかった(Damn)ので、ソースをコンパイルしてインストール。
([参照](https://nomagic.net/blog/hugo-extended-centos-7/))

```shell
cd
mkdir hugo
cd hugo
wget https://github.com/gohugoio/hugo/archive/refs/tags/v0.115.4.tar.gz
tar zxvf v0.115.4.tar.gz
cd hugo-0.115.4/
go install -v -x -a --tags extended
```

## コンテンツの履歴管理

コンテンツはGitHubで管理される。リポジトリのURLは

https://github.com/okayama-chem/chem-web


## 試行用サーバ

教員が誰でも編集でき、編集結果をリアルタイムで見られるようにする。本番サーバとは別。

### 場所

www.chem.okayama-u.ac.jpサーバ上のファイルの場所。

* `/var/www/chem-web`

  新化学科サイト全体のコード。サイトデザインや翻訳などのすべてを含む。
* `/var/www/chem-web/exampleSite/content`

  研究室や教員のコンテントなど、教員がアクセスする場所。WebDAVで共有。


### WebDAVの設定

WebDAVとは、ウェブサーバの機能拡張によりファイル共有する仕組み。外部から見えるURLは http://www.chem.okayama-u.ac.jp/content

* /var/www/chem-webにリポジトリのクローンを置く。
* /etc/httpd/conf.d/dav.confに以下の内容を追加。
```xml
# for WebDAV
Alias   /content   "/var/www/chem-web/exampleSite/content"
<Location /content>
        DAV on
Options Indexes
</Location>
```

これにより、contents内のみ、外部からユーザが書換えできる。

サーバ上では、`hugo server`コマンドを常時実行しておく。それにより、http://www.chem.okayama-u.ac.jp:1313 でいつでも編集結果を確認できる。

本番サイトはこれとは別に生成する。こちらは、http://www.chem.okayama-u.ac.jpでアクセスでき、Apacheが管轄する。(これの設定はまだやってない)

### ポート開放

1313番ポートは大学内からのアクセスにのみ開放する。

```shell
firewall-cmd --list-all
firewall-cmd --add-rich-rule='rule family=ipv4 source address="150.46.0.0/16" port port=1313 protocol=tcp accept' --zone=public --permanent
firewall-cmd --list-all
firewall-cmd --reload
firewall-cmd --list-all
```

### コンテンツの保護

定期的に、githubにpushすることで、編集履歴を外部に保管し、万一の事故に備える。また、履歴管理により、試行錯誤を容易にする。




## 本番用サーバ

* 本番サーバはポート番号なしでアクセスできるのが望ましい。
* 本番サーバは完全Staticとしたい。

### 試行用サーバをpublish

```shell
cd /var/www/chem-web/exampleSite
make --themesDir ../..
```

これで、`/var/www/chem-web/exampleSite/public`内に、htmlファイルが生成される。

これをApacheウェブサーバが`http://www.chem.okayama-u.ac.jp`として提供する。その設定は、`/etc/httpd/conf.d/chem.conf`に書く(はず)。
