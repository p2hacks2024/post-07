# P2HACKS2024 アピールシート 
post-07 バーベスタック


### プロダクト名
**QR行動**

![image](https://github.com/user-attachments/assets/70df301d-e1a2-4efc-8db5-b295d51c8a7a)<br />
成果物のURL：https://qrkodo.kcat.dev

### コンセプト
テーマ「フラッシュ」と言えばカメラの写真撮影と言うことで、カメラを使ったゲームの作成を行った。<br />
また、暗い個所でフラッシュ撮影を活用するゲームにした。<br />
ゲームのストーリーは次の通りである。
落単した不真面目な学生たちが教授によって大学に集められ、教授が行うデスゲーム研究の実験に参加させられる。
その報酬として、最後まで生き残った学生には落単したはずの単位が与えられる、という設定である。

### 対象ユーザ
**未来大生** と **体を動かすゲームが好きな人**

### 利用の流れ
Webサイトからゲームへアクセスし、部屋を建てた人がルーム番号を共有し、部屋に参加する。
待機画面でQRコードが表示されるため、これを印刷して体の前後(腹部と背部)に貼り付ける。
ゲーム開始後は3分おきに位置情報が共有されるため、常に動きながら敵を探し、敵を見つけたら敵のQRコードを撮影する。
QRコードを撮影されたプレイヤーは撃破となる。最後まで生き残ったプレイヤーが勝利となる。

### 推しポイント
単位をかけたデスゲームというコンセプトに沿って、本学で利用されている教務システム「**Students**」に準拠したデザインにした。  

### スクリーンショット

## 開発体制  

### 役割分担  
- 金子康一/kCat：フロントエンド
- 大久匠士/くろ：フロントエンド
- 稲垣颯：バックエンド
- 長山 明日香/しろ：デザイン

## 開発で工夫した点  
### フロントエンド開発
Cloudflare Pagesを利用し、GitHubへpushすることで自動でビルド＆デプロイが行われるようにした。<br />
また、mainブランチ以外でもpushするごとにプレビューのビルド＆デプロイが行われ、githubからプレビュー用のURLを確認し、チームメンバーの誰でも手軽に実環境での動作確認を行えるようにした。<br />

### バックエンド開発
Vercel, Renderでもフロントエンド開発同様、自動ビルド＆デプロイが行われるようにし、開発の効率化を行った。<br />

### タスク管理・チーム開発
タスク管理はGithubのIssueから行うようにし、さらに、Issueからブランチを発行することでIssueとブランチの紐づけを容易にした。
また、mainへのpushは基本的に禁止とし、Pull rqquestからmainブランチへマージするようにした。<br />
さらに、平日は毎日16時から最大22時までの間大学にて対面で集まり作業会を行うことで、認識の齟齬が発生せずに開発を行うことが出来た。<br />


## 開発技術 
#### バックエンドのコード
- Flask API
  - https://github.com/kCat-fun/barbestack-p2hacks-backend-vercel
- Websocket API
  - https://github.com/kCat-fun/websockets-api-barbestack-p2hacks2024

#### 利用したプログラミング言語  
- Vue（Frontend）
- TypeScript（Frontend）
- Python（Backend）

#### 利用したフレームワーク・ライブラリ  
- Nuxt3
- Socket.IO
- Flask
- Flask_SocketIO

#### その他開発に使用したツール・サービス
- Cloudflare Pages
- Vercel
- Render
- Firestore
- Google Maps API
- Geolocation API
- MediaDevices
- Figma
- Cosence
- Git
- Github
- Discord
- Webhook
- Visual Studio Code
