// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  version : '1.B',
  api_url: 'http://cedoc-api.ngcloud.ma/api',
  app_url: 'http://ced.uh1.ac.ma',
  doc_app_url: 'http://localhost:4200',
  ens_app_url: 'http://localhost:4202',
  //api_url: 'http://127.0.0.1:8000/api',
  //app_url: 'http://127.0.0.1:8000/',
  api_key: 'UG93ZXJlZCBieQ==',
  api_token: 'QUlUIFNBSUQgTWVoZGkgJiBNSUhJIFNvdWthaW5h',
  api_secret: 'aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21laGRpLWFpdHNhaWQv',

    loading_image_url: "/assets/layout/images/loading.gif",
    history_years: 6,
};
