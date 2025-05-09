/****************************************************
 * 1) Regrouper les prévisions par jour
 ****************************************************/
function regrouperParJour(forecastList) {
  const joursMap = {};

  forecastList.forEach(item => {
    const dateObj = new Date(item.dt * 1000);

    // Par exemple : jour abrégé “jeu. 06/04”
    const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
    // ex. “jeu. 06/04/2025”
    const jourLabel = dateObj.toLocaleDateString('fr-FR', options);

    if (!joursMap[jourLabel]) {
      joursMap[jourLabel] = [];
    }
    joursMap[jourLabel].push(item);
  });

  // Transforme l'objet en tableau
  // => [{ day: "jeu. 06/04/2025", data: [...] }, ... ]
  return Object.entries(joursMap).map(([day, data]) => ({ day, data }));
}

/****************************************************
 * 2) Déterminer si un créneau est “idéal”
 ****************************************************/
function isCreneauIdeal(item) {
  const meteo = item.weather?.[0]?.main || "";
  const pop = item.pop || 0;  // prob. de pluie
  const temp = item.main.temp;
  // Ex: pas de pluie, < 20% et temp > 10°C
  return meteo !== "Rain" && pop < 0.2 && temp > 10;
}

/****************************************************
 * 3) Trouver le premier créneau idéal dans un tableau
 ****************************************************/
function trouverPremierCreneauIdeal(items) {
  // Filtrer les créneaux possibles
  const creneauxIdeaux = items.filter(isCreneauIdeal);
  if (creneauxIdeaux.length === 0) {
    return null; // aucun
  }
  // On prend le premier chronologiquement
  return creneauxIdeaux[0];
}

/****************************************************
 * 4) Générer la carte de prévision
 ****************************************************/
function genererCartePrevision(item) {
  const date = new Date(item.dt * 1000);
  const hour = date.getHours();
  const temp = Math.round(item.main.temp);
  const desc = item.weather[0].description || "";
  const humidity = item.main.humidity || 0;
  const pop = Math.round((item.pop || 0) * 100); // en %

  // Icône rapide
  let icon = "⛅";
  const main = item.weather[0].main.toLowerCase();
  if (main.includes("rain")) icon = "🌧️";
  else if (main.includes("cloud")) icon = "☁️";
  else if (main.includes("clear")) icon = "☀️";
  else if (main.includes("snow")) icon = "❄️";

  return `
    <div class="forecast-card">
      <div>${hour}h</div>
      <div>${icon}</div>
      <div>${temp}°C</div>
      <div>${desc}</div>
      <div>Humidité : ${humidity}%</div>
      <div>Pluie : ${pop}%</div>
    </div>
  `;
}

/****************************************************
 * 5) Charger et afficher la météo
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const recommendationEl = document.getElementById("recommendation");
  const currentTempEl = document.getElementById("currentTemp");
  const currentDescEl = document.getElementById("currentDesc");
  const currentWeatherIconEl = document.getElementById("currentWeatherIcon");
  const refreshBtn = document.getElementById("refreshBtn");

  const tabsContainer = document.getElementById("tabsContainer");
  const tabsContentContainer = document.getElementById("tabsContentContainer");

  // Fonction pour mettre à jour la phrase “Idéal le...”
  // selon le créneau qu’on lui passe (ou null).
  function afficherRecommandationPourLeJour(premierCreneau) {
    if (!premierCreneau) {
      recommendationEl.textContent = "😕 Aucun créneau idéal pour ce jour.";
      return;
    }
    const d = new Date(premierCreneau.dt * 1000);
    recommendationEl.textContent = `🧼 Idéal le ${d.toLocaleDateString('fr-FR')} à ${d.getHours()}h`;
  }

  function chargerMeteo() {
    // fetchWeatherData provient de votre weather.js
    fetchWeatherData((data) => {
      if (!data) {
        recommendationEl.textContent = "Erreur : Impossible de récupérer la météo.";
        return;
      }

      // 1) Météo actuelle (premier item)
      const currentItem = data.list[0];
      let icon = "⛅";
      const currentMain = currentItem.weather[0].main.toLowerCase();
      if (currentMain.includes("rain")) icon = "🌧️";
      else if (currentMain.includes("cloud")) icon = "☁️";
      else if (currentMain.includes("clear")) icon = "☀️";
      else if (currentMain.includes("snow")) icon = "❄️";

      currentWeatherIconEl.textContent = icon;
      currentTempEl.textContent = Math.round(currentItem.main.temp) + "°C";
      currentDescEl.textContent = currentItem.weather[0].description;

      // 2) Regrouper par jour
      const grouped = regrouperParJour(data.list);

      // 3) Pour chaque jour, trouver le premier créneau idéal
      //    et stocker cette info dans un nouvel objet
      //    ex: { day: "jeu. 06/04/2025", data: [...], premierCreneauIdeal: {...} }
      const daysData = grouped.map(dayObj => {
        const premier = trouverPremierCreneauIdeal(dayObj.data);
        return {
          dayLabel: dayObj.day,     // ex: “jeu. 06/04/2025”
          data: dayObj.data,        // tableau complet des créneaux
          premierCreneauIdeal: premier // ou null
        };
      });

      // Vider les onglets existants
      tabsContainer.innerHTML = "";
      tabsContentContainer.innerHTML = "";

      // 4) Créer onglets
      daysData.forEach((jourObj, index) => {
        // Bouton d’onglet
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.textContent = jourObj.dayLabel; // ex: “jeu. 06/04/2025”
        tabButton.dataset.index = index;

        // Contenu
        const tabContent = document.createElement("div");
        tabContent.classList.add("tab-content");

        // Générer les cartes
        let cardsHTML = "";
        jourObj.data.forEach(item => {
          cardsHTML += genererCartePrevision(item);
        });
        tabContent.innerHTML = cardsHTML;

        // Ajouter dans le DOM
        tabsContainer.appendChild(tabButton);
        tabsContentContainer.appendChild(tabContent);

        // Gérer le clic pour activer l’onglet et mettre à jour la recommandation
        tabButton.addEventListener("click", () => {
          // Désactiver tous les onglets
          document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach(div => div.classList.remove("active"));

          // Activer celui cliqué
          tabButton.classList.add("active");
          tabContent.classList.add("active");

          // Mettre à jour la phrase “Idéal le…”
          afficherRecommandationPourLeJour(jourObj.premierCreneauIdeal);
        });
      });

      // 5) Activer par défaut le premier onglet s’il existe
      const firstTabBtn = tabsContainer.querySelector(".tab-button");
      const firstTabContent = tabsContentContainer.querySelector(".tab-content");
      if (firstTabBtn && firstTabContent) {
        firstTabBtn.classList.add("active");
        firstTabContent.classList.add("active");
        // Mettre la recommandation pour ce 1er jour
        afficherRecommandationPourLeJour(daysData[0].premierCreneauIdeal);
      } else {
        // S'il n’y a pas d’onglets, on affiche un message global
        recommendationEl.textContent = "Aucune donnée pour les prochains jours.";
      }
    });
  }

  // Bouton “Rafraîchir”
  refreshBtn.addEventListener("click", () => {
    chargerMeteo();
  });

  // Au chargement
  chargerMeteo();
});
