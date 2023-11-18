//function ในการเรียก searchWS ผ่านการ fetch api
async function callSearchWS(url, method,sentData = {}) {
    let data;
    if (method == "select") { //ถ้า method ที่รับ parameter คือแสดงผลทั้งหมด
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง SearchWS
      });
      data = await response.json();
    }
    return data; //ส่งข้อมูลกลับมา
}

//รับค่า input box โดย id
let PNAME, PBRAND, PCAT;
let PNAME_TXT = document.querySelector("#pname");
let PCAT_TXT = document.querySelector("#pcat");
let PBRAND_TXT = document.querySelector("#pbrand");

//รับค่าปุ่มมาจากid
let selectB = document.querySelector("#psearch");

function clearInput() { //function ในการ clear กล่อง input box
  PID_TXT.value = "";
  PNAME_TXT.value = "";
  PBRAND_TXT.value = "";
  PCAT_TXT.value = "";
  PPRICE_TXT.value = "";
  PQUAN_TXT.value = "";
  PDETAIL_TXT.value = "";
  PIMG_TXT.value = "";
}


//หากกดคลิก select button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callSearchWS
//ส่ง parameter url คือ http://localhost:8022/searchWS/search บวกกับ params เพื่อใช้ในการใส่เงื่อนไขการค้นหา
selectB.addEventListener("click", () => {
    PBRAND = PBRAND_TXT.value;
    PCAT = PCAT_TXT.value;
    PNAME = PNAME_TXT.value;

    let pname = `PNAME=${PNAME}`
    let cat = `PCAT=${PCAT}`;
    let brand = `PBRAND=${PBRAND}`;

    callSearchWS("http://localhost:8022/searchWS/" + "search?"+pname+"&"+cat+"&"+brand, "select").then((data) => {
      console.log(data);
      if (data) {
        alert(data.message);
        data.data.forEach((productData) => {
          var column = document.createElement('div'); 
          column.className = 'column';

    var img = document.createElement('img');
    img.src = productData.PIMG; // Replace with the actual property name from your data
    // img.alt = productData.altText;
    img.className = 'productimg';

    var heading = document.createElement('h3');
    heading.id = 'producthead';
    heading.textContent = productData.PNAME; // Replace with the actual property name from your data

    var price = document.createElement('h4');
    price.id = 'price';
    price.textContent = '฿' + productData.PPRICE; // Replace with the actual property name from your data

    var buyButton = document.createElement('h4');
    buyButton.id = 'buybutton';
    
    var link = document.createElement('a');
    link.id = 'Buy';
    // link.href = productData.buyLink; // Replace with the actual property name from your data
    link.textContent = 'สั่งซื้อสินค้า';

    buyButton.appendChild(link);

          // column.appendChild(img);
          column.appendChild(heading);
          column.appendChild(price);
          column.appendChild(buyButton);

    $("#Soutput").html(column);
    clearInput();
}

