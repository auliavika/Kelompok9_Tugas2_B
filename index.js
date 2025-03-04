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

// Add a new game
function addGame() {
    rl.question("\nMasukkan nama game: ", (name) => {
        rl.question("Masukkan developer: ", (developer) => {
            rl.question("Masukkan tahun rilis: ", (year) => {
                rl.question("Masukkan platform (pisahkan dengan koma): ", (platform) => {
                    const games = loadGames();
                    games.push({
                        name,
                        developer,
                        year: parseInt(year),
                        platform: platform.split(",").map(p => p.trim())
                    });
                    saveGames(games);
                    console.log("\nGame berhasil ditambahkan!");
                    setTimeout(mainMenu, 1000);
                });
            });
        });
    });
}

// Show game list
function showGames() {
    const games = loadGames();
    console.log("\n=== Daftar Game Open-World ===");
    games.forEach((game, index) => {
        console.log(`${index + 1}. ${game.name} - ${game.developer} (${game.year})`);
    });
    setTimeout(mainMenu, 1000);
}

// Show game details
function showGameDetail() {
    const games = loadGames();
    
    if (games.length === 0) {
        console.log("\nTidak ada game dalam database.");
        setTimeout(mainMenu, 1000);
        return;
    }

    // Tampilkan daftar game terlebih dahulu
    console.log("\n=== Daftar Game Open-World ===");
    games.forEach((game, index) => {
        console.log(`${index + 1}. ${game.name} - ${game.developer} (${game.year})`);
    });

    rl.question("\nMasukkan nomor game yang ingin dilihat: ", (index) => {
        const gameIndex = parseInt(index) - 1;
        const game = games[gameIndex];

        if (game) {
            console.log("\n=== Detail Game ===");
            console.log(`Nama: ${game.name}`);
            console.log(`Developer: ${game.developer}`);
            console.log(`Tahun Rilis: ${game.year}`);
            console.log(`Platform: ${game.platform.join(", ")}`);
        } else {
            console.log("\nGame tidak ditemukan!");
        }
        setTimeout(mainMenu, 1000);
    });
}

// Delete a game
function deleteGame() {
    const games = loadGames();
    // Tampilkan daftar game terlebih dahulu
    console.log("\n=== Daftar Game Open-World ===");
    games.forEach((game, index) => {
        console.log(`${index + 1}. ${game.name} - ${game.developer} (${game.year})`);
    });
    
    rl.question("\nMasukkan nomor game yang ingin dihapus: ", (index) => {
        const gameIndex = parseInt(index) - 1;

        if (gameIndex >= 0 && gameIndex < games.length) {
            const deletedGame = games.splice(gameIndex, 1);
            saveGames(games);
            console.log(`\nGame '${deletedGame[0].name}' berhasil dihapus!`);
        } else {
            console.log("\nGame tidak ditemukan!");
        }
        setTimeout(mainMenu, 1000);
    });
}

// Update a game
function updateGame() {
    const games = loadGames();
    
    // Tampilkan daftar game terlebih dahulu
    console.log("\n=== Daftar Game Open-World ===");
    games.forEach((game, index) => {
        console.log(`${index + 1}. ${game.name} - ${game.developer} (${game.year})`);
    });

    rl.question("\nMasukkan nomor game yang ingin diperbarui: ", (index) => {
        const gameIndex = parseInt(index) - 1;

        if (gameIndex >= 0 && gameIndex < games.length) {
            rl.question("Masukkan nama game baru: ", (name) => {
                rl.question("Masukkan developer baru: ", (developer) => {
                    rl.question("Masukkan tahun rilis baru: ", (year) => {
                        rl.question("Masukkan platform baru (pisahkan dengan koma): ", (platform) => {
                            games[gameIndex] = {
                                name,
                                developer,
                                year: parseInt(year),
                                platform: platform.split(",").map(p => p.trim())
                            };
                            saveGames(games);
                            console.log("\nGame berhasil diperbarui!");
                            setTimeout(mainMenu, 1000);
                        });
                    });
                });
            });
        } else {
            console.log("\nGame tidak ditemukan!");
            setTimeout(mainMenu, 1000);
        }
    });
}

// Main menu
function mainMenu() {
    console.log("\n=== Database Game Open-World ===");
    console.log("1. Lihat daftar game");
    console.log("2. Tambah game");
    console.log("3. Lihat detail game");
    console.log("4. Perbarui game");
    console.log("5. Hapus game");
    console.log("6. Keluar");

    rl.question("\nMasukkan nomor: ", (answer) => {
        switch (answer.trim()) {
            case "1":
                showGames();
                break;
            case "2":
                addGame();
                break;
            case "3":
                showGameDetail();
                break;
            case "4":
                updateGame();
                break;
            case "5":
                deleteGame();
                break;
            case "6":
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