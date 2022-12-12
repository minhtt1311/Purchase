let apiOrderList = "https://616d6fd86dacbb001794ca46.mockapi.io/orDer";
function getAPI(data) {
  fetch(apiOrderList)
    .then((res) => res.json())
    .then(data);
}

function start() {
  getAPI((data) => renderOrderList(data));
}
start();

function renderOrderList(data) {
  document.querySelector(".table-order").innerHTML = "";
  let donhang = "";
  console.log(data);
  data.map((item) => {
    console.log(item.id);
    const sl = item.listOrder.reduce((a, c) => a + c.sl, 0);
    const totalPrice = item.listOrder.reduce((a, c) => a + c.sl * c.price, 0);
    const idElement = "view" + item.id;

    donhang +=
      `
  <table class="table tableInfo">
    <tr>
      <th>Mã đơn hàng</th>
      <th>Họ tên khách hàng</th>
      <th>Ngày mua</th>
      <th>Số mặt hàng</th>
      <th>Số lượng</th>
      <th>Giá tiền</th>
      <th>Trả hàng</th>
    </tr>
    <tr>
      <td>${item.maDonHang}</td>
      <td>${item.info.hoTen}</td>
      <td>${item.ngayMua}</td>
      <td>${item.listOrder.length}</td>
      <td>${sl}</td>
      <td>${totalPrice}  </td>
      <td><i class="fa-solid fa-arrow-rotate-left" onclick="handleDelete(${item.id})"></i></td>
    </tr>
  </table>
  <a class="detail" onclick="handleViewDetail(${idElement})">Chi tiết <i class="bx bx-chevron-down"></i></a>
      
  <table id="${idElement}" class="table tableSP">
        <tr>
          <th>Hình Ảnh</th>
          <th>Tên Sản Phẩm</th>
          <th>Giá Tiền</th>
          <th>Số Lượng</th>
          <th>Thành Tiền</th>
        </tr>
        ` +
      item.listOrder.map((i) => {
        return `
            <tr>
              <td>
                <img src="${i.img}" alt="minh" />
              </td>
              <td>${i.name}</td>
              <td>${i.price}</td>
              <td>${i.sl}</td>
              <td>${i.sl * i.price}</td>
            </tr>
            `;
      }) +
      `
      </table>
            `;
  });
  document.querySelector(".table-order").innerHTML = donhang;
}

function handleDelete(id) {
  let api = "https://616d6fd86dacbb001794ca46.mockapi.io/orDer";
  options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(api + "/" + id, options)
    .then((res) => res.json())
    .then(() => {
      getAPI((data) => renderOrderList(data));
    });
}

function handleViewDetail(idElement) {
  console.log(idElement);
  if (idElement.style.display === "none") {
    idElement.style.display = "block";
  } else {
    idElement.style.display = "none";
  }
}
