int grup0 = 0;
int grup1 = 0;
int grup2 = 0;
int grup3 = 0;
int grup4 = 0;
int grup5 = 0;
int atomNumarasi = 0;
void setup()
{
    Serial.begin(9600);
}

void loop()
{

    grup0 = analogRead(A0);
    grup1 = analogRead(A1);
    grup2 = analogRead(A2);    
    grup3 = analogRead(A3);
    grup4 = analogRead(A4);
    grup5 = analogRead(A5);

    if(grup0 != 0)
    {
        //Serial.println("Grup 0: aktif");
        if (990 <= grup0 && grup0 <= 1023) 
        {
            atomNumarasi = 1;
        }
        else if (970<= grup0 && grup0 <= 989) 
        {
            atomNumarasi = 2;
        }
        else if (950 <= grup0 && grup0 <= 969) 
        {
            atomNumarasi = 3;
        }
        else if (930 <= grup0 && grup0 <= 949) 
        {
            atomNumarasi = 4;
        }
        else if (913 <= grup0 && grup0 <= 929) 
        {
            atomNumarasi = 5;
        }
        else if (895 <= grup0 && grup0 <= 912) 
        {
            atomNumarasi = 6;
        }
        else if (877 <= grup0 && grup0 <= 894) 
        {
            atomNumarasi = 7;
        }
        else if (861 <= grup0 && grup0 <= 886) 
        {
            atomNumarasi = 8;
        }
        else if (850 <= grup0 && grup0 <= 869) 
        {
            atomNumarasi = 9;
        }
        else if (845 <= grup0 && grup0 <= 860) 
        {
            atomNumarasi = 10;
        }
        else if (831 <= grup0 && grup0 <= 844) 
        {
            atomNumarasi = 11;
        }
        else if (816 <= grup0 && grup0 <= 830) 
        {
            atomNumarasi = 12;
        }
        else if (801 <= grup0 && grup0 <= 815) 
        {
            atomNumarasi = 13;
        }
        else if (788 <= grup0 && grup0 <= 800) 
        {
            atomNumarasi = 14;
        }
        else if (775 <= grup0 && grup0 <= 787) 
        {
            atomNumarasi = 15;
        }
        else if (762 <= grup0 && grup0 <= 774) 
        {
            atomNumarasi = 16;
        }
        else if (749 <= grup0 && grup0 <= 761) 
        {
            atomNumarasi = 17;
        }
        else if (738 <= grup0 && grup0 <= 748) 
        {
            atomNumarasi = 18;
        }
        else if (724 <= grup0 && grup0 <= 737) 
        {
            atomNumarasi = 19;
        }
        else if (717 <= grup0 && grup0 <= 723) 
        {
            atomNumarasi = 20;
        }
        else
        {
            //Serial.println("HATA: Grup 0 - yanliş değer okundu");
        }
    }
    else if(grup1 != 0)
    {
        //Serial.println("Grup 1: aktif");
        if (990 <= grup1 && grup1 <= 1023) 
        {
            atomNumarasi = 21;
        }
        else if (970<= grup1 && grup1 <= 989) 
        {
            atomNumarasi = 22;
        }
        else if (950 <= grup1 && grup1 <= 969) 
        {
            atomNumarasi = 23;
        }
        else if (930 <= grup1 && grup1 <= 949) 
        {
            atomNumarasi = 24;
        }
        else if (913 <= grup1 && grup1 <= 929) 
        {
            atomNumarasi = 25;
        }
        else if (895 <= grup1 && grup1 <= 912) 
        {
            atomNumarasi = 26;
        }
        else if (877 <= grup1 && grup1 <= 894) 
        {
            atomNumarasi = 27;
        }
        else if (861 <= grup1 && grup1 <= 886) 
        {
            atomNumarasi = 28;
        }
        else if (850 <= grup1 && grup1 <= 869) 
        {
            atomNumarasi = 29;
        }
        else if (845 <= grup1 && grup1 <= 860) 
        {
            atomNumarasi = 30;
        }
        else if (831 <= grup1 && grup1 <= 844) 
        {
            atomNumarasi = 31;
        }
        else if (816 <= grup1 && grup1 <= 830) 
        {
            atomNumarasi = 32;
        }
        else if (801 <= grup1 && grup1 <= 815) 
        {
            atomNumarasi = 33;
        }
        else if (788 <= grup1 && grup1 <= 800) 
        {
            atomNumarasi = 34;
        }
        else if (775 <= grup1 && grup1 <= 787) 
        {
            atomNumarasi = 35;
        }
        else if (762 <= grup1 && grup1 <= 774) 
        {
            atomNumarasi = 36;
        }
        else if (749 <= grup1 && grup1 <= 761) 
        {
            atomNumarasi = 37;
        }
        else if (738 <= grup1 && grup1 <= 748) 
        {
            atomNumarasi = 38;
        }
        else if (724 <= grup1 && grup1 <= 737) 
        {
            atomNumarasi = 39;
        }
        else if (717 <= grup1 && grup1 <= 723) 
        {
            atomNumarasi = 40;
        }
        else
        {
            //Serial.println("HATA: Grup1 - yanliş değer okundu");
        }
    }
    else if(grup2 != 0)
    {
        //Serial.println("Grup 2: aktif");
        if (990 <= grup2 && grup2 <= 1023) 
        {
            atomNumarasi = 41;
        }
        else if (970<= grup2 && grup2 <= 989) 
        {
            atomNumarasi = 42;
        }
        else if (950 <= grup2 && grup2 <= 969) 
        {
            atomNumarasi = 43;
        }
        else if (930 <= grup2 && grup2 <= 949) 
        {
            atomNumarasi = 44;
        }
        else if (913 <= grup2 && grup2 <= 929) 
        {
            atomNumarasi = 45;
        }
        else if (895 <= grup2 && grup2 <= 912) 
        {
            atomNumarasi = 46;
        }
        else if (877 <= grup2 && grup2 <= 894) 
        {
            atomNumarasi = 47;
        }
        else if (861 <= grup2 && grup2 <= 886) 
        {
            atomNumarasi = 48;
        }
        else if (850 <= grup2 && grup2 <= 869) 
        {
            atomNumarasi = 49;
        }
        else if (845 <= grup2 && grup2 <= 860) 
        {
            atomNumarasi = 50;
        }
        else if (831 <= grup2 && grup2 <= 844) 
        {
            atomNumarasi = 51;
        }
        else if (816 <= grup2 && grup2 <= 830) 
        {
            atomNumarasi = 52;
        }
        else if (801 <= grup2 && grup2 <= 815) 
        {
            atomNumarasi = 53;
        }
        else if (788 <= grup2 && grup2 <= 800) 
        {
            atomNumarasi = 54;
        }
        else if (775 <= grup2 && grup2 <= 787) 
        {
            atomNumarasi = 55;
        }
        else if (762 <= grup2 && grup2 <= 774) 
        {
            atomNumarasi = 56;
        }
        else if (749 <= grup2 && grup2 <= 761) 
        {
            atomNumarasi = 57;
        }
        else if (738 <= grup2 && grup2 <= 748) 
        {
            atomNumarasi = 58;
        }
        else if (724 <= grup2 && grup2 <= 737) 
        {
            atomNumarasi = 59;
        }
        else if (717 <= grup2 && grup2 <= 723) 
        {
            atomNumarasi = 60;
        }
        else
        {
            //Serial.println("HATA: Grup2 - yanliş değer okundu");
        }
    }
    else if(grup3 != 0)
    {
        //Serial.println("Grup 3: aktif");
        if (990 <= grup3 && grup3 <= 1023) 
        {
            atomNumarasi = 61;
        }
        else if (970<= grup3 && grup3 <= 989) 
        {
            atomNumarasi = 62;
        }
        else if (950 <= grup3 && grup3 <= 969) 
        {
            atomNumarasi = 63;
        }
        else if (930 <= grup3 && grup3 <= 949) 
        {
            atomNumarasi = 64;
        }
        else if (913 <= grup3 && grup3 <= 929) 
        {
            atomNumarasi = 65;
        }
        else if (895 <= grup3 && grup3 <= 912) 
        {
            atomNumarasi = 66;
        }
        else if (877 <= grup3 && grup3 <= 894) 
        {
            atomNumarasi = 67;
        }
        else if (861 <= grup3 && grup3 <= 886) 
        {
            atomNumarasi = 68;
        }
        else if (850 <= grup3 && grup3 <= 869) 
        {
            atomNumarasi = 69;
        }
        else if (845 <= grup3 && grup3 <= 860) 
        {
            atomNumarasi = 70;
        }
        else if (831 <= grup3 && grup3 <= 844) 
        {
            atomNumarasi = 71;
        }
        else if (816 <= grup3 && grup3 <= 830) 
        {
            atomNumarasi = 72;
        }
        else if (801 <= grup3 && grup3 <= 815) 
        {
            atomNumarasi = 73;
        }
        else if (788 <= grup3 && grup3 <= 800) 
        {
            atomNumarasi = 74;
        }
        else if (775 <= grup3 && grup3 <= 787) 
        {
            atomNumarasi = 75;
        }
        else if (762 <= grup3 && grup3 <= 774) 
        {
            atomNumarasi = 76;
        }
        else if (749 <= grup3 && grup3 <= 761) 
        {
            atomNumarasi = 77;
        }
        else if (738 <= grup3 && grup3 <= 748) 
        {
            atomNumarasi = 78;
        }
        else if (724 <= grup3 && grup3 <= 737) 
        {
            atomNumarasi = 79;
        }
        else if (717 <= grup3 && grup3 <= 723) 
        {
            atomNumarasi = 80;
        }
        else
        {
            //Serial.println("HATA: Grup3 - yanliş değer okundu");
        }
    }
    else if(grup4 != 0)
    {
        //Serial.println("Grup 4: aktif");
        if (990 <= grup4 && grup4 <= 1023) 
        {
            atomNumarasi = 81;
        }
        else if (970<= grup4 && grup4 <= 989) 
        {
            atomNumarasi = 82;
        }
        else if (950 <= grup4 && grup4 <= 969) 
        {
            atomNumarasi = 83;
        }
        else if (930 <= grup4 && grup4 <= 949) 
        {
            atomNumarasi = 84;
        }
        else if (913 <= grup4 && grup4 <= 929) 
        {
            atomNumarasi = 85;
        }
        else if (895 <= grup4 && grup4 <= 912) 
        {
            atomNumarasi = 86;
        }
        else if (877 <= grup4 && grup4 <= 894) 
        {
            atomNumarasi = 87;
        }
        else if (861 <= grup4 && grup4 <= 886) 
        {
            atomNumarasi = 88;
        }
        else if (850 <= grup4 && grup4 <= 869) 
        {
            atomNumarasi = 89;
        }
        else if (845 <= grup4 && grup4 <= 860) 
        {
            atomNumarasi = 90;
        }
        else if (831 <= grup4 && grup4 <= 844) 
        {
            atomNumarasi = 91;
        }
        else if (816 <= grup4 && grup4 <= 830) 
        {
            atomNumarasi = 92;
        }
        else if (801 <= grup4 && grup4 <= 815) 
        {
            atomNumarasi = 93;
        }
        else if (788 <= grup4 && grup4 <= 800) 
        {
            atomNumarasi = 94;
        }
        else if (775 <= grup4 && grup4 <= 787) 
        {
            atomNumarasi = 95;
        }
        else if (762 <= grup4 && grup4 <= 774) 
        {
            atomNumarasi = 96;
        }
        else if (749 <= grup4 && grup4 <= 761) 
        {
            atomNumarasi = 97;
        }
        else if (738 <= grup4 && grup4 <= 748) 
        {
            atomNumarasi = 98;
        }
        else if (724 <= grup4 && grup4 <= 737) 
        {
            atomNumarasi = 99;
        }
        else if (717 <= grup4 && grup4 <= 723) 
        {
            atomNumarasi = 100;
        }
        else
        {
            //Serial.println("HATA: Grup4 - yanliş değer okundu");
        }
    }
    else if(grup5 != 0)
    {
        //Serial.println("Grup 5: aktif");
        if (990 <= grup5 && grup5 <= 1023) 
        {
            atomNumarasi = 101;
        }
        else if (970<= grup5 && grup5 <= 989) 
        {
            atomNumarasi = 102;
        }
        else if (950 <= grup5 && grup5 <= 969) 
        {
            atomNumarasi = 103;
        }
        else if (930 <= grup5 && grup5 <= 949) 
        {
            atomNumarasi = 104;
        }
        else if (913 <= grup5 && grup5 <= 929) 
        {
            atomNumarasi = 105;
        }
        else if (895 <= grup5 && grup5 <= 912) 
        {
            atomNumarasi = 106;
        }
        else if (877 <= grup5 && grup5 <= 894) 
        {
            atomNumarasi = 107;
        }
        else if (861 <= grup5 && grup5 <= 886) 
        {
            atomNumarasi = 108;
        }
        else if (850 <= grup5 && grup5 <= 869) 
        {
            atomNumarasi = 109;
        }
        else if (845 <= grup5 && grup5 <= 860) 
        {
            atomNumarasi = 110;
        }
        else if (831 <= grup5 && grup5 <= 844) 
        {
            atomNumarasi = 111;
        }
        else if (816 <= grup5 && grup5 <= 830) 
        {
            atomNumarasi = 112;
        }
        else if (801 <= grup5 && grup5 <= 815) 
        {
            atomNumarasi = 113;
        }
        else if (788 <= grup5 && grup5 <= 800) 
        {
            atomNumarasi = 114;
        }
        else if (775 <= grup5 && grup5 <= 787) 
        {
            atomNumarasi = 115;
        }
        else if (762 <= grup5 && grup5 <= 774) 
        {
            atomNumarasi = 116;
        }
        else if (749 <= grup5 && grup5 <= 761) 
        {
            atomNumarasi = 117;
        }
        else if (738 <= grup5 && grup5 <= 748) 
        {
            atomNumarasi = 118;
        }
        // En fazla 118 element oldugu icin burdan 2 aralik silindi.
        else
        {
            //Serial.println("HATA: Grup5 - yanliş değer okundu");
        }
    }
    else
    {
        //Serial.println("HATA: Aktif grup bulunamadi");
    }
    if (atomNumarasi>0 && atomNumarasi<119) {
        Serial.println(atomNumarasi);
    }
    delay(1000);
    //atomNumarasi=0;
    //Serial.println(grup0);
    //Serial.println(grup1);
    //Serial.println(grup2);
}
