#include <HTTPClient.h>

/*

   Acesso na UTFPR
   - Configurar o ipv4 no notebook gereando um host
   - ipv4: 192.168.137.1
   - Tocar SSID
   - Tocar passwor
   - Trocar LINK servidor

*/

/*
    CONFIGURAÇÃO AD
    GPIO       ADC CHANNEL
    ----------------------
    GPIO 0  ==> ADC2_CH1
    GPIO 2  ==> ADC2_CH2
    GPIO 4  ==> ADC2_CH0
    GPIO 12 ==> ADC2_CH5
    GPIO 13 ==> ADC2_CH4
    GPIO 14 ==> ADC2_CH6
    GPIO 15 ==> ADC2_CH3
    GPIO 25 ==> ADC2_CH8
    GPIO 26 ==> ADC2_CH9
    GPIO 27 ==> ADC2_CH7
    GPIO 32 ==> ADC1_CH4
    GPIO 33 ==> ADC1_CH5
    GPIO 34 ==> ADC1_CH6
    GPIO 35 ==> ADC1_CH7
    GPIO 36 ==> ADC1_CH0 *
    GPIO 37 ==> ADC1_CH1
    GPIO 38 ==> ADC1_CH2
    GPIO 39 ==> ADC1_CH3
*/
//#include <ESP8266WiFi.h>
#include <WiFi.h>
#include <WiFiClient.h>
//#include <ESP8266WebServer.h>
//#include <ESP8266HTTPClient.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <Ticker.h>
#define LED 2
#define N_PONTOS 6

Ticker blinker;
Ticker blinker2;

//const char http_site[] = "http://192.168.2.105";
const char http_site[] = "http://172.30.7.111";
const int http_port = 3000;
//int N_PONTOS = 6;
String ponto[N_PONTOS] = {"ponto%200", "ponto%202", "ponto%203", "ponto%204", "ponto%205", "ponto%206"};
double consumo[N_PONTOS] = {0.0, 1.0, 2.0, 3.0, 4.0, 5.0};
byte pontosAtivos = 0;
//double consumoAtual[N_PONTOS] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0};
//byte portAnalogTensao[N_PONTOS] = {1, 2, 3, 4, 5, 6};
//byte portAnalogCorrente[N_PONTOS] = {7, 8, 9, 10, 11, 12};
int QtdLeituras = 0;
byte TEMPO_Ticker = 15;

WiFiClient client;
IPAddress server1(192, 168, 2, 105);
#ifndef STASSID
#define STASSID "Anderson"
#define STAPSK  "andersonpereirarodrigues4299207816"
#endif
/*const char* ssid = "Anderson";
  const char* password = "";*/

//const char* ssid = STASSID;//"Anderson"; //USAR PARA O ACESSO NA UTFPR
//const char* password = STAPSK; // "andersonpereirarodrigues4299207816"; //USAR PARA O ACESSO NA UTFPR
const char* ssid = "G74Rog"; //USAR PARA O ACESSO NA UTFPR
const char* password = "esp8266-2019"; //USAR PARA O ACESSO NA UTFPR

//String Link = "http://192.168.2.105:3000/estados"; // alterar para o localhost IPV4 da maquina;
String Link = "http://172.30.7.111:3000/estados"; // alterar para o localhost IPV4 da maquina;

//ESP8266WebServer server(80);
WebServer server(80);


boolean no = false;
void setup() {
  const int capacity = JSON_ARRAY_SIZE(6) + 6 * JSON_OBJECT_SIZE(4);
  StaticJsonDocument<capacity> doc;

  Serial.begin(115200);
  pinMode(LED, OUTPUT);

  //Executa a função changeState a cada 0.5s
  blinker.attach(0.5, changeState);
  blinker2.attach(TEMPO_Ticker, changeState2);

  delay(10);
  Serial.println("");
  Serial.println("");
  Serial.print("Conectando a ");
  Serial.print(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Conectado a rede sem fio ");
  Serial.println(ssid);
  Serial.println("Servidor iniciado");
  Serial.print("IP para se conectar ao NodeMCU: ");
  Serial.print("http://");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/login", handleLogin);
  server.on("/server", handleBuscaServer);
  server.on("/inline", []() {
    server.send(200, "text/plain", "this works without need of authentication");
  });

  server.onNotFound(handleNotFound);
  //here the list of headers to be recorded
  const char * headerkeys[] = {"User-Agent", "Cookie"} ;
  size_t headerkeyssize = sizeof(headerkeys) / sizeof(char*);
  //ask server to track these headers
  server.collectHeaders(headerkeys, headerkeyssize);
  server.begin();
  Serial.println("HTTP server started");
  handleBuscaServer();


}
// --------------------------- LOOP -------------------------------------------------------------------
void loop() {
  server.handleClient();
  if (no == true && pontosAtivos > 0) {
    //ler tensão e corrente
    QtdLeituras++;
    for (int i = 0; i < N_PONTOS; i++) {
      //LER TENSÃO & CORRENTE
      //Potencia(W)=Tensão(v)*Corrente(A)
      //Consumo(Ws)=Potencia(W)*■t(s)
      /*
         double corresao;
         double tensao = corresao*analogRead(portAnalogTensao[i]);
         double Corrente = corresao*analogRead(portAnalogCorrente[i]);
         double potencia = tensao * corrente;
         double cons = potencia * TEMPO_Ticker;
         consumoAtual[i] = cons;
      */
    }
    enviar();
    no = false;
  }
}
//-----------------------------------------------------------------------------------------------------
bool is_authenticated() {
  Serial.println("Enter is_authenticated");
  if (server.hasHeader("Cookie")) {
    Serial.print("Found cookie: ");
    String cookie = server.header("Cookie");
    Serial.println(cookie);
    if (cookie.indexOf("ESPSESSIONID=1") != -1) {
      Serial.println("Authentication Successful");
      return true;
    }
  }
  Serial.println("Authentication Failed");
  return false;
}
void handleLogin() {
  String msg;
  if (server.hasHeader("Cookie")) {
    Serial.print("Found cookie: ");
    String cookie = server.header("Cookie");
    Serial.println(cookie);
  }
  if (server.hasArg("DISCONNECT")) {
    Serial.println("Disconnection");
    server.sendHeader("Location", "/login");
    server.sendHeader("Cache-Control", "no-cache");
    server.sendHeader("Set-Cookie", "ESPSESSIONID=0");
    server.send(301);
    return;
  }
  if (server.hasArg("USERNAME") && server.hasArg("PASSWORD")) {
    if (server.arg("USERNAME") == "admin" &&  server.arg("PASSWORD") == "admin") {
      server.sendHeader("Location", "/");
      server.sendHeader("Cache-Control", "no-cache");
      server.sendHeader("Set-Cookie", "ESPSESSIONID=1");
      server.send(301);
      Serial.println("Log in Successful");
      return;
    }
    msg = "Wrong username/password! try again.";
    Serial.println("Log in Failed");
  }
  String content = "<html><body><form action='/login' method='POST'>To log in, please use : admin/admin<br>";
  content += "User:<input type='text' name='USERNAME' placeholder='user name'><br>";
  content += "Password:<input type='password' name='PASSWORD' placeholder='password'><br>";
  content += "<input type='submit' name='SUBMIT' value='Submit'></form>" + msg + "<br>";
  content += "You also can go <a href='/inline'>here</a></body></html>";
  server.send(200, "text/html", content);
}
void handleRoot() {
  Serial.println("Enter handleRoot");
  String header;
  if (!is_authenticated()) {
    server.sendHeader("Location", "/login");
    server.sendHeader("Cache-Control", "no-cache");
    server.send(301);
    return;
  }
  String content = "<html><body><H2>hello, you successfully connected to esp8266!</H2><br>";
  if (server.hasHeader("User-Agent")) {
    content += "the user agent used is : " + server.header("User-Agent") + "<br><br>";
  }
  content += "You can access this page until you <a href=\"/login?DISCONNECT=YES\">disconnect</a></body></html>";
  server.send(200, "text/html", content);
}
void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}
void handleBuscaServer() {
  const int capacity = JSON_ARRAY_SIZE(6) + 6 * JSON_OBJECT_SIZE(4);
  StaticJsonDocument<capacity> doc;

  HTTPClient http;
  http.begin(Link);
  int httpCode = http.GET();
  String payload = http.getString();
  Serial.println(httpCode);
  Serial.println(payload);
  http.end();
  pontosAtivos = 0;
  char json[payload.length()];
  int tam = payload.length() + 1;
  payload.toCharArray(json, tam);

  DeserializationError error = deserializeJson(doc, json );
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return;
  }
  for (int i = 0; i < 6; i++) {
    JsonObject repo0 = doc[i];
    String id = repo0["_id"];
    String nome = repo0["nome"];
    nome.replace(" ", "%20");
    ponto[i] = nome;
    double consumoUnid = repo0["ponto"];
    consumo[i] = consumoUnid;
    boolean estado = repo0["estado"];
    Serial.println(id);
    Serial.println(nome);
    Serial.println(consumoUnid);
    Serial.println(estado);
    ativePorta(nome, estado);
  }
  return;
}
void ativePorta(String nom, boolean std) {
  if (std == true) {
    pontosAtivos++;
    if (nom == "ponto 1") {
      Serial.println("************ PONTO 1 ATIVO ************");
    } else if (nom == "ponto 2") {
      Serial.println("************ PONTO 2 ATIVO ************");
    } else if (nom == "ponto 3") {
      Serial.println("************ PONTO 3 ATIVO ************");
    } else if (nom == "ponto 4") {
      Serial.println("************ PONTO 4 ATIVO ************");
    } else if (nom == "ponto 5") {
      Serial.println("************ PONTO 5 ATIVO ************");
    } else if (nom == "ponto 6") {
      Serial.println("************ PONTO 6 ATIVO ************");
    }
  } else {
    if (nom == "ponto 1") {
      Serial.println("########## PONTO 1 DESLIGA ##########");
    } else if (nom == "ponto 2") {
      Serial.println("########## PONTO 2 DESLIGA ##########");
    } else if (nom == "ponto 3") {
      Serial.println("########## PONTO 3 DESLIGA ##########");
    } else if (nom == "ponto 4") {
      Serial.println("########## PONTO 4 DESLIGA ##########");
    } else if (nom == "ponto 5") {
      Serial.println("########## PONTO 5 DESLIGA ##########");
    } else if (nom == "ponto 6") {
      Serial.println("########## PONTO 6 DESLIGA ##########");
    }
  }
}
void changeState() {
  digitalWrite(LED, !(digitalRead(LED)));
}

void changeState2() {
  no = true;
  Serial.println("OK");
}
void enviar() {
  //String enviarDados = "http://192.168.2.105:3000/estados/consumo";
  String enviarDados = "http://172.30.7.111:3000/estados/consumo";
  Serial.println(enviarDados);
  
  HTTPClient http;
  http.begin(enviarDados);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String pay = "nome=" + ponto[0] + "&consumo=" + consumo[0] + "&nome=" + ponto[1] + "&consumo=" + consumo[1] + "&nome=" + ponto[2] + "&consumo=" + consumo[2] + "&nome=" + ponto[3] + "&consumo=" + consumo[3] + "&nome=" + ponto[4] + "&consumo=" + consumo[4] + "&nome=" + ponto[5] + "&consumo=" + consumo[5];
  int httpCode = http.POST(pay);

  if (httpCode > 0) {

    String payload = http.getString();
    Serial.println(httpCode);
    Serial.println(payload);
  } else {
    Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
}
void enviar2() {
  if ( !client.connect(server1, http_port) ) {
    Serial.println("Falha na conexao com o site ");

  }
  String param = "test/845"; //Parâmetros com as leituras
  Serial.println(param);
  client.println("GET /estados/consumo/" + param + " HTTP/1.1");
  client.println("Host: ");
  client.println(http_site);
  client.println("Connection: close");
  client.println();
  client.println();
}
