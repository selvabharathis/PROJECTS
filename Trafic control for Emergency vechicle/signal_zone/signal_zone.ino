#include <SPI.h>
#include<Metro.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN -->ports for nrf to communicate

const byte addresses[][6] = {"00001", "00002"}; //-->two address, 1-->for reading,2--> for writing.
const int NR=2,NG=3,WR=4,WG=5,SG=A0,SR=A1,ER=A2,EG=A3,buz=A5;// specifying digital pin, for traffic lights, and buzzer.
bool priority = false; // triger variable between normal and emergency mode. FALSE-->normal mode, TRUE-->emergency mode.


typedef struct{       // creating a structure, to pack data, and send to another module wirelessly. packing is done, so that there is no noise, and mismatch of data on other end.
  int North;
  int South;
  int East;
  int West;
}data;

data payload;  // payload is the object for structure
int direction=0;
Metro beconSignalData = Metro(20000); // using metro framework for multithreding
Metro ResetSignal = Metro(999999999999999); //setting reset signal to infinity at first, once we get into emergency we will set the time, and again set it to infinity.
Metro communication = Metro(100);// beconSignalData --> loops the signal lights normally, till priority is true; || communication-->send the available signal through nrf(payload-struct), and receive user req to turn the signal light to make way for ambulance.

void setup() 
{
  Serial.begin(9600);// the serial communication is done at 9600ms speed
  radio.begin(); // starting the nrf
  radio.openWritingPipe(addresses[1]); // 00002 --> opening the writing mode in nrf
  radio.openReadingPipe(1, addresses[0]); // 00001 --> opening the reading mode in nrf
  radio.setPALevel(RF24_PA_MIN); // setting the radio frequency strength for communication
  payload.North=1; // initialization of sturcture data member
  payload.South=0;
  payload.East=1;
  payload.West=1;
  pinMode(NR,OUTPUT); //initialization the digital pin for output 
  pinMode(NG,OUTPUT);
  pinMode(WR,OUTPUT);
  pinMode(WG,OUTPUT);
  pinMode(SG,OUTPUT);
  pinMode(SR,OUTPUT);
  pinMode(ER,OUTPUT);
  pinMode(EG,OUTPUT);
  pinMode(buz,OUTPUT);
}
void loop() 
{
  if(ResetSignal.check()){
    priority = false;
    digitalWrite(buz,LOW);
    ResetSignal.interval(999999999999999);    
  }
  if(communication.check()){ // thread 1 : runs for every 100ms 
  delay(100); // delay 100ms
  radio.stopListening(); // asking nrf to stop listen, so that it can write
  radio.setPayloadSize(32);// setting the size of data that nrf going to send.
  radio.write(&payload, sizeof(payload));// sending the data to another module via wirelessly.
  delay(100);// delay 100ms
  radio.startListening();// asking nrf to start listen, so that it can know user request to switch signal from normal to emergency mode.
  if(radio.available())// check where the other end is available to send data, so that this module can receive it.
  {
    char textReceive[32];// creating a char array
    radio.read(&textReceive,sizeof(textReceive));// reading the data from another nrf, this is the user request data.
    Serial.println(textReceive);
    if(textReceive[0] == 'N' || textReceive[0] == 'S' || textReceive[0] == 'E' || textReceive[0] == 'W')// if the user req data match any of the following
    {
      priority = true;// trig priority false, so that normal signal wont run
      Serial.println("came inside because of user request");
      switch(textReceive[0]){ // switch the traffic light on, as per the user request
        case 'N':
                      Serial.println("printing emergency lights--north");
                      digitalWrite(buz,HIGH);
                      digitalWrite(NR,LOW);
                      digitalWrite(NG,HIGH);
                      digitalWrite(WR,HIGH);
                      digitalWrite(WG,LOW);
                      digitalWrite(SR,HIGH);
                      digitalWrite(SG,LOW);
                      digitalWrite(ER,HIGH);
                      digitalWrite(EG,LOW);
                      break;
        case 'S': 
                      break;
        case 'E':
                      Serial.println("printing emergency lights--east");
                      digitalWrite(buz,HIGH);
                      digitalWrite(NR,HIGH);
                      digitalWrite(NG,LOW);
                      digitalWrite(WR,HIGH);
                      digitalWrite(WG,LOW);
                      digitalWrite(SR,HIGH);
                      digitalWrite(SG,LOW);
                      digitalWrite(ER,LOW);
                      digitalWrite(EG,HIGH);                     
                      break;
        case 'W':
                      Serial.println("printing emergency lights--west");
                      digitalWrite(buz,HIGH);
                      digitalWrite(NR,HIGH);
                      digitalWrite(NG,LOW);
                      digitalWrite(WR,LOW);
                      digitalWrite(WG,HIGH);
                      digitalWrite(SR,HIGH);
                      digitalWrite(SG,LOW);
                      digitalWrite(ER,HIGH);
                      digitalWrite(EG,LOW);                      
                      break;                      
      }  
      ResetSignal.interval(5000);// for 5 sec the above emergency time will be running.  
    }
  }
  }
if(beconSignalData.check()){ // thread 2: normal mode of signal runs for every 20sec
  TrafficSignal(direction);
  direction++;
    if(direction >4)
      direction=0;
}
}

void TrafficSignal(int direction)
{
  if(!priority)
    {
     
   switch(direction){
   case 0: 
        // FOR WEST
    Serial.println("printing normal lights--west");
    digitalWrite(NR,HIGH);
    digitalWrite(NG,LOW);
    digitalWrite(WR,LOW);
    digitalWrite(WG,HIGH);
    digitalWrite(SR,HIGH);
    digitalWrite(SG,LOW);
    digitalWrite(ER,HIGH);
    digitalWrite(EG,LOW);
    break;
    case 1:
    // FOR NORTH
    Serial.println("printing normal lights--north");
    digitalWrite(NR,LOW);
    digitalWrite(NG,HIGH);
    digitalWrite(WR,HIGH);
    digitalWrite(WG,LOW);
    digitalWrite(SR,HIGH);
    digitalWrite(SG,LOW);
    digitalWrite(ER,HIGH);
    digitalWrite(EG,LOW);
    break;
    case 2:
    // FOR EAST
    Serial.println("printing normal lights--east");
    digitalWrite(NR,HIGH);
    digitalWrite(NG,LOW);
    digitalWrite(WR,HIGH);
    digitalWrite(WG,LOW);
    digitalWrite(SR,HIGH);
    digitalWrite(SG,LOW);
    digitalWrite(ER,LOW);
    digitalWrite(EG,HIGH);
    break;
    case 3:
    // FOR SOUTH
    Serial.println("printing normal lights--south");
    digitalWrite(NR,HIGH);
    digitalWrite(NG,LOW);
    digitalWrite(WR,HIGH);
    digitalWrite(WG,LOW);
    digitalWrite(SR,LOW);
    digitalWrite(SG,HIGH);
    digitalWrite(ER,HIGH);
    digitalWrite(EG,LOW);
    break;
    }
}
}
