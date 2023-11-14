async function CallUserWS(url, method, sentData = {}) {
    let data;
    if (method == "Uselectall") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "Uselect3crit") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "Uinsert" || method == "Uupdate" || method == "Udelete") {
      let aMethod;
      if (method == "Uinsert") {
        aMethod = "POST";
      } else if (method == "Uupdate") {
        aMethod = "PUT";
      } else if (method == "Udelete") {
        aMethod = "DELETE";
      }
      let response = await fetch(url, {
        method: aMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentData),
      });
      data = await response.json();
    }
  
    return data;
  }

