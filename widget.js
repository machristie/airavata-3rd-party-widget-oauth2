console.log("Loaded");

function loadScript(url, callback) {
  var script = document.createElement("script");

  script.type = "text/javascript";
  script.async = true;
  script.src = url;

  var entry = document.getElementsByTagName("script")[0];
  entry.parentNode.insertBefore(script, entry);

  if (script.addEventListener) script.addEventListener("load", callback, false);
  else {
    script.attachEvent("onreadystatechange", function () {
      if (/complete|loaded/.test(script.readyState)) callback();
    });
  }
}

function renderWidget(el) {
  const html = `
    <a href="login">Login</a>
  `;
  const div = document.createElement("div");
  div.innerHTML = html;

  el.parentNode.insertBefore(div, el);
}

function loadScriptP(url) {
  return new Promise(function (resolve) {
    loadScript(url, resolve);
  });
}

Promise.all([
  loadScriptP(
    "http://django.local:8000/static/django_airavata_api/dist/airavata-api.js"
  ),
  loadScriptP("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"),
  loadScriptP("https://airavata.host:8443/auth/js/keycloak.js"),
]).then(() => {
  console.log("api loaded");
  const { utils } = AiravataAPI;

  renderWidget(document.getElementById("airavata-widget"));
  var keycloak = Keycloak();
  keycloak
    .init()
    .success(function (authenticated) {
      // alert(authenticated ? 'authenticated' : 'not authenticated');
      if (!authenticated) {
        console.log("Not authenticated, trying to login");
        keycloak.login();
      } else {
        console.log("Authenticated!", keycloak.token);
        axios
          .get("http://django.local:8000/api/experiment-search/", {
            params: {
              limit: 5,
              offset: 0,
              USER_NAME: "marcus",
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${keycloak.token}`,
            },
          })
          .then((resp) => {
            console.log(resp);
          });
      }
    })
    .error(function () {
      alert("failed to initialize");
    });
});
// loadScript(
//   "http://django.local:8000/static/django_airavata_api/dist/airavata-api.js",
//   function () {
//     console.log("api loaded");
//     const { utils } = AiravataAPI;

//     renderWidget(document.getElementById("airavata-widget"));
//     // TODO: for now create an airavata-spinner element which FetchUtils expects to be there
//     // var spinner = document.createElement("div");
//     // spinner.id = "airavata-spinner";
//     // var body = document.getElementsByTagName("body")[0];
//     // body.appendChild(spinner);
//     // utils.FetchUtils.get("http://django.local:8000/api/experiment-search/", {
//     //   limit: 5,
//     //   offset: 0,
//     //   USER_NAME: "marcus",
//     // }).then((resp) => {
//     //   console.log(resp);
//     // });
//   }
// );
