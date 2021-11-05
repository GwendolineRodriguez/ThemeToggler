import {
  toggler,
  slider,
  round,
  unselectable,
} from "./themeToggler.module.css";

class ThemeToggler extends HTMLElement {
  constructor() {
    super();
    this.darkCSS = document.querySelectorAll(
      "link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"
    );
    this.lightCSS = document.querySelectorAll(
      "link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"
    );
    this.darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkModeOn = this.darkModeMediaQuery.matches;
  }

  connectedCallback() {
    this.render();
    this.init();
  }

  init = () => {
    this.themeToggler = document.getElementById("themeToggler");
    this.updateToggler();
    this.themeToggler.addEventListener("click", this.toggleTheme);
    this.darkModeMediaQuery.addEventListener("change", (e) => {
      this.darkModeOn = e.matches;
      if (this.darkModeOn) {
        this.activateDarkMode();
      } else {
        this.activateLightMode();
      }
      this.updateToggler();
    });
  };

  updateToggler = () => {
    if (this.darkModeOn) {
      this.themeToggler.checked = true;
    } else {
      this.themeToggler.checked = false;
    }
  };

  activateDarkMode = () => {
    this.darkModeOn = true;
    this.lightModeOn = false;
    this.darkCSS.forEach((link) => {
      link.media = "all";
      link.disabled = false;
    });
    this.lightCSS.forEach((link) => {
      link.media = "not all";
      link.disabled = true;
    });
  };

  activateLightMode = () => {
    this.darkModeOn = false;
    this.lightModeOn = true;
    this.lightCSS.forEach((link) => {
      link.media = "all";
      link.disabled = false;
    });
    this.darkCSS.forEach((link) => {
      link.media = "not all";
      link.disabled = true;
    });
  };

  toggleTheme = () => {
    if (this.darkModeOn) {
      this.activateLightMode();
    } else {
      this.activateDarkMode();
    }
  };

  render = () => {
    const html = String.raw;
    this.innerHTML = html`
      <label for="themeToggler" class="${toggler}">
        <input
          tabindex="1"
          id="themeToggler"
          name="themeToggler"
          type="checkbox"
        />
        <span class="${slider} ${round}">
          <p class="${unselectable}">🌙</p>
          <p class="${unselectable}">🌞</p>
        </span>
      </label>
    `;
  };
}

customElements.define("theme-toggler", ThemeToggler);
