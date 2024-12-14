# P2HACKS2024 アピールシート 

**プロダクト名**<br />
QR行動<br />
![image](https://github.com/user-attachments/assets/70df301d-e1a2-4efc-8db5-b295d51c8a7a)<br />
成果物のURL：https://qrkodo.kcat.dev

**コンセプト**<br />
フラッシュと言えば写真撮影と言うことでカメラを使ったゲームの作成を行った。<br />
また、暗い個所でフラッシュ撮影を活用するゲームにした。<br />
ストーリーとしては、落単した不真面目な学生が教授によって大学に集められ、教授のデスゲームの研究に参加させられる。<br />
その報酬として、最後まで生き残った学生には落単したはずの単位が与えられる。

**対象ユーザ**<br />
未来大生 と 体を動かすのゲームが好きな人  

**利用の流れ**<br />
Webサイトからゲームへアクセスし、部屋を建てた人がルーム番号を共有し部屋に参加する。<br />
待機画面でQRコードが表示されるため、印刷して体の前後に貼り付ける。<br />
ゲーム開始後は３分おきに位置情報が共有されるため、常に動きながら敵を探し、敵を見つけたら敵のQRコードを撮影し撃破する。<br />
最後まで生き残ったプレーヤーの勝利。

**推しポイント**<br />
単位をかけたデスゲームというコンセプトに沿って、本学で利用されている「Students」に準拠したデザインにした。  

**スクリーンショット(任意)**  <br />

## 開発体制  

役割分担  
- 金子康一/kCat：フロントエンド
- 大久匠士/くろ：フロントエンド
- 稲垣颯：バックエンド
- 長山 明日香/しろ：デザイン

### 開発における工夫した点  
**フロントエンド開発**<br />
Cloudflare Pageを利用し、githubへpushすることで自動でビルド＆デプロイが行われるようにした。<br />
また、mainブランチ以外でもpushするごとにプレビューのビルド＆デプロイが行われ、githubからプレビュー用のURLを確認し、チームメンバーの誰でも手軽に実環境での動作確認を行えるようにした。<br />
<br />**バックエンド開発**<br />
vercelでも自動ビルド＆デプロイが行われるようにし、開発の効率化を行った。<br />
<br />**タスク管理・チーム開発**<br />
タスク管理はgithubのissueから行うようにし、さらに、issueからbranchを発行することでissueとブランチの紐づけを容易にした。<br />
また、mainへのpushは基本的に禁止とし、pull rqquestからmainブランチへmergeするようにした。<br />
さらに、平日は毎日16時から最大22時までの間大学で対面で集まり作業会を行うことで、認識のそごが発生せずに開発を行うことが出来た。<br />



## 開発技術 
バックエンドのコード
- Flask API
  - https://github.com/kCat-fun/barbestack-p2hacks-backend-vercel
- websocket api
  - https://github.com/kCat-fun/websockets-api-barbestack-p2hacks2024

利用したプログラミング言語  
- Vue（Frontend）
- typescript（Frontend）
- Python（Backend）

利用したフレームワーク・ライブラリ  
- Nuxt3
- Scoket.IO
- Flask
- flask_socketio

その他開発に使用したツール・サービス
- cloudflare pages
- vercel
- firestore database
- Google Maps API
- geolocation API
- MediaDevices
- Figma
- Cosence
- Git
- github
- discord
  - webhook
- visual studio code
