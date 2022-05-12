export function getPosition(dispatch) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      window.alert(
        "you do not have geolocation available, you will have to enable it to use this feature, try using the searchbar instead"
      );
      reject("Geoloaction not available");
    }
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        console.log("result ", result.state);
        if (result.state === "prompt" || result.state === "granted") {
          window.alert(
            "Your browser will prompt you for your geolocation, it may take a few seconds to load geolocation for the first time"
          );
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve([position.coords.latitude, position.coords.longitude]);
            },
            (e) => reject(e)
          );
        } else if (result.state === "denied") {
          window.alert(
            "you denied geolocation, you will have to reenable it from your browser settings"
          );
          console.log(result.state);
        }
        result.onchange = function () {
          console.log("onchange ", result.state);
          if (result.state === "granted") {
            console.log("dispatch action");
            dispatch({
              type: "GEOLOCATION_PERMISSION_GRANTED",
              payload: result.state,
            });
          }
        };
      });
  });
}
