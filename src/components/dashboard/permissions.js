function canView(page, role) {
  // let admin_view = ["employees", "customers"];
  let front_view = ["roomtypes", "bookings", "rooms", "customers"];
  let kitchen_view = ["foods", "foodorders"];

  if (role == "Frontoffice" && front_view.includes(page)) {
    return true;
  }
  if (role == "Admin") {
    return true;
  }
  if (role == "Kitchen" && kitchen_view.includes(page)) {
    return true;
  }

  return false;
}

export default canView;
