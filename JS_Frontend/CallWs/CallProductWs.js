async function callProductWs(url, method, sentData = {}) {
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

let PID, PNAME, PBRAND, PCAT, PPRICE, PQUAN, PDETAIL;
// let PID_TXT = document.querySelector("#");
// let PNAME_TXT = document.querySelector("#");
// let PBRAND_TXT = document.querySelector("#");
// let PCAT_TXT = document.querySelector("#");
// let PPRICE_TXT = document.querySelector("#");
// let PQUAN_TXT = document.querySelector("#");
// let PDETAIL_TXT = document.querySelector("#");
  
function clearInput() {
//   PID_TXT.value = "";
//   PNAME_TXT.value = "";
//   PBRAND_TXT.value = "";
//   PCAT_TXT.value = "";
//   PPRICE_TXT.value = "";
//   PQUAN_TXT.value = "";
//   PDETAIL_TXT.value = "";
}
  
let insertB = document.querySelector("#ainsert");
let updateB = document.querySelector("#aupdate");
let deleteB = document.querySelector("#adelete");
let selectB = document.querySelector("#aselect");
let selectallB = document.querySelector("#aselectall");
  
insertB.addEventListener("click", () => {
    console.log("insert leaw ja")
    // // PID = PID_TXT.value;
    // // PNAME = PNAME_TXT.value;
    // // PBRAND = PBRAND_TXT.value;
    // // PCAT = PCAT_TXT.value;
    // // PPRICE = PPRICE_TXT.value;
    // // PQUAN = PQUAN_TXT.value;
    // // PDETAIL = PDETAIL_TXT.value;
    // let admindata = {
    //   // PID: PID,
    //   // PNAME: PNAME,
    //   // PBRAND: PBRAND,
    //   // PCAT: PCAT,
    //   // PPRICE: PPRICE,
    //   // PQUAN: PQUAN,
    //   // PDETAIL: PDETAIL,
    // };
    // callAdminWs("http://localhost:8021/adminWS/" + "admin", "insert", admindata).then((data) => {
    //   console.log(data);
    //   if (data.data > 0) {
    //     alert(data.messPDETAIL);
    //     clearInput();
    //   }
    // });
});
  
updateB.addEventListener("click", () => {
    // PID = PID_TXT.value;
    // PNAME = PNAME_TXT.value;
    // PBRAND = PBRAND_TXT.value;
    // PCAT = PCAT_TXT.value;
    // PPRICE = PPRICE_TXT.value;
    // PQUAN = PQUAN_TXT.value;
    // PDETAIL = PDETAIL_TXT.value;
    let admindata = {
      // PID: PID,
      // PNAME: PNAME,
      // PBRAND: PBRAND,
      // PCAT: PCAT,
      // PPRICE: PPRICE,
      // PQUAN: PQUAN,
      // PDETAIL: PDETAIL,
    };
    callAdminWs("http://localhost:8021/adminWS/" + "admin", "update", admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});
  
deleteB.addEventListener("click", () => {
    // PID = PID_TXT.value;
    let admindata = {
    //   PID: PID,
    };
    callAdminWs("http://localhost:8021/adminWS/" + "admin", "delete", admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});
  
selectB.addEventListener("click", () => {
    // PID = PID_TXT.value;
    callAdminWs("http://localhost:8021/adminWS/" + "admin/" + PID, "select").then((data) => {
      console.log(data);
      if (data) {
        alert(data.messPDETAIL);
        // PID_TXT.value = data.data.PID;
        // PNAME_TXT.value = data.data.PNAME;
        // PBRAND_TXT.value = data.data.PBRAND;
        // PCAT_TXT.value = data.data.PCAT;
        // PPRICE_TXT.value = data.data.PPRICE;
        // PQUAN_TXT.value = data.data.PQUAN;
        // PDETAIL_TXT.value = data.data.PDETAIL;
      }
    });
});
  
selectallB.addEventListener("click", () => {
    callAdminWs("http://localhost:8021/adminWS/" + "admins", "selectall").then((data) => {
      console.log(data);
      if (data.data.length > 0) {
        alert(data.message);
        let output;
        output = "<h1>Student List</h1>";
        output += "<table class='table'>";
        output += "<thead>";
        output += "<tr>";
        output +=
          "<th scope='col'>#</th><th scope='col'>First name</th><th scope='col'>Last name</th><th scope='col'>PDETAIL</th>";
        output += "</tr>";
        output += "</thead>";
        output += "<tbody>";
        data.data.forEach((element) => {
          output += "<tr>";
          // output += "<td>" + element.PID + "</td>";
          // output += "<td>" + element.PNAME + "</td>";
          // output += "<td>" + element.PBRAND + "</td>";
         //  output += "<td>" + element.PCAT + "</td>";
          // output += "<td>" + element.PPRICE + "</td>";
          // output += "<td>" + element.PQUAN + "</td>";
          // output += "<td>" + element.PDETAIL + "</td>";
          output += "</tr>";
        });
        output += "</tbody>";
        output += "</table>";
        $("#output").html(output);
        clearInput();
      }
    });
});