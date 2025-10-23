# HTTPS設定作業記録

## 作業概要
- **実施日**: 2025年10月23日
- **目的**: すべてのウェブページをHTTPSに対応させ、Let's Encrypt証明書と自動更新機能を設定
- **対象ドメイン**: 
  - www.chem.okayama-u.ac.jp
  - chem.okayama-u.ac.jp
  - phys.chem.okayama-u.ac.jp
  - theocomp.chem.okayama-u.ac.jp
  - test.chem.okayama-u.ac.jp（既存証明書継続使用）

## 作業前の状況
- Apache HTTPサーバー稼働中
- 既存のSSL証明書設定済み（test.chem.okayama-u.ac.jp）
- 証明書有効期限：2025年7月11日まで
- HTTPからHTTPSへのリダイレクト設定済み
- Let's Encryptの自動更新機能未設定

## 実施した作業

### 1. システム構成確認
- **Webサーバー**: Apache HTTP Server 2.4.62
- **OS**: Rocky Linux 9
- **既存SSL設定**: `/etc/httpd/conf.d/ssl.conf`
- **仮想ホスト設定**: `/etc/httpd/conf.d/vhost.conf`

### 2. Let's Encrypt証明書のインストール
```bash
# certbotのインストール
sudo dnf install -y certbot python3-certbot-apache

# 各DocumentRootに.well-knownディレクトリを作成
sudo mkdir -p /var/www/html2/.well-known/acme-challenge
sudo mkdir -p /home/theophyschem/Sites/.well-known/acme-challenge
sudo mkdir -p /home/theocomp/Sites/.well-known/acme-challenge

# 権限設定
sudo chown -R apache:apache /var/www/html2/.well-known
sudo chown -R apache:apache /home/theophyschem/Sites/.well-known
sudo chown -R apache:apache /home/theocomp/Sites/.well-known
```

### 3. 証明書の取得
```bash
# メインドメイン（www.chem.okayama-u.ac.jp, chem.okayama-u.ac.jp）
sudo certbot certonly --webroot -w /var/www/html2 -d www.chem.okayama-u.ac.jp -d chem.okayama-u.ac.jp --non-interactive --agree-tos --email admin@chem.okayama-u.ac.jp

# 物理化学ドメイン
sudo certbot certonly --webroot -w /home/theophyschem/Sites -d phys.chem.okayama-u.ac.jp --non-interactive --agree-tos --email admin@chem.okayama-u.ac.jp

# 理論化学ドメイン
sudo certbot certonly --webroot -w /home/theocomp/Sites -d theocomp.chem.okayama-u.ac.jp --non-interactive --agree-tos --email admin@chem.okayama-u.ac.jp
```

### 4. Apache設定の更新
- 既存設定のバックアップ: `/etc/httpd/conf.d/ssl.conf.old`
- 新しいSSL設定ファイルを作成: `/etc/httpd/conf.d/ssl.conf`
- Let's Encrypt証明書を使用するように設定

### 5. 自動更新機能の設定
```bash
# 自動更新タイマーの有効化
sudo systemctl enable certbot-renew.timer
sudo systemctl start certbot-renew.timer
```

## 設定結果

### 取得された証明書
| ドメイン | 証明書パス | 有効期限 | 種類 |
|---------|-----------|----------|------|
| www.chem.okayama-u.ac.jp<br>chem.okayama-u.ac.jp | `/etc/letsencrypt/live/www.chem.okayama-u.ac.jp/` | 2026-01-21 | ECDSA |
| phys.chem.okayama-u.ac.jp | `/etc/letsencrypt/live/phys.chem.okayama-u.ac.jp/` | 2026-01-21 | ECDSA |
| theocomp.chem.okayama-u.ac.jp | `/etc/letsencrypt/live/theocomp.chem.okayama-u.ac.jp/` | 2026-01-21 | ECDSA |
| test.chem.okayama-u.ac.jp | `/etc/httpd/conf/ssl.crt/test.chem.okayama-u.ac.jp.cer` | 2025-07-11 | 既存証明書 |

### 自動更新設定
- **タイマー**: certbot-renew.timer
- **状態**: 有効（active）
- **次回実行**: 4時間後
- **更新間隔**: 自動（証明書期限の30日前）

## 動作確認結果

### HTTPS接続テスト
```bash
# すべてのドメインでHTTPS接続成功
curl -I https://www.chem.okayama-u.ac.jp    # HTTP/1.1 200 OK
curl -I https://phys.chem.okayama-u.ac.jp   # HTTP/1.1 200 OK
curl -I https://theocomp.chem.okayama-u.ac.jp # HTTP/1.1 200 OK
```

### HTTPリダイレクトテスト
```bash
# すべてのドメインでHTTPSリダイレクト成功
curl -I http://www.chem.okayama-u.ac.jp     # HTTP/1.1 301 Moved Permanently
curl -I http://phys.chem.okayama-u.ac.jp    # HTTP/1.1 301 Moved Permanently
```

## 設定ファイル

### 新しいSSL設定ファイル（/etc/httpd/conf.d/ssl.conf）
- Let's Encrypt証明書を使用
- 各ドメインの仮想ホスト設定
- HTTPからHTTPSへの自動リダイレクト
- 最新のSSL/TLS設定

### バックアップファイル
- 既存設定: `/etc/httpd/conf.d/ssl.conf.old`
- 新しい設定テンプレート: `/tmp/ssl-letsencrypt.conf`

## セキュリティ向上点
1. **最新の暗号化**: ECDSA証明書の使用
2. **自動更新**: 証明書の期限切れリスクの排除
3. **強制HTTPS**: すべてのHTTPトラフィックのHTTPSリダイレクト
4. **最新のSSL/TLS設定**: セキュリティポリシーの適用

## 今後の注意事項
1. **test.chem.okayama-u.ac.jp**: 2025年7月11日に期限切れ予定
   - 必要に応じてLet's Encrypt証明書に変更可能
2. **自動更新の監視**: ログファイル `/var/log/letsencrypt/letsencrypt.log` で確認可能
3. **証明書の確認**: `sudo certbot certificates` コマンドで現在の状況確認可能

## トラブルシューティング

### 一般的な問題
- **証明書更新エラー**: `sudo certbot renew --dry-run` でテスト可能
- **Apache設定エラー**: `sudo httpd -t` で構文チェック可能
- **自動更新タイマー**: `sudo systemctl status certbot-renew.timer` で状態確認可能

### ファイアウォール問題（2025年10月23日発生）
**症状**: HTTPからHTTPSリダイレクト後に「can't connect to server」エラー
**原因**: ファイアウォールでHTTPS（443ポート）が許可されていない
**解決策**:
```bash
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```
**確認方法**: `sudo firewall-cmd --list-all` で `services: http https` を確認

### Hugoサイトのレイアウト崩壊問題（2025年10月23日発生）
**症状**: HTTPSでアクセスした際にレイアウトが崩壊（CSS、JS、画像が読み込まれない）
**原因**: 
1. Hugoのconfig.tomlでbaseURLがHTTPのまま
2. 生成されたHTMLファイル内でHTTPのURLが使用されていた
3. HTTPSでアクセスした際にMixed Contentエラーが発生
**解決策**:
```bash
# 1. config.tomlのbaseURLをHTTPSに変更
baseURL = "https://www.chem.okayama-u.ac.jp/"

# 2. 既存のHTMLファイル内のHTTP URLをHTTPSに一括変更
find /var/www/html2 -name "*.html" -exec sed -i 's|http://www\.chem\.okayama-u\.ac\.jp|https://www.chem.okayama-u.ac.jp|g' {} \;
find /var/www/html2 -name "*.xml" -exec sed -i 's|http://www\.chem\.okayama-u\.ac\.jp|https://www.chem.okayama-u.ac.jp|g' {} \;
```
**確認方法**: ブラウザの開発者ツールでMixed Contentエラーが解消されていることを確認

### Hugoプレビューサーバー（1313ポート）の設定
**用途**: commit前のプレビューサイト（内部アクセスのみ）
**設定**:
- Hugoサーバー: 1313ポートで稼働
- ファイアウォール: 150.46.0.0/16の範囲からのアクセスのみ許可
- セキュリティ: 外部からの不正アクセスを防止
**アクセス方法**: 内部ネットワーク（150.46.0.0/16）から `http://www.chem.okayama-u.ac.jp:1313/` でアクセス

## 完了確認
- ✅ すべてのドメインでHTTPS接続成功
- ✅ HTTPからHTTPSへの自動リダイレクト動作
- ✅ Let's Encrypt証明書の取得完了
- ✅ 自動更新機能の設定完了
- ✅ セキュリティの大幅向上

---
**作業完了日**: 2025年10月23日  
**作業者**: システム管理者  
**次回確認推奨日**: 2026年1月1日（証明書更新前）
