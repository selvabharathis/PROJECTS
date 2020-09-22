//pin config:    3.3v->3.3v , IRQ->D2,9 , GND->GND , MISO->D6,12 , MOSI->D7,11 , SCK->D5,13 , SDA->D4,10
#include <SPI.h>
#include <MFRC522.h>
#include <nRF24L01.h>
#include <ArduinoJson.h>
#include <RF24.h>
#include<Metro.h>
#define SS_PIN 10
#define RST_PIN 9
#include <SoftwareSerial.h>
SoftwareSerial bluetooth(2,3);
MFRC522 mfrc522(SS_PIN, RST_PIN); 
RF24 radio(7, 8); // CE, CSN
const byte addresses[][6] = {"00001", "00002"};
typedef struct{
  int North;
  int South;
  int East;
  int West;
}data;
int count=0;
data payload;

Metro communication = Metro(100);
Metro rfidAuthentication = Metro(500);

void setup() 
{
  Serial.begin(9600);
  bluetooth.begin(9600);
  SPI.begin();      
  mfrc522.PCD_Init();
  radio.begin();
  radio.openWritingPipe(addresses[0]); // 00001
  radio.openReadingPipe(1, addresses[1]); // 00002
  radio.setPALevel(RF24_PA_MIN);
}
void loop() 
{
  if(communication.check()){ // thread 1 for nrf module
    delay(100);
    radio.startListening();
    if (radio.available()) 
    {
      radio.read(&payload, sizeof(payload)); // receive the available signal
      Serial.println();
      // send that signal data to app via json data
      StaticJsonBuffer<200> jBuffer;
      JsonObject& root = jBuffer.createObject();
//      root["north"] = payload.North;
//      root["south"] = payload.South;
//      root["east"] = payload.East;
        if(count >= 250){
          root["north"] = 1;
          root["south"] = 1;
          root["east"] = 0;
          root["west"] = 0;
        }
        else{
          root["north"] = 0;
          root["south"] = 0;
          root["east"] = 1;
          root["west"] = 1;    
        }
        count++;
//      root["west"] = payload.West;
      String output="";
      root.printTo(output); 
      Serial.println(output);   
      if(bluetooth.available()>0){
        char rec = bluetooth.read();
        if(rec == 'j'){
  
          bluetooth.println(output);
        }
      }
    }
    delay(100);
    radio.stopListening(); 
    if(bluetooth.available()>0){
      String changeLightOnThisDirection = bluetooth.readString();
      Serial.println(changeLightOnThisDirection);
      radio.write(&changeLightOnThisDirection,sizeof(changeLightOnThisDirection[0]));
    }
      
    else{
      char textSend[] = "test";     
      radio.write(&textSend,sizeof(textSend));
    }
      // receive data/ user request from app. and send it to signal_zone.
  }
  if(rfidAuthentication.check())// thread 2 for rfid check 
  {
      if ( ! mfrc522.PICC_IsNewCardPresent())
      {
        return;
      }
      if (! mfrc522.PICC_ReadCardSerial())
      {
        return;
      }
      String id= "";
      for (byte i = 0; i < mfrc522.uid.size; i++) 
      {
        id.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
        id.concat(String(mfrc522.uid.uidByte[i], HEX));
      }
      id.toUpperCase();
      if (id.substring(1) == "8C 2D 10 79") // check for valid authentication and send 'y' or 'n' via bluetooth to app.
      {
         bluetooth.println('y');
         Serial.println('y');
         delay(500);
      }
      else   
      {
         bluetooth.println('n');
         Serial.println('n');
         delay(500);
      }
  }
}
