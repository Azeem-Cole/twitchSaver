export const logout = () => {
  console.log(window.location);
  localStorage.removeItem("token");
  window.location.href = window.location.origin;

};
