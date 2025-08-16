document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const fontFamily = "--font-family";
  const robotoBold = getComputedStyle(html).getPropertyValue(fontFamily).trim();
  const body = document.body;

  body.style.fontFamily = robotoBold;

  const styleData = {
    userSelect: "none",
    cursor: "default",
    pointerEvents: "none",
  };

  const bgImgContainer = document.getElementById("backgroundImgContainerId");
  const bgImg = document.getElementById("backgroundImgId");

  const timeTxt = document.getElementById("timeTxtId");
  const dateTxt = document.getElementById("dateTxtId");

  const donateLinkImg = document.getElementById("donateLinkImgId");

  const twitchEmbedContainer = document.getElementById(
    "twitchEmbedContainerId"
  );

  function bgImgAllToken() {
    const bgImgArray = [bgImgContainer, bgImg];
    const eventArray = ["copy", "keydown", "dragstart", "select"];

    bgImgArray.forEach((element) => {
      eventArray.forEach((event) => {
        element.addEventListener(event, (e) => {
          e.preventDefault();
        });
      });
      Object.assign(element.style, styleData);
    });
  }
  bgImgAllToken();

  function dateToken() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).padStart(4, "0");

    const timeText = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    const dateText = `${day}.${month}.${year}`;

    timeTxt.textContent = timeText;
    dateTxt.textContent = dateText;
  }
  setInterval(dateToken, 1);

  function donateLinkImgToken() {
    const eventArray = ["copy", "keydown", "dragstart", "select"];

    eventArray.forEach((event) => {
      donateLinkImg.addEventListener(event, (e) => {
        e.preventDefault();
      });
    });

    Object.assign(donateLinkImg.style, styleData);
  }
  donateLinkImgToken();

  function twitchEmbedToken() {
    const domain = window.location.hostname;

    const io = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;

      const script = document.createElement("script");
      script.src = "https://embed.twitch.tv/embed/v1.js";
      twitchEmbedContainer.appendChild(script);

      obs.unobserve(twitchEmbedContainer);

      script.addEventListener("load", () => {
        const embed = new Twitch.Embed("twitchEmbedContainerId", {
          width: 1920,
          height: 1080,
          channel: "shiml_der_gamer47",
          theme: "dark",
          allowfullscreen: true,
          frameborder: 0,
          scrolling: "no",
          allow: "autoplay; fullscreen",
          autoplay: true,
          layout: "video",
          parent: [domain],
        });

        embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          const player = embed.getPlayer();
          player.setVolume(1);
          player.setMuted(true);
          player.setQuality("chunked");
        });

        const iframe = document.querySelector("iframe");

        if (iframe) {
          iframe.classList.add("twitch-embed");
          iframe.style.fontFamily = robotoBold;
          iframe.style.userSelect = "none";
        }
      });
    });

    io.observe(twitchEmbedContainer, { threshold: 0.1 });
  }
  twitchEmbedToken();

  function checkDevice() {
    const allChildren = [...document.body.children];
    const warningId = "mobile-warning";

    if (window.innerWidth < 1024) {
      // Warnung einfügen wenn nicht vorhanden
      if (!document.getElementById(warningId)) {
        const warningDiv = document.createElement("div");
        warningDiv.id = warningId;
        warningDiv.textContent =
          "❌ Dieses Overlay ist nur für Desktop-PCs ausgelegt!";
        document.body.appendChild(warningDiv);
      }
      // Alles außer der Warnung verstecken
      allChildren.forEach((el) => {
        if (el.id !== warningId) el.style.display = "none";
      });
    } else {
      // Warnung entfernen wenn vorhanden
      const warningEl = document.getElementById(warningId);
      if (warningEl) warningEl.remove();

      // Alles wieder sichtbar machen
      allChildren.forEach((el) => {
        el.style.display = "";
      });
    }
  }

  checkDevice(); // Direkt beim Laden prüfen
  window.addEventListener("resize", checkDevice); // Beim Resize prüfen
});
