## Next.js画像掲示板
これはNext.js製の画像掲示板です

基本的なスレッド立てや書き込みなどが出来るようになっています

<br>

フレームワーク:NextJS

DB:SQlite

ORM:prisma

<br>

### コンフィグの設定方法

config.tsファイルの中身を書き換えます

```ts
const configValue = {
    //名前欄が空白の場合の名前を指定します
    "name":"名無しさん",
    //スレッドの最大値を指定します
    "maxRes":5,
    //保存される最大レス数を指定します
    //この値を超過すると古いスレッドから削除されていきます
    "thresholdRes":15,
    //管理用の削除パスです
    "deletePassword":"pass"
}

export default configValue;
```