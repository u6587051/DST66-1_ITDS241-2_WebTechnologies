async function CallAdminWs(url, method, sentData = {}) {
    let data;
    if (method == "selectall") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "select") {
      let response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
    } else if (method == "insert" || method == "update" || method == "delete") {
      let aMethod;
      if (method == "insert") {
        aMethod = "POST";
      } else if (method == "update") {
        aMethod = "PUT";
      } else if (method == "delete") {
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


  