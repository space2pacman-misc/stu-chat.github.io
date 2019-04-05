var authorization = document.querySelector(".authorization");
var room = document.querySelector(".room");
var connect = document.querySelector(".connect");
var chat = document.querySelector(".chat");
var messages = document.querySelector(".messages");
var text = document.querySelector(".text");
var send = document.querySelector(".send");
var nicks = [
"Сталин", 
"Ленин", 
"Брежнев", 
"Гагарин", 
"Хрущев", 
"Маленков", 
"Андропов", 
"Черненко", 
"Горбачев", 
"Королев", 
"Молотов", 
"Калашников", 
"Берия",
"Каганович",
"Гайдай",
"Рязанов",
"Боярский",
"Высоцкий",
"Гурченко",
"Терешкова",
"Никулин",
"Джигарханян",
"Раневская",
"Зыкина",
"Магомаев",
"Кобзон",
"Туполев",
"Мосин"
];
var resolution = false;
var server;
var nick;

function sendMessage() {
	if(text.value == "") return;
	// resolution меняется на true когда приходит ответ от сервера в событии ping
	if(resolution) {
		server.send(nick + ": " + text.value);
		text.value = "";
	}
}

function getNick() {
	return nicks[Math.floor(Math.random()*nicks.length)];
}

function createServer() {
	server = new Bugout(window.location.hash);
	server.on("message", function(address, message) {
		if(address != this.address()) {
			messages.innerHTML += "<div class='row clearfix'><div class='message message--left'>" + message + "</div></div>";
		} else {
			messages.innerHTML += "<div class='row clearfix'><div class='message message--right'>" + message + "</div></div>";
		}
	});
	server.once("ping", () => { resolution = true; });
}

function connection() {
	window.location.hash = room.value;
	checkAddress();
}

function checkAddress() {
	if(window.location.hash) {
		chat.style.display = "block";
		authorization.style.display = "none";
		createServer();
	} else {
		authorization.style.display = "block";
		chat.style.display = "none";
	}
}

function init() {
	checkAddress();
	nick = getNick();
	connect.addEventListener("click", connection)
	room.addEventListener("keydown", e => e.keyCode == 13 && connection());
	send.addEventListener("click", sendMessage);
	text.addEventListener("keydown", e => e.keyCode == 13 && sendMessage());
}

init();