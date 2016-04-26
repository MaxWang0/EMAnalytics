import java.awt.Toolkit;
import java.util.Timer;
import java.util.TimerTask;


public class HttpDownloadFake {

       //SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyyMMddHHmmss");
       //String timestamp = dateFormat2.format(new Date());
       
       static String log1 = "/home/emotto_user2/JavaTextMining6/data/logs/LMPEBL";
       static String log2 = "/home/emotto_user2/JavaTextMining6/data/logs/LMPRN";
       static String log3 = "/home/emotto_user2/JavaTextMining6/data/logs/SCEDShadow";
       static String log4 = "/home/emotto_user2/JavaTextMining6/data/logs/RTDIndicative";
       static String log5 = "/home/emotto_user2/JavaTextMining6/data/logs/SPP";


       static String doc1 = "http://mis.ercot.com/misapp/GetReports.do?reportTypeId=11485&reportTitle=LMPs%20by%20Electrical%20Bus&showHTMLView=&mimicKey";
       static String doc2 = "http://mis.ercot.com/misapp/GetReports.do?reportTypeId=12300&reportTitle=LMPs%20by%20Resource%20Nodes,%20Load%20Zones%20and%20Trading%20Hubs&showHTMLView=&mimicKey";
       static String doc3 = "http://mis.ercot.com/misapp/GetReports.do?reportTypeId=12302&reportTitle=SCED%20Shadow%20Prices%20and%20Binding%20Transmission%20Constraints&showHTMLView=&mimicKey";
       static String doc4 = "http://mis.ercot.com/misapp/GetReports.do?reportTypeId=13073&reportTitle=RTD%20Indicative%20LMPs%20by%20Resource%20Nodes,%20Load%20Zones%20and%20Hubs&showHTMLView=&mimicKey";
       static String doc5 = "http://mis.ercot.com/misapp/GetReports.do?reportTypeId=12301&reportTitle=Settlement%20Point%20Prices%20at%20Resource%20Nodes,%20Hubs%20and%20Load%20Zones&showHTMLView=&mimicKey";

       static String saveDir1 = "/home/emotto_user2/JavaTextMining6/data/temp_LMPS_BY_Electrical_Bus";
       static String saveDir2 = "/home/emotto_user2/JavaTextMining6/data/temp_LMPS_BY_Resource_Nodes";
       static String saveDir3 = "/home/emotto_user2/JavaTextMining6/data/temp_SCED";
       static String saveDir4 = "/home/emotto_user2/JavaTextMining6/data/temp_RTD_Indicative_LMPs";
       static String saveDir5 = "/home/emotto_user2/JavaTextMining6/data/temp_SPP";

       static String main_saveDir1 = "/home/emotto_user2/JavaTextMining6/data/LMPS_BY_Electrical_Bus";
       static String main_saveDir2 = "/home/emotto_user2/JavaTextMining6/data/LMPS_BY_Resource_Nodes";
       static String main_saveDir3 = "/home/emotto_user2/JavaTextMining6/data/SCED";
       static String main_saveDir4 = "/home/emotto_user2/JavaTextMining6/data/RTD_Indicative_LMPs";
       static String main_saveDir5 = "/home/emotto_user2/JavaTextMining6/data/SPP";
      
       static int daysBack1 = 2;
       static int daysBack2 = 2;
       static int daysBack3 = 2;
       static int daysBack4 = 2;
       static int daysBack5 = 2;

       
       public static void main(String args[]) throws InterruptedException {
	    
	        Timer time = new Timer(); // Instantiate Timer Object
		HttpDownloadMain hd = new HttpDownloadMain(log1, doc1, saveDir1, main_saveDir1, daysBack1); // Instantiate SheduledTask class
		time.schedule(hd, 0, 300000); // Create Repetitively task for every 5 minutes
                HttpDownloadMain hd2 = new HttpDownloadMain(log2, doc2, saveDir2, main_saveDir2, daysBack2); // Instantiate SheduledTask class
                time.schedule(hd2, 0, 300000);
                HttpDownloadMain hd3 = new HttpDownloadMain(log3, doc3, saveDir3, main_saveDir3, daysBack3); // Instantiate SheduledTask class
                time.schedule(hd3, 0, 3600000); // Create Repetitively task for every 5 minutes
                HttpDownloadMain hd4 = new HttpDownloadMain(log4, doc4, saveDir4, main_saveDir4, daysBack4); // Instantiate SheduledTask class
                time.schedule(hd4, 0, 300000);
                HttpDownloadMain hd5 = new HttpDownloadMain(log5, doc5, saveDir5, main_saveDir5, daysBack5); // Instantiate SheduledTask class
                time.schedule(hd5, 0, 900000);
	}


}

