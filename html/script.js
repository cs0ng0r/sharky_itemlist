let items = [];

// Listen for the NUI open signal
$(window).on("message", (event) => {
  if (event.originalEvent.data.action === "open") {
    fetchItems();
    $("#nui").css("display", "flex");
  }
});

// Close button logic
$("#close").on("click", () => {
  $("#nui").hide();
  $.post("https://sharky_itemlist/close");
});

// Search functionality
$("#search").on("input", function () {
  const search = $(this).val().toLowerCase();
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search)
  );
  renderItems(filteredItems);
});

// Fetch items from the server
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

// Render items in the UI
function renderItems(items) {
  const $container = $("#item-container");
  $container.empty();
  items.forEach((item) => {
    const $div = $(`
      <div class="item">
        <img src="nui://ox_inventory/web/images/${item.name}.png" alt="Nincs kép">
        <span>${item.label}</span>
        <span id="name">${item.name}</span>
      </div>
    `);
    $container.append($div);
  });
}
