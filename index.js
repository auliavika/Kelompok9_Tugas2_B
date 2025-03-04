const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DATA_FILE = "games.json";

// Default game data
const defaultGames = [
    { name: "The Witcher 3", developer: "CD Projekt Red", year: 2015, platform: ["PC", "PS4", "Xbox One"] },
    { name: "Red Dead Redemption 2", developer: "Rockstar Games", year: 2018, platform: ["PC", "PS4", "Xbox One"] },
    { name: "The Legend of Zelda: Breath of the Wild", developer: "Nintendo", year: 2017, platform: ["Nintendo Switch"] }
];

// Load game data
function loadGames() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (err) {
        saveGames(defaultGames);
        return defaultGames;
    }
}

// Save game data
function saveGames(games) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(games, null, 2), "utf8");
}

// Show game list
function showGames() {
    const games = loadGames();
    console.log("\n=== Daftar Game Open-World ===");
    games.forEach((game, index) => {
        console.log(`${index + 1}. ${game.name} - ${game.developer} (${game.year})`);
    });
    console.log("\n");
    setTimeout(mainMenu, 1000);
}

// Main menu
function mainMenu() {
    console.log("\n=== Database Game Open-World ===");
    console.log("1. Lihat daftar game");
    console.log("3. Keluar");

    rl.question("\nMasukkan nomor: ", (answer) => {
        switch (answer.trim()) {
            case "1":
                showGames();
                break;
            case "2":
                console.log("\nTerima kasih telah menggunakan database game!");
                rl.close();
                break;
            default:
                console.log("\nPilihan tidak valid.");
                setTimeout(mainMenu, 1000);
                break;
        }
    });
}

mainMenu();
