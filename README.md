# 3ヶ月記念ページ

ふたりの写真を使った、スマートフォン対応の1ページ記念サイトです。
HTML・CSS・JavaScriptだけで動くため、サーバー代はかかりません。

## 自分たち用に変更する

1. `images` フォルダに写真を4枚入れます。
2. 写真の名前を `memory-01.jpg` 〜 `memory-04.jpg` にします。
3. `script.js` 冒頭の `pageData` で、付き合い始めた日・記念日・写真のタイトルを変更します。
4. 手紙は `index.html` の `id="letterBody"` が付いた部分を書き換えます。
5. `index.html` をダブルクリックして表示を確認します。

写真が見つからない間は、番号入りのプレースホルダーが表示されます。

## 無料公開（おすすめ: GitHub Pages）

GitHub Pagesは、このような静的サイトを無料で公開でき、広告も入りません。

1. GitHubで無料アカウントを作成します。
2. 新しいリポジトリを作り、このフォルダの中身をアップロードします。
3. リポジトリの `Settings` → `Pages` を開きます。
4. `Build and deployment` の Source を `Deploy from a branch` にします。
5. Branch を `main`、フォルダを `/(root)` にして保存します。

数分後に `https://ユーザー名.github.io/リポジトリ名/` で公開されます。

注意: URLを知っている人なら閲覧できます。ふたりの顔写真など、完全に非公開にしたい写真には向きません。

## さらに簡単な無料公開

Netlify Drop（https://app.netlify.com/drop）に、このフォルダをドラッグ&ドロップしても公開できます。
操作は簡単ですが、URLの維持や後からの更新を考えるとGitHub Pagesがおすすめです。
