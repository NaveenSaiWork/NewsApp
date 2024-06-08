import { create } from "zustand";

const useCountStore = create((set) => ({
  userStore: {
    // client_id: "-",
    client_email: "-",
    client_first_name: "-",
    client_image_link: "/static/image/clients/2.png",
    client_last_name: "-",
    client_mobile_number: "-",
  },

  setUserStore: (userStoreInfo) =>
    set((state) => ({ userStore: userStoreInfo })),
}));

export default useCountStore;
