# roaster
A practise base on Laravel &amp; Vue


##How to run
- config composer repo,change to alibaba mirrors

composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

- install dependencies

composer install 

- add specific dep

composer require module/modulename[=....]

- npm setup: change to taobao registry

npm config set registry https://registry.npm.taobao.org
check if setted by:
npm config get registry
or
npm info express

- install

npm install

- compile 

npm run dev|prod|watch

- install database 
  first need a DB instance.

php artisan migrate

- start server

- apply gaode API key
set GAODE API secret KEY in env
GAODE_MAPS_WS_API_KEY={YOUR_API_KEY}
GAODE_MAPS_JS_API_KEY={YOUR_API_KEY}

- get github oauth key
GIT_CLIENT_ID=你的 Github 应用 Client ID
GIT_CLIENT_SECRET=你的 Github 应用 Client Secret
GIT_REDIRECT=你的 Github 应用授权回调URL

sudo php artisan serve --port=80

- access via web browser, enjoy.

