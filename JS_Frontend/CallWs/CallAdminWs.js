async function callAdminWs(url, method, sentData = {}) {
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

let AID, EMAIL, PWD, FNAME, LNAME, ADDRESS, AGE, NEED;
let AID_TXT = document.querySelector("#aid");
let EMAIL_TXT = document.querySelector("#aemail");
// let PWD_TXT = document.querySelector("#");
let FNAME_TXT = document.querySelector("#afname");
// let LNAME_TXT = document.querySelector("#");
// let ADDRESS_TXT = document.querySelector("#");
// let AGE_TXT = document.querySelector("#");
// let NEED_TXT = document.querySelector("#");
  
function clearInput() {
  AID_TXT.value = "";
  EMAIL_TXT.value = "";
  // PWD_TXT.value = "";
  FNAME_TXT.value = "";
  // LNAME_TXT.value = "";
  // ADDRESS_TXT.value = "";
  // AGE_TXT.value = "";
  // NEED_TXT.value = "";
}
  
let insertB = document.querySelector("#ainsert");
let updateB = document.querySelector("#aupdate");
let deleteB = document.querySelector("#adelete");
let selectB = document.querySelector("#aselect");
let selectallB = document.querySelector("#aselectall");
// let loginB = document.querySelector("#login");
  
insertB.addEventListener("click", () => {
    console.log("insert leaw ja")
    // AID = AID_TXT.value;
    // EMAIL = EMAIL_TXT.value;
    // // PWD = PWD_TXT.value;
    // FNAME = FNAME_TXT.value;
    // // LNAME = LNAME_TXT.value;
    // // ADDRESS = ADDRESS_TXT.value;
    // // AGE = AGE_TXT.value;
    // // NEED = NEED_TXT.value;
    // let admindata = {
    //   AID: AID,
    //   EMAIL: EMAIL,
    //   // PWD: PWD,
    //   FNAME: FNAME,
    //   // LNAME: LNAME,
    //   // ADDRESS: ADDRESS,
    //   // AGE: AGE,
    //   // NEED: NEED,
    // };
    // callAdminWs("http://localhost:8022/adminWS/" + "admin", "insert", admindata).then((data) => {
    //   console.log(data);
    //   if (data.data > 0) {
    //     alert(data.message);
    //     clearInput();
    //   }
    // });
});
  
updateB.addEventListener("click", () => {
    AID = AID_TXT.value;
    EMAIL = EMAIL_TXT.value;
    // PWD = PWD_TXT.value;
    FNAME = FNAME_TXT.value;
    // LNAME = LNAME_TXT.value;
    // ADDRESS = ADDRESS_TXT.value;
    // AGE = AGE_TXT.value;
    // NEED = NEED_TXT.value;
    let admindata = {
      AID: AID,
      EMAIL: EMAIL,
      // PWD: PWD,
      FNAME: FNAME,
      // LNAME: LNAME,
      // ADDRESS: ADDRESS,
      // AGE: AGE,
      // NEED: NEED,
    };
    callAdminWs("http://localhost:8022/adminWS/" + "admin", "update", admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});
  
deleteB.addEventListener("click", () => {
    AID = AID_TXT.value;
    let admindata = {
      AID: AID,
    };
    callAdminWs("http://localhost:8022/adminWS/" + "admin", "delete", admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});
  
selectB.addEventListener("click", () => {
    AID = AID_TXT.value;
    callAdminWs("http://localhost:8022/adminWS/" + "admin/" + AID, "select").then((data) => {
      console.log(data);
      if (data) {
        alert(data.message);
        AID_TXT.value = data.data.AID;
        EMAIL_TXT.value = data.data.EMAIL;
        // PWD_TXT.value = data.data.PWD;
        FNAME_TXT.value = data.data.FNAME;
        // LNAME_TXT.value = data.data.LNAME;
        // ADDRESS_TXT.value = data.data.ADDRESS;
        // AGE_TXT.value = data.data.AGE;
        // NEED_TXT.value = data.data.NEED;
      }
    });
});
  
selectallB.addEventListener("click", () => {
    callAdminWs("http://localhost:8022/adminWS/" + "admins", "selectall").then((data) => {
      console.log(data);
      if (data.data.length > 0) {
        alert(data.message);
        let output;
        output = "<h1>Student List</h1>";
        output += "<table class='table'>";
        output += "<thead>";
        output += "<tr>";
        output +=
          "<th scope='col'>#</th><th scope='col'>First name</th><th scope='col'>Last name</th><th scope='col'>Age</th>";
        output += "</tr>";
        output += "</thead>";
        output += "<tbody>";
        data.data.forEach((element) => {
          output += "<tr>";
          output += "<td>" + element.AID + "</td>";
          output += "<td>" + element.EMAIL + "</td>";
          // output += "<td>" + element.PWD + "</td>";
          output += "<td>" + element.FNAME + "</td>";
          // output += "<td>" + element.LNAME + "</td>";
          // output += "<td>" + element.ADDRESS + "</td>";
          // output += "<td>" + element.AGE + "</td>";
          // output += "<td>" + element.NEED + "</td>";
          output += "</tr>";
        });
        output += "</tbody>";
        output += "</table>";
        $("#output").html(output);
        clearInput();
      }
    });
});