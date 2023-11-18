//function ในการเรียก productWS ผ่านการ fetch api
async function callProductWS(url, method,sentData = {}) {
    let data;
    if (method == "selectall") { //ถ้า method ที่รับ parameter คือแสดงผลทั้งหมด
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง productWS
      });
      data = await response.json();
    } else if (method == "select") { //ถ้า method ที่รับ parameter คือแสดงผลจาก params
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง productWS
      });
      data = await response.json();
    } else if (method == "insert" || method == "update" || method == "delete" || method == "login") { //ถ้า method ที่รับ parameter มาเท่ากับ insert ให้ส่ง method post ไปยัง productWS
      let aMethod;
      if (method == "insert" || method == "login") { //ถ้า method ที่รับ parameter มาเท่ากับ update method put ไปยัง productWS
        aMethod = "POST";
      } else if (method == "update") { //ถ้า method ที่รับ parameter มาเท่ากับ delete  method delete ไปยัง productWS
        aMethod = "PUT";
      } else if (method == "delete") { //ถ้า method ที่รับ parameter มาเท่ากับ delete  method delete ไปยัง productWS
        aMethod = "DELETE";
      }
      let response = await fetch(url, {
        method: aMethod,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sentData),
      });
      data = await response.json();
    }
  
    return data; //ส่งข้อมูลกลับมา
}

//รับค่าปุ่มมาจาก input box โดย id
let PID, PNAME, PBRAND, PCAT, PPRICE, PQUAN, PDETAIL;
let PID_TXT = document.querySelector("#pid");
let PNAME_TXT = document.querySelector("#pname");
let PBRAND_TXT = document.querySelector("#pbrand");
let PCAT_TXT = document.querySelector("#pcat");
let PPRICE_TXT = document.querySelector("#pprice");
let PQUAN_TXT = document.querySelector("#pquan");
let PDETAIL_TXT = document.querySelector("#pdetail");
  
function clearInput() { //function ในการ clear กล่อง input box
  PID_TXT.value = "";
  PNAME_TXT.value = "";
  PBRAND_TXT.value = "";
  PCAT_TXT.value = "";
  PPRICE_TXT.value = "";
  PQUAN_TXT.value = "";
  PDETAIL_TXT.value = "";
}

//รับค่าปุ่มมาจาก input box โดย id
let insertB = document.querySelector("#pinsert");
let updateB = document.querySelector("#pupdate");
let deleteB = document.querySelector("#pdelete");
let selectB = document.querySelector("#pselect");
let selectallB = document.querySelector("#pselectall");
// let loginB = document.querySelector("#login");

// //หากกด login จะ post ตัว login แล้วส่ง token
// loginB.addEventListener("click", () => {
//   let user_data = {
//     user: {
//       email: "test@test.com",
//       userid: 1,
//       first_name: "Wudhichart",
//     },
//   };
//   callStudentWS("http://localhost:8022/productWS/"+ "signin", "login", user_data).then((data) => {
//     console.log(data);
//     token = data.token;
//   });
// });

//หากกดคลิก insert button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callProductWS
//ส่ง parameter url คือ http://localhost:8022/productWS/product, method คือ insert, data คือไฟล์ json ที่รับค่ามา
insertB.addEventListener("click", () => {
    // console.log("insert leaw ja")
    PID = PID_TXT.value;
    PNAME = PNAME_TXT.value;
    PBRAND = PBRAND_TXT.value;
    PCAT = PCAT_TXT.value;
    PPRICE = PPRICE_TXT.value;
    PQUAN = PQUAN_TXT.value;
    PDETAIL = PDETAIL_TXT.value;
    let productdata = {
      PID: PID,
      PNAME: PNAME,
      PBRAND: PBRAND,
      PCAT: PCAT,
      PPRICE: PPRICE,
      PQUAN: PQUAN,
      PDETAIL: PDETAIL,
    };
    console.log(productdata)
    callProductWS("http://localhost:8022/productWS/" + "product", "insert", productdata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});

//หากกดคลิก update button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callProductWS
//ส่ง parameter url คือ http://localhost:8022/productWS/product, method คือ update, data คือไฟล์ json ที่รับค่ามา
updateB.addEventListener("click", () => {
    PID = PID_TXT.value;
    PNAME = PNAME_TXT.value;
    PBRAND = PBRAND_TXT.value;
    PCAT = PCAT_TXT.value;
    PPRICE = PPRICE_TXT.value;
    PQUAN = PQUAN_TXT.value;
    PDETAIL = PDETAIL_TXT.value;
    let productdata = {
      PID: PID,
      PNAME: PNAME,
      PBRAND: PBRAND,
      PCAT: PCAT,
      PPRICE: PPRICE,
      PQUAN: PQUAN,
      PDETAIL: PDETAIL,
    };
    callProductWS("http://localhost:8022/productWS/" + "product", "update", productdata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});

//หากกดคลิก delete button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callProductWS
//ส่ง parameter url คือ http://localhost:8022/productWS/product, method คือ delete, data คือไฟล์ json ที่รับค่ามาซึ่งเป็น product id ไว้เช็ค
deleteB.addEventListener("click", () => {
    PID = PID_TXT.value;
    let productdata = {
      PID: PID,
    };
    callProductWS("http://localhost:8022/productWS/" + "product", "delete", productdata).then((data) => {
      console.log(data);
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }
    });
});

//หากกดคลิก select button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callProductWS
//ส่ง parameter url คือ http://localhost:8022/productWS/product บวกกับตัว product id ที่รับมาเป็น params, method คือ select, data คือไฟล์ json ที่รับค่ามาซึ่งเป็น product id ไว้เช็ค
selectB.addEventListener("click", () => {
  PID = PID_TXT.value;
  PBRAND = PBRAND_TXT.value;
  PCAT = PCAT_TXT.value;

  let id = `PID=${PID}`;
  let brand = `PBRAND=${PBRAND}`;
  let cat = `PCAT=${PCAT}`;
  callProductWS("http://localhost:8022/productWS/" + "product?"+id+"&"+brand+"&"+cat, "select").then((data) => {
    console.log(data);
    if (data) {
      alert(data.message);
      PID = data.data[0].PID;
      PNAME = data.data[0].PName;
      PBRAND = data.data[0].PBrand;
      PCAT = data.data[0].PCat;
      PPRICE = data.data[0].PPrice;
      PQUAN = data.data[0].PQuan;
      PDETAIL = data.data[0].PDetail;
    }
  });
});

//หากกดคลิก selectall button เรียก function callProductWS
//ส่ง parameter url คือ http://localhost:8022/productWS/products, method คือ selectall, data คือไฟล์ json ที่รับค่ามาแล้วแสดงผลค่า product ทั้งหมดเข้าไปใน html
selectallB.addEventListener("click", () => {
    callProductWS("http://localhost:8022/productWS/" + "products", "selectall").then((data) => {
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
          output += "<td>" + element.PID + "</td>";
          output += "<td>" + element.PName + "</td>";
          output += "<td>" + element.PBrand + "</td>";
          output += "<td>" + element.PCat + "</td>";
          output += "<td>" + element.PPrice + "</td>";
          output += "<td>" + element.PQuan + "</td>";
          output += "<td>" + element.PDetail + "</td>";
          output += "</tr>";
        });
        output += "</tbody>";
        output += "</table>";
        $("#output").html(output);
        clearInput();
      }
    });
});