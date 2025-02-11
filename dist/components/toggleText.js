"use strict";
(() => {
  // src/components/toggleText.ts
  var ToggleText = class {
    constructor(buttonId, textId) {
      this.button = document.getElementById(buttonId);
      this.text = document.getElementById(textId);
      console.log(`Initial text visibility: ${this.text.style.display}`);
      this.button.addEventListener("click", this.toggleTextVisibility.bind(this));
    }
    toggleTextVisibility() {
      if (this.text.style.display === "none") {
        this.text.style.display = "block";
        console.log("Text is now visible");
      } else {
        this.text.style.display = "none";
        console.log("Text is now hidden");
      }
      console.log(`Current text visibility: ${this.text.style.display}`);
    }
  };
})();
//# sourceMappingURL=toggleText.js.map
