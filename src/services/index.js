import StorageApp from "../../utils/storage";

const getToken = async () => {
  console.log("GET_TOKEN");
  try {
    const value = await StorageApp.getValue("user");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("ERROR: getToken :: -> ", e);
  }
};

export const authHeader = async () => {
  const token = await getToken();
  if (token && token.access_token) {
    return { Authorization: "Bearer " + token.access_token };
  } else {
    return {};
  }
};
