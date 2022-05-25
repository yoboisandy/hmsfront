function canView(page, role) {
  // let admin_view = ["employees", "customers"];
  let front_view = [
    // "roomtypes",
    "bookings",
    "hallbookings",
    // "rooms",
    "customers",
  ];
  let kitchen_view = ["foods", "foodorders"];

  if (role == "Frontoffice" && front_view.includes(page)) {
    return true;
  }
  if (role == "Admin" && page !== "foods" && page !== "foodorders") {
    return true;
  }
  if (role == "Kitchen" && kitchen_view.includes(page)) {
    return true;
  }

  return false;
}

export default canView;
