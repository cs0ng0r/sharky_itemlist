let items = [];
let selectedItem = null;

$(window).on("message", (event) => {
  const data = event.originalEvent.data;
  if (data.action === "open") {
    fetchItems();
    $("#nui").css("display", "flex");
  }
});

$("#close").on("click", () => {
  $("#nui").hide();
  $.post("https://sharky_itemlist/close");
});

$("#search").on("input", function () {
  const search = $(this).val().toLowerCase();
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search) ||
    item.name.toLowerCase().includes(search)
  );
  renderItems(filteredItems);
});

function fetchItems() {
  $.ajax({
    url: "https://sharky_itemlist/getItems",
    method: "POST",
    contentType: "application/json",
    success: function (data) {
      items = Object.entries(data).map(([name, label]) => ({ name, label }));
      renderItems(items);
    },
    error: function (err) {
      console.error("Error fetching items:", err);
    },
  });
}

function renderItems(items) {
  const $container = $("#item-container");
  $container.empty();

  items.forEach((item) => {
    const $div = $(`
      <div class="item admin-item" id="${item.name}">
        <img src="nui://ox_inventory/web/images/${item.name}.png" alt="Nincs kép">
        <span>${item.label}</span>
        <span id="name">${item.name}</span>
      </div>
    `);

    $div.on('click', function () {
      openAdminModal(item);
    });

    $container.append($div);
  });
}

function openAdminModal(item) {
  selectedItem = item;


  $("#modal-item-name").text(item.label);
  $("#modal-item-id").text(item.name);
  $("#modal-item-img").attr("src", `nui://ox_inventory/web/images/${item.name}.png`);


  $("#admin-modal").css("display", "flex");
  $("#player-id").focus();


  $("#notification").hide().removeClass("success error");
}


$(".close-modal").on("click", function () {
  $("#admin-modal").hide();
});


$(window).on("click", function (event) {
  if (event.target.id === "admin-modal") {
    $("#admin-modal").hide();
  }
});


$("#give-item").on("click", function () {
  const playerId = parseInt($("#player-id").val());
  const amount = parseInt($("#item-amount").val());


  if (!playerId || isNaN(playerId) || playerId < 1) {
    showNotification("Érvényes játékos ID-t kell megadni!", "error");
    return;
  }

  if (!amount || isNaN(amount) || amount < 1) {
    showNotification("Érvényes mennyiséget kell megadni!", "error");
    return;
  }


  const $button = $(this);
  $button.prop("disabled", true).text("Feldolgozás...");


  $.post("https://sharky_itemlist/giveItem", JSON.stringify({
    targetId: playerId,
    itemName: selectedItem.name,
    amount: amount
  }), function (response) {

    $button.prop("disabled", false).text("Átadás");


    showNotification(response.message, response.success ? "success" : "error");


    if (response.success) {
      setTimeout(function () {
        $("#admin-modal").hide();
      }, 2000);
    }
  });
});


function showNotification(message, type) {
  const $notification = $("#notification");
  $notification
    .removeClass("success error")
    .addClass(type)
    .text(message)
    .show();
}
