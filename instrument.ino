//see it in action here: http://www.youtube.com/watch?v=wywhOr7ExTw

int ledPin[] = {6,7,8,9,10,11,12,13};
int dMajor[] = {146,220,293,369,440,587,739,880}; // d a d f# a
int eMinor[] = {329,392,493,329,392,493,329,392};
int gMajor[] = {196,293,392,246,293,196,293,392}; // g d g b d
int buzzerPin = 2;
int dA = 100;
int blinker = 0;

void setup () {
  Serial.begin(9600);
  
  //buttons
  
  pinMode(3,INPUT);   //yellow1
  pinMode(4,INPUT);   //yellow2
  pinMode(5,INPUT); //white (octive shift)
  
  //buzzer 
  
  pinMode(buzzerPin, OUTPUT);
  
  //LEDS
  
  for(int i = 0; i <= 7; i++){
  pinMode(ledPin[i], OUTPUT);
  }

}

void loop() {
  
  static int buttonA = 0;      
  buttonA = digitalRead(3);
  static int buttonB = 0;      
  buttonB = digitalRead(4);
  static int buttonC = 0;      
  buttonC = digitalRead(5);  
  
  if (!buttonA) {  arpeggioA();  } else {noTone(buzzerPin);}  
  if (!buttonB) {  arpeggioB();  } else {noTone(buzzerPin);}
  if (!buttonC) {  theremin();  } else {noTone(buzzerPin);}
  
}

void arpeggioA() {
  
  for(int blinker = 0; blinker <= 7; blinker++){
    tone (buzzerPin, gMajor[blinker]);
    digitalWrite(ledPin[blinker],HIGH);
    delay(dA);
    digitalWrite(ledPin[blinker],LOW);
    delay(dA);
  }
}

void arpeggioB() {
  
  for(int blinker = 7; blinker >= 0; blinker--){
    tone (buzzerPin, eMinor[blinker]);
    digitalWrite(ledPin[blinker],HIGH);
    delay(dA);
    digitalWrite(ledPin[blinker],LOW);
    delay(dA);
  }
}

void theremin() {
  static int mappedReading;
  static int photoResistorReading;
  mappedReading = analogRead(5);
  Serial.println();
  photoResistorReading = analogRead(5);
  
  mappedReading=map(photoResistorReading, 400, 900, 7, 0);

  tone (buzzerPin, dMajor[mappedReading]);
  digitalWrite(ledPin[mappedReading],HIGH);
  delay(dA);
  digitalWrite(ledPin[mappedReading],LOW);
  delay(dA);
}

  
