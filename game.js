/**
 * Represents the levels and narrative of the game based on Hamlet's story.
 * @typedef {Object} Level
 * @property {string} id - The unique identifier for the level.
 * @property {string} title - The title of the level.
 * @property {string} message - The narrative message for the level.
 * @property {string} background - The path to the background image for the level.
 * @property {Array} buttons - An array of buttons representing player choices.
 */

/**
 * @type {Array<Level>} levels - An array containing the levels and their details.
 */
const levels = [
  {
    id: "welcome-page",
    title: "Hamlet's Adventure",
    message:
      "Welcome, intrepid traveler, to 'Hamlet's Adventure.' Embark on a journey deeply woven with the threads of Shakespearean mastery. To fully savor this narrative, it is advised that you tread the pages of Shakespeare's timeless masterpiece, 'Hamlet.' Thus, as a discerning reader, you shall find greater immersion in the shadowed corridors of Elsinore Castle, amidst characters both wistful and dark, and amidst choices, the consequences of which may mirror the fate of the Prince of Denmark. Click 'Play' to begin your journey.",
    background: "Images/111.png",
    buttons: [
      {
        text: "Play",
        action: () => startLevel(1),
      },
    ],
  },
  {
    id: "level1",
    title: "Hamlet's Adventure - Level 1",
    message:
      "You find yourself standing within the moonlit courtyard of the imposing Elsinore Castle, its ancient stones echoing the whispers of history. Suddenly, a spectral figure materializes before your eyes. It is the apparition of King Hamlet, your father, draped in an ethereal shroud. His presence exudes an air of solemnity and longing, as if he carries the weight of unresolved mysteries. In this haunting moment, you are presented with a profound choice that may forever alter the course of your destiny. Will you gather your courage and step closer to the wraith-like King, braving the unknown in pursuit of truths that may reshape your life, or will you be seized by hesitation, your heart pounding in the face of the supernatural, choosing to linger in the realm of uncertainty?",
    background: "Images/theKing.png",
    buttons: [
      {
        text: "Approach the ghost",
        action: () => startLevel(2),
      },
      {
        text: "Hesitate",
        background: "Images/1.png",
        action: () =>
          endGame(
            "Ending 2: Ophelia's Solitude\nIn your fateful moment of hesitation, Ophelia, the delicate flower of Elsinore, finds herself caught in the currents of your uncertainty. As you stand frozen, the story unfolds, and Ophelia's life takes a turn marked by solitude and heartache. Your indecision casts a shadow over her world, leaving her to navigate the turbulent waters of her own destiny, without the solace of your guidance. The echoes of your inaction resonate in her melancholic songs and tearful soliloquies. While you may have spared her from immediate tragedy, the tragedy of your absence lingers like an unresolved chord, forever haunting the chambers of Elsinore..."
          ),
      },
    ],
  },
  {
    id: "level2",
    title: "Hamlet's Adventure - Level 2",
    message:
      "In the dimly lit courtyard of Elsinore Castle, King Hamlet's ghost appears and reveals the secret of the Dagger hidden within a locked chamber. To wield its power, you must embark on a quest to find the hidden key within the castle's depths. Your journey for vengeance continues...",
    background: "Images/keyRoom.png",
    buttons: [],
  },
  {
    id: "level3",
    title: "Hamlet's Adventure - Level 3",
    message:
      "With the key securely in your grasp, you enter a dimly lit chamber. Here, the mystery deepens as you must now search for the glimmering ornate dagger, potentially the very weapon used in the murder. The key is your ticket to uncovering the dagger's secret...",
    background: "Images/chamber.png",
    buttons: [],
  },
  {
    id: "level4",
    title: "Hamlet's Adventure - Level 4",
    message:
      "In the moonlit courtyard just beyond Elsinore Castle's walls, the ornate dagger rests in your hand – a key to the mysteries that linger within. Potentially the very weapon used in the infamous murder, the artifact whispers its secrets.Facing a pivotal moment, choices await as you decide the fate of this mysterious dagger. The courtyard, bathed in moonlight, is a stage for your decision, and its echoes will resonate through Elsinore's corridors. What will you do with this enigmatic artifact that holds the key to the unfolding tale? The next chapter of your journey awaits in the shadows.",
    background: "Images/113.png",
    buttons: [
      {
        text: "Engage Polonius",
        action: () => engagePolonius(),
      },
      {
        text: "Continue with the Revenge Plot",
        action: () => startLevel(5),
      },
    ],
  },
  {
    id: "level5",
    title: "Hamlet's Adventure - Level 5",
    message:
      "The tapestry of fate is woven before Hamlet, presenting a choice as profound as the deepening shadows of Elsinore Castle. The weight of destiny hangs heavy, and it is in this moment that the world trembles with anticipation. What path will you choose, and what echoes shall your decision etch in the annals of Elsinore's history? The climax awaits your command...",
    background: "Images/77.png",
    buttons: [
      {
        text: "Pursue Revenge",
        action: () =>
          endGame(
            "Ending 4: Tragic Pursuit\nIn the chambers of Elsinore Castle, I, Hamlet, stand at the crossroads of destiny. The burning desire for vengeance consumes me, and I, unwavering, choose to embark on this perilous journey. As I tread this treacherous road, the very air within the castle grows heavy with foreboding. Each step I take echoes with the weight of the past, the sorrow of a kingdom, and the dark omens that encircle me. The inexorable forces of tragedy and revenge draw closer, converging upon my existence. Elsinore, my home, becomes the stage for the unfolding drama—a tale of unyielding determination and its profound consequences. In this relentless pursuit, I find myself caught in the intricate web of fate, unable to escape the inescapable, as the echoes of my sorrowful journey reverberate through time..."
          ),
      },
      {
        text: "Trust King Claudius and Laertes",
        action: () =>
          endGame(
            "Ending 5: Fateful Trust\nAmidst the shadows and doubts, in my most vulnerable hour, I pondered a profound question: To be or not to be... With a heart heavy with uncertainty, I extended my trust to King Claudius and Laertes, and each decision I made wove a destiny that would unfold much like the intricate threads of my own existence..."
          ),
      },
    ],
  },
];
/**
 * @type {PlayerInventory} playerInventory - An array representing the player's inventory.
 */
let playerInventory = JSON.parse(localStorage.getItem("playerInventory")) || [];
/**
 * Saves a value to the Local Storage.
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to be stored.
 */
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Represents the current level the player is on.
 * @type {number}
 */
let currentLevel = parseInt(localStorage.getItem("currentLevel")) || 0;
// Check if playerInventory is not empty (i.e., it's not a new game)
if (playerInventory.length > 0) {
  // Player has items in the inventory, so set the appropriate level to resume
  startLevel(currentLevel);
} else {
  // Player is starting a new game, so begin from the first level

  startLevel(0);
}
/**
 * Starts a new level or resumes the game from the saved level.
 * @param {number} levelIndex - The index of the level to start.
 */
console.log(playerInventory);
function startLevel(levelIndex) {
  if (levelIndex === 0) {
    currentLevel = 0;
    playerInventory = [];
    localStorage.removeItem("currentLevel");
    localStorage.removeItem("playerInventory");
  } else {
    // Player is continuing the game, update currentLevel
    currentLevel = levelIndex;
  }

  const level = levels[levelIndex];
  const levelTitle = document.getElementById("level-title");
  const messageElement = document.getElementById("message");
  const backgroundElement = document.getElementById("background-image");
  const buttonsElement = document.getElementById("buttons");
  const inventoryElement = document.getElementById("inventory");
  const keyPhotoElement = document.getElementById("key-photo");
  const daggerPhotoElement = document.getElementById("dagger-photo");
  messageElement.classList.remove("fade-in-effect"); // Remove the class initially
  // Add a small delay before reapplying the class to trigger the fade-in effect

  if (levelIndex === 0 && level.buttons.length > 1) {
    const hesitateButton = document.createElement("button");
    hesitateButton.textContent = "Hesitate";
    hesitateButton.addEventListener("click", function () {
      messageElement.classList.add("fade-in-effect");
      // Change the background image when the "Hesitate" button is clicked
      backgroundElement.style.backgroundImage = 'url("1.png")';

      // Continue with the existing button click action
      level.buttons[1].action();
    });
    buttonsElement.appendChild(hesitateButton);
  }

  console.log("Changing background...");
  backgroundElement.style.backgroundImage = 'url("16.png")';
  levelTitle.textContent = level.title;
  messageElement.textContent = level.message;
  backgroundElement.style.backgroundImage = `url(${level.background})`;
  backgroundElement.style.backgroundSize = "cover";
  backgroundElement.style.backgroundPosition = "center";
  backgroundElement.style.backgroundRepeat = "no-repeat";
  buttonsElement.innerHTML = "";

  const hasFoundKey = playerInventory.includes("key");
  const hasFoundDagger = playerInventory.includes("dagger");

  if (levelIndex === 2 && !hasFoundKey) {
    inventoryElement.style.display = "block";
    messageElement.classList.add("fade-in-effect");

    const keyPosition = {
      top: Math.floor(Math.random() * 70) + 10 + "%",
      left: Math.floor(Math.random() * 70) + 10 + "%",
    };

    keyPhotoElement.style.position = "absolute";
    keyPhotoElement.style.top = keyPosition.top;
    keyPhotoElement.style.left = keyPosition.left;

    keyPhotoElement.style.display = "block";

    keyPhotoElement.addEventListener("click", function () {
      keyPhotoElement.classList.add("zoom-in");

      messageElement.textContent = "Congratulations! You found the key!";

      // Wait for the transition to complete before hiding the key photo
      setTimeout(() => {
        keyPhotoElement.style.display = "none";
        const keyButton = document.createElement("button");
        keyButton.textContent = "Proceed to the secret chamber";
        keyButton.addEventListener("click", () => {
          playerInventory.push("key");
          saveToLocalStorage("playerInventory", playerInventory);
          console.log(playerInventory);
          keyPhotoElement.style.display = "none";
          // save the key to playerInventory
          startLevel(3);
        });
        buttonsElement.appendChild(keyButton);
      }, 500);
    });
    messageElement.classList.add("fade-in-effect");
    messageElement.addEventListener("animationend", function () {
      messageElement.classList.remove("fade-in-effect");
    });
  } else if (levelIndex === 3 && !hasFoundDagger) {
    inventoryElement.style.display = "block";

    const daggerPosition = {
      top: Math.floor(Math.random() * 70) + 10 + "%",
      left: Math.floor(Math.random() * 70) + 10 + "%",
    };

    daggerPhotoElement.style.position = "absolute";
    daggerPhotoElement.style.top = daggerPosition.top;
    daggerPhotoElement.style.left = daggerPosition.left;

    daggerPhotoElement.style.display = "block";

    daggerPhotoElement.addEventListener("click", function () {
      messageElement.classList.add("fade-in-effect");
      messageElement.textContent =
        "Congratulations! You found the dagger! Pick it up and proceed.";

      // Apply the zoom-in effect to the dagger photo
      daggerPhotoElement.classList.add("zoom-in");

      // Wait for the transition to complete before hiding the dagger photo
      setTimeout(() => {
        daggerPhotoElement.style.display = "none";

        // Create the button to pick up the dagger
        const daggerButton = document.createElement("button");
        daggerButton.textContent = "Pick up the Dagger and proceed";
        daggerButton.addEventListener("click", () => {
          playerInventory.push("dagger");
          saveToLocalStorage("playerInventory", playerInventory);
          console.log(playerInventory);
          startLevel(4);
        });

        buttonsElement.appendChild(daggerButton);
      }, 500);
    });
  } else {
    inventoryElement.style.display = "none";
    keyPhotoElement.style.display = "none";
    daggerPhotoElement.style.display = "none";
  }

  level.buttons.forEach((button, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = button.text;

    if (levelIndex === 2 && !hasFoundKey) {
      buttonElement.disabled = true;
    }

    buttonElement.addEventListener("click", button.action);
    buttonsElement.appendChild(buttonElement);
  });

  currentLevel = levelIndex;
}
/**
 * Ends the game and displays an ending message.
 * @param {string} endingText - The text describing the ending of the game.
 */
function endGame(endingText) {
  const levelTitle = document.getElementById("level-title");
  const messageElement = document.getElementById("message");
  const buttonsElement = document.getElementById("buttons");
  const backgroundElement = document.getElementById("background-image");

  const lowerCaseEndingText = endingText.toLowerCase();
  localStorage.removeItem("playerInventory");

  switch (currentLevel) {
    case 1:
      if (lowerCaseEndingText.includes("ending 2")) {
        backgroundElement.style.backgroundImage = 'url("Images/20.png")';
      } else {
        backgroundElement.style.backgroundImage = 'url("Images/2.png")';
      }
      break;

    case 4:
      if (lowerCaseEndingText.includes("ending 6")) {
        backgroundElement.style.backgroundImage =
          'url("Images/PoliticalEnding.png")';
      } else {
        backgroundElement.style.backgroundImage = 'url("Images/4444.png")';
      }
      break;

    case 5:
      if (lowerCaseEndingText.includes("ending 4")) {
        backgroundElement.style.backgroundImage = 'url("Images/22.png")';
      } else if (lowerCaseEndingText.includes("ending 5")) {
        backgroundElement.style.backgroundImage =
          'url("Images/loyalEnding.png")';
      } else {
        backgroundElement.style.backgroundImage = 'url("Images/77.png")'; // Replace with your default background for Level 5
      }
      break;

    default:
      backgroundElement.style.backgroundImage = 'url("Images/111.png")'; // Replace with your default background for other levels
      break;
  }
  levelTitle.textContent = "Hamlet's Adventure - Tragic Ending";
  messageElement.textContent = endingText;
  buttonsElement.innerHTML = "";
  localStorage.removeItem("playerInventory");
  saveToLocalStorage("currentLevel", currentLevel);
}
/**
 * Engages Polonius in the game and presents player choices.
 */
function engagePolonius() {
  const levelTitle = document.getElementById("level-title");
  const messageElement = document.getElementById("message");
  const buttonsElement = document.getElementById("buttons");
  const backgroundElement = document.getElementById("background-image"); // Add this line

  levelTitle.textContent = "Hamlet's Adventure - Level 4 - Polonius' Advice";
  messageElement.textContent =
    "My gracious lord, entertain the notion of a different avenue, a journey into political intrigue. Perhaps in its shadow, Elsinore's destiny may yet unfurl differently...";

  backgroundElement.style.backgroundImage = 'url("Images/level4-1.png")';

  const acceptRecommendationButton = document.createElement("button");
  acceptRecommendationButton.textContent = "Accept Polonius's Recommendation";
  acceptRecommendationButton.addEventListener("click", () => {
    backgroundElement.style.backgroundImage = 'url("Images/7.png")';

    endGame(
      "Ending 6: Political Maneuver\nIn this fateful moment, you heed Polonius's counsel and choose a path of political intrigue over hasty revenge. As you delve into the convoluted world of court politics, your decisions trigger a chain of events that will significantly alter the course of Elsinore's destiny. Plots and schemes unfold, alliances are made and broken, and your influence over the kingdom's future deepens. You are now at the heart of the intricate web of power struggles, and your choices will determine Elsinore's fate, ultimately leading to a unique ending that reflects the complexity of your political maneuvering..."
    );
  });

  const rejectRecommendationButton = document.createElement("button");
  rejectRecommendationButton.textContent = "Continue with the Revenge Plot";
  rejectRecommendationButton.addEventListener("click", () => startLevel(5));

  buttonsElement.innerHTML = "";
  buttonsElement.appendChild(acceptRecommendationButton);
  buttonsElement.appendChild(rejectRecommendationButton);
}
/**
 * Clears the player's inventory in Local Storage.
 */
function clearPlayerInventory() {
  localStorage.removeItem("playerInventory");
}
/**
 * Logs a message indicating that the key has been found.
 */
// function findKey() {
//   console.log("Key found!");
//   console.log(playerInventory);
// }
/**
 * Logs a message indicating that the dagger has been found.
 */
function findDagger() {
  console.log("Dagger found!");
}
startLevel(0);
