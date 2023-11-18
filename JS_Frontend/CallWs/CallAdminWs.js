//function ในการเรียก adminWS ผ่านการ fetch api
async function callAdminWs(url, method,sentData = {}) {
    let data;
    if (method == "selectall") { //ถ้า method ที่รับ parameter คือแสดงผลทั้งหมด
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง adminWS
      });
      data = await response.json();
    } else if (method == "select") {
      let response = await fetch(url, { //ถ้า method ที่รับ parameter คือแสดงผลจาก params
        method: "GET", //ส่ง method get ไปยัง adminWS
      });
      data = await response.json();
    } else if (method == "insert" || method == "update" || method == "delete" || method == "login") { 
      let aMethod;
      if (method == "insert" || method == "login") { //ถ้า method ที่รับ parameter มาเท่ากับ insert ให้ส่ง method post ไปยัง adminWS
        aMethod = "POST";
      } else if (method == "update") { //ถ้า method ที่รับ parameter มาเท่ากับ update method put ไปยัง adminWS
        aMethod = "PUT";
      } else if (method == "delete") { //ถ้า method ที่รับ parameter มาเท่ากับ delete  method delete ไปยัง adminWS
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
  
    return data; //ส่งข้อมูลกลับมา
}

let AID, EMAIL, PWD, FNAME, LNAME, ADDRESS, AGE, NEED; //กำหนดค่าที่รับค่าจาก id input box
let AID_TXT = document.querySelector("#aid");
let EMAIL_TXT = document.querySelector("#aemail");
let PWD_TXT = document.querySelector("#apwd");
let FNAME_TXT = document.querySelector("#afname");
let LNAME_TXT = document.querySelector("#alname");
let ADDRESS_TXT = document.querySelector("#aaddress");
let AGE_TXT = document.querySelector("#aage");
let NEED_TXT = document.querySelector("#aneed");
  
function clearInput() { //function ในการ clear กล่อง input box
  AID_TXT.value = "";
  EMAIL_TXT.value = "";
  PWD_TXT.value = "";
  FNAME_TXT.value = "";
  LNAME_TXT.value = "";
  ADDRESS_TXT.value = "";
  AGE_TXT.value = "";
  NEED_TXT.value = "";
}

//รับค่าปุ่มมาจาก input box โดย id
let insertB = document.querySelector("#ainsert");
let updateB = document.querySelector("#aupdate");
let deleteB = document.querySelector("#adelete");
let selectB = document.querySelector("#aselect");
let selectallB = document.querySelector("#aselectall");
let loginB = document.querySelector("#login");

// //หากกด login จะ post ตัว login แล้วส่ง token
// loginB.addEventListener("click", () => {
//   let user_data = {
//     user: {
//       email: "test@test.com",
//       userid: 1,
//       first_name: "Wudhichart",
//     },
//   };
//   callStudentWS("http://localhost:8022/adminWS/"+ "signin", "login", user_data).then((data) => {
//     console.log(data);
//     token = data.token;
//   });
// });

//หากกดคลิก insert button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callAdminWS
//ส่ง parameter url คือ http://localhost:8022/adminWS/admin, method คือ insert, data คือไฟล์ json ที่รับค่ามา
insertB.addEventListener("click", () => {
    // console.log("insert leaw ja")
    AID = AID_TXT.value;
    EMAIL = EMAIL_TXT.value;
    PWD = PWD_TXT.value;
    FNAME = FNAME_TXT.value;
    LNAME = LNAME_TXT.value;
    ADDRESS = ADDRESS_TXT.value;
    AGE = AGE_TXT.value;
    NEED = NEED_TXT.value;
    let admindata = {
      AID: AID,
      EMAIL: EMAIL,
      PWD: PWD,
      FNAME: FNAME,
      LNAME: LNAME,
      ADDRESS: ADDRESS,
      AGE: AGE,
      NEED: NEED,
    };
    console.log(admindata);
    callAdminWs("http://localhost:8022/adminWS/" + "admin", "insert", admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});

//หากกดคลิก update button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callAdminWS
//ส่ง parameter url คือ http://localhost:8022/adminWS/admin, method คือ update, data คือไฟล์ json ที่รับค่ามา
updateB.addEventListener("click", () => {
    AID = AID_TXT.value;
    EMAIL = EMAIL_TXT.value;
    PWD = PWD_TXT.value;
    FNAME = FNAME_TXT.value;
    LNAME = LNAME_TXT.value;
    ADDRESS = ADDRESS_TXT.value;
    AGE = AGE_TXT.value;
    NEED = NEED_TXT.value;
    let admindata = {
      AID: AID,
      EMAIL: EMAIL,
      PWD: PWD,
      FNAME: FNAME,
      LNAME: LNAME,
      ADDRESS: ADDRESS,
      AGE: AGE,
      NEED: NEED,
    };
    console.log(admindata);
    callAdminWs("http://localhost:8022/adminWS/" + "admin", "update", admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});

//หากกดคลิก delete button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callAdminWS
//ส่ง parameter url คือ http://localhost:8022/adminWS/admin, method คือ delete, data คือไฟล์ json ที่รับค่ามาซึ่งเป็น admin id ไว้เช็ค
deleteB.addEventListener("click", () => {
    AID = AID_TXT.value;
    let admindata = {
      AID: AID,
    };
    callAdminWs("http://localhost:8022/adminWS/" + "admin", "delete",admindata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
        console.clear()
      }
    });
});

// //หากกดคลิก select button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callAdminWS
// //ส่ง parameter url คือ http://localhost:8022/adminWS/admin บวกกับตัว admin id ที่รับมาเป็น params, method คือ select, data คือไฟล์ json ที่รับค่ามาซึ่งเป็น admin id ไว้เช็ค
selectB.addEventListener("click", () => {
  AID = AID_TXT.value;
  EMAIL = EMAIL_TXT.value;
  FNAME = FNAME_TXT.value;

  let id = `AID=${AID}`;
  let em = `EMAIL=${EMAIL}`;
  let fn = `FNAME=${FNAME}`;
  callAdminWs("http://localhost:8022/adminWS/" + "admin?"+id+"&"+em+"&"+fn, "select").then((data) => {
    console.log(data);
    if (data) {
      alert(data.message);
      AID_TXT.value = data.data[0].AID;
      EMAIL_TXT.value = data.data[0].email;
      PWD_TXT.value = data.data[0].pwd;
      FNAME_TXT.value = data.data[0].fname;
      LNAME_TXT.value = data.data[0].lname;
      ADDRESS_TXT.value = data.data[0].address;
      AGE_TXT.value = data.data[0].age;
      NEED_TXT.value = data.data[0].need;
    }
  });
});

//หากกดคลิก selectall button เรียก function callAdminWS
//ส่ง parameter url คือ http://localhost:8022/adminWS/admins, method คือ selectall, data คือไฟล์ json ที่รับค่ามาแล้วแสดงผลค่า admin ทั้งหมดเข้าไปใน html
selectallB.addEventListener("click", () => {
    callAdminWs("http://localhost:8022/adminWS/" + "admins", "selectall").then((data) => {
      console.log(data);
      console.log(data.data);
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
          output += "<td>" + element.PWD + "</td>";
          output += "<td>" + element.FNAME + "</td>";
          output += "<td>" + element.LNAME + "</td>";
          output += "<td>" + element.ADDRESS + "</td>";
          output += "<td>" + element.AGE + "</td>";
          output += "<td>" + element.NEED + "</td>";
          output += "</tr>";
        });
        output += "</tbody>";
        output += "</table>";
        $("#output").html(output);
        clearInput();
      }
    });
});