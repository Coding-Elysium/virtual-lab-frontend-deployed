// export const BASEURL = "http://localhost:5000";
export const BASEURL = "https://virtual-lab-backend-t0qj.onrender.com";

export const capitalizeWords = (str) => {
  if (typeof str !== "string") return "";

  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const capitalizeEachWord = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // handle camelCase
    .split(/[\s_]+/) // split by spaces or underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
