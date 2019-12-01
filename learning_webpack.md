# 如何从零开始用webpack打包react项目

## 写在之前

之前无论是vue还是react都是用脚手架来创建工程，并没有深入了解webpack，而最近一位大牛又推荐我使用parcel，说这个无配置，很方便，但是方便的东西我认为其也必有不足之处，不然为何react和vue的默认打包方式都是webpack呢，所以这次打算完整的自己从头搭一个用webpack打包的react项目。

## 开发准备

```bash
node --version
v10.16.3
```

## 初始化

初始化项目

```bash
yarn init
yarn add react
yarn add react-dom
```

安装webpack

```bash
yarn add --dev webpack
yarn add --dev webpack-cli
```

建立文件夹src

建立文件夹dist

在dist下建立文件index.html

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script src="./main.js"></script>
</body>
</html>
```

在src下建立文件夹index.js

index.js

```javascript
alert("helloworld");
```



修改package.json

```
+   "private": true,
-   "main": "index.js",
```



打包测试

```bash
npx webpack
```

可以看到，dist文件夹中多出了打包之后的main.js



## 使用配置文件

在项目根目录下建立新文件 webpack.config.js

webpack.config.js

```javascript
const path = require('path');

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,"dist"),
    }
}
```

打包测试

```bash
npx webpack --config webpack.config.js
```

可以看到，使用配置文件的效果和正常的效果是一样的，只不过使用配置文件可以更加个性化地配置更多属性。



## 使用脚本

package.json

```
+  "scripts": {
+      "build": "webpack --config webpack.config.js"
+   },
```

编写了脚本之后我们只需要 在控制台输入以下代码就可以运行npx了

```bash
yarn build
```



## 管理资源

### 加载CSS

为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：

```bash
yarn add --dev style-loader css-loader	
```

webpack.config.js

```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```



如此这样便可以在js中引用css样式文件了



### 加载图片

假想，现在我们正在下载 CSS，但是我们的背景和图标这些图片，要如何处理呢？使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中：

```bash
yarn add --save file-loader
```

webpack.config.js

```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```



