# React basic - Expense Tracker (Fluent UI)

このリポジトリは簡易の経費精算管理アプリです。UIはMicrosoft Fluent UIを使用しています。

ローカルで動作確認する手順:

1. 依存をインストール

```powershell
npm install
```

2. 開発サーバ起動

```powershell
npm start
```

ビルドして静的ファイルを生成する場合:

```powershell
npm run build
```

このアプリはメモリ上でデータを管理し、認証は不要です。Azure Static Web Appsへデプロイ可能な構成を想定しています。
# React basic

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build [React](https://reactjs.org/) apps in minutes. Use this repo with the [React quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=react) to build and customize a new static site.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## デプロイ (Azure Static Web Apps)

このリポジトリは Azure Static Web Apps にデプロイできるように GitHub Actions ワークフローと `staticwebapp.config.json` を含んでいます。手順:

1. GitHub にこのリポジトリをプッシュします（主要ブランチは `main` を想定）。
2. Azure Portal で Static Web App を作成します。作成時に「デプロイ元」を GitHub に設定しても良いですが、手動でワークフローを使う場合は以下を設定します。
3. Static Web Apps の「発行プロファイル」からデプロイ用のトークン（API token）を取得してください。
4. GitHub リポジトリの Settings → Secrets に `AZURE_STATIC_WEB_APPS_API_TOKEN` としてトークンを登録します。
5. `main` ブランチに push すれば、.github/workflows/azure-static-web-apps.yml がトリガーされて自動ビルド & デプロイされます。

必要な情報:
- Azure サブスクリプション（Static Web App を作成するため）
- 発行プロファイルからのデプロイ用トークン（GitHub Actions のシークレット `AZURE_STATIC_WEB_APPS_API_TOKEN` に設定）

注意:
- ワークフローは `node 18` を使用して `npm run build` を実行し、`build` フォルダをデプロイします。もしビルドコマンドや出力フォルダが異なる場合はワークフローを編集してください。
- GitHub と Azure のアカウントアクセスが必要です。トークンや資格情報は私は扱えません。私が行えるのはワークフローと構成ファイルの追加・修正までです。
