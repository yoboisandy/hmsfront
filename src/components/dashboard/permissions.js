function canView(page, role) {
  // let admin_view = ["employees", "customers"];
  let front_view = ["roomtypes", "bookings", "rooms", "customers"];

  // if (role == "Admin" && admin_view.includes(page)) {
  //   return true;
  // }

  if (role == "Frontoffice" && front_view.includes(page)) {
    return true;
  }

  return false;
}

export default canView;
