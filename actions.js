var memory_array = [];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

function newBoard() {
  tiles_flipped = 0; //nilai kartu sama
  memory_array = [];
  let kamus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let arrTemp = kamus.split("");// membuat array random dari A-Z dan 1-9
  arrTemp.sort(function () {return 0.5 - Math.random();});
  for (var i = 0; i < 8; i++) { //hanya 6
    memory_array.push(arrTemp[i], arrTemp[i]);
  }
  memory_array.sort(function () {return 0.5 - Math.random();});
  var output = '';
  for (var i = 0; i < memory_array.length; i++) {
    output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
}


function pushCard(tile, value) {
  memory_values.push(value);
  memory_tile_ids.push(tile.id);
}



function clearArray() {
  // tiles_flipped += 2;
  // Clear kedua arrays
  memory_values = [];
  memory_tile_ids = [];
}

function isGameOver() {
  // Cek apakah udah menang
  return tiles_flipped == memory_array.length;
}

function gameIsOver() {
  alert("Selamat Anda Menang...permainan baru akan ditampilkan");
  document.getElementById('memory_board').innerHTML = "";
  newBoard();
}

function cardsDoNotMatch() {
  setTimeout(flipCardBack, 700);
}

function flipCard(tile, value) {
  tile.style.background = '#FFF';
  tile.innerHTML = value;
}

function flipCardBack() {
  var tile_1 = document.getElementById(memory_tile_ids[0]);
  var tile_2 = document.getElementById(memory_tile_ids[1]);

  tile_1.style.backgroundImage = 'url(mycard.png)';
  tile_1.innerHTML = "";
  tile_2.style.background = 'url(mycard.png)';
  tile_2.innerHTML = "";
  // Clear 
  clearArray();
  // memory_values = [];
  // memory_tile_ids = [];
}

function memoryFlipTile(tile, value) {
  if (tile.innerHTML == "" && memory_values.length < 2) { //cek apakah kosong dan lebih kecil 2
    tile.style.background = '#FFF'; //Ubah background Hitam
    tile.innerHTML = value; //isi Value
    if (memory_values.length == 0) { //jika masik kosong
      pushCard(tile, value);
    } else if (memory_values.length == 1) { //jika ada kartu 1 terbuka
      pushCard(tile, value);
      if (memory_values[0] == memory_values[1]) { //jika kartu cocok
        tiles_flipped += 2;
        clearArray();
        if (tiles_flipped == memory_array.length) {
          gameIsOver();
        }
      } else {
        cardsDoNotMatch();
      }
    }
  }
}

