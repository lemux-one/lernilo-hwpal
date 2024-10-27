import { isBrowser } from "@/common/utils";

if (isBrowser()) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Client updated and ready!");
  });
}
