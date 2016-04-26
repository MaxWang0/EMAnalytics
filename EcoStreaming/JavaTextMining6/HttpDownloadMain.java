import java.util.TimerTask;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Hashtable;
import java.util.Scanner;
import java.util.TimeZone;
import org.joda.time.DateTime;

/**
 * 
 * @author Yu Wang
 * Create a web crawler to retrieve the data automatically from Ergot website
 */
public class HttpDownloadMain extends TimerTask{
	
        private String log;
        private String doc;
        private String saveDir;
        private String main_saveDir;
        private int daysBack;

        Hashtable P1 = new Hashtable();        
        Date dateLimit;
  
        FileWriter logFile;
        FileWriter errorlogFile;

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyyMMddHHmmss");
        SimpleDateFormat dateFormat3 = new SimpleDateFormat("yyyyMMdd");

        public HttpDownloadMain(String l, String d, String s, String m, int b) {
		
                this.log = l;
		this.doc = d;
		this.saveDir = s;
                this.main_saveDir = m;
                this.daysBack = b;


                File folder = new File(main_saveDir);
                File[] listOfFiles = folder.listFiles();

                for(int i = 0; i < listOfFiles.length; i++) {
                    P1.put(listOfFiles[i].getName(), 1);
                }
             
                dateFormat.setTimeZone(TimeZone.getTimeZone("America/Chicago"));
                dateFormat2.setTimeZone(TimeZone.getTimeZone("America/Chicago"));
                dateFormat3.setTimeZone(TimeZone.getTimeZone("America/Chicago"));
         
                dateLimit = new DateTime(new Date()).minusDays(daysBack).toDate();

                System.out.println(dateLimit);
	}

         

	public void run(){
		
		String timestamp = dateFormat3.format(new Date());

                try {
                         logFile = new FileWriter(new File(log + "_" + timestamp + ".log"), true);
                                        
	        } catch (IOException e1) {
                         
                         // handle the log IOexception here
			 System.out.println("Got an IOException for log: " + e1.getMessage());
	        }
        


                Document htmlscript= null;

                String link;
		String newlink;
		String fileName = null;
		String link2;
		        
		Element ps1 = null;
		Elements psChildren1 = null;
		        
		int attempt = 1;
        
	        while(htmlscript == null&&attempt <= 5){
		        try{
		    		       htmlscript = Jsoup.connect(doc).maxBodySize(Integer.MAX_VALUE).get();
		                       logFile.write("succeed in "+attempt+" attmpets for " + saveDir);
		                       logFile.write("\n");

                                       ps1 = htmlscript.select("body").first();
		                       psChildren1 = ps1.children().select("table.tbl_ltTaupe > tbody > tr > td > table > tbody > tr");

                                       for(Element i : psChildren1){
                
                                          link = i.select("td").text();
                                          try {
                                              
                                                if(link.split("\\.").length > 4){
                                                      
                                                   if(link.contains("csv") && dateFormat3.parse(link.split("\\.")[3]).getTime() >= dateLimit.getTime()){
                           
                                                        Elements e = i.children().select("td");
                                                        link2 = i.select("a").attr("href");   // find the zipfile url
                                                        try{
                                 
                                                          newlink = "http://mis.ercot.com"+link2;
                                                          URL url = new URL(newlink);
                                                          HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
                                                          String disposition = httpConn.getHeaderField("Content-Disposition");
                                                          if (disposition != null) {
                                                             
                                                             // extracts file name from header field
                                                             int index = disposition.indexOf("filename=");
                                                             if (index > 0) {
                                                     
                                                                 fileName = disposition.substring(index + 9,
                                                                 disposition.length() );
                                                             }
                                                             } else {
                                            
                                                               // extracts file name from URL
                                                               fileName = newlink.substring(newlink.lastIndexOf("/") + 1,
                                                               newlink.length());
                                                             }
                                       
                                                             if(P1.get(fileName) != null){
                                                             }else{
                                            
                                                               int fileSize = HttpDownloadUtility.downloadFile(newlink, saveDir);   //download the file to the specific directory
                                                               if(fileSize>0){
                                               
                                                                   logFile.write(dateFormat.format(new Date()) + "," + fileName + "," + fileSize + "," + saveDir + "," + "Connect sucessfully" + "," + "Download successfully");
                                                                   logFile.write("\n");
                                                                   P1.put(fileName, 1);  // mark the downloaded file and put it in the hashtable
                                                                   }else if(fileSize == -1){
                                               
                                                                      logFile.write(dateFormat.format(new Date()) + "," + fileName + "," + fileSize + "," + saveDir + "," + "Connect succesfully" + "," + "Fail to download");
                                                                      logFile.write("\n");
                                                                      errorlogFile = new FileWriter(new File(log + "_ERROR.log"), true);
		               					      errorlogFile.write(dateFormat.format(new Date()) + "," + fileName + "," + fileSize + "," + saveDir + "," + "Connect succesfully" + "," + "Fail to download");
		               					      errorlogFile.write("\n");
		               					      errorlogFile.close(); 
                                                                   }else{

                                                                      logFile.write(dateFormat.format(new Date()) + "," + fileName + "," + fileSize + "," + saveDir + "," + "Fail to connect" + "," + "Fail to download");
                                                                      logFile.write("\n");
                                                                      errorlogFile = new FileWriter(new File(log + "_ERROR.log"), true);
		               					      errorlogFile.write(dateFormat.format(new Date()) + "," + fileName + "," + fileSize + "," + saveDir + "," + "Connect succesfully" + "," + "Fail to download");
		               					      errorlogFile.write("\n");
		               					      errorlogFile.close(); 
                                                                   }
                                                              }
                                                          }catch (IOException ex) {
                                                              ex.printStackTrace();
                                                          }
                                                       }
                                                   }
                                              }catch (ParseException e) {
                                
                                                  // TODO Auto-generated catch block
                                                  e.printStackTrace();
                                             }  
                                          }


		                    
		                          } catch (IOException e) {
		    	    	                try {
                                                      
                                                    errorlogFile = new FileWriter(new File(log + "_ERROR.log"), true);
		    	    	    	            errorlogFile.write("fails in " + attempt + " attempt to connect " + doc + "at " + timestamp + " got an IOException for log: " + e.getMessage());
		    	    	    	            errorlogFile.write("\n");
		    	    	    	            errorlogFile.close();

                                                    if(attempt == 5 ){
                                                        
                                                        logFile.write("Failed to connect to " + doc );
                                                        logFile.close();
                                                     }
 
		                                } catch (IOException e1) {
					 
                                                   // TODO Auto-generated catch block
					           e1.printStackTrace();
				                }
		    		                // TODO Auto-generated catch block
		 		                attempt++;
		    	       }   
		    	
		            }
		            
		            if(htmlscript == null){
		 	            System.out.println("Failed to connect for "+saveDir);
                                    try {
				           
                                            logFile.write("Failed to connect to " + doc );
					} catch (IOException e) {
							
                                            // TODO Auto-generated catch block
                                            e.printStackTrace();
					}
		            }
 
                            try {
				  
                                    logFile.close();
				} catch (IOException e) {
							
                                    // TODO Auto-generated catch block
				    e.printStackTrace();
			        }
  
	}


}

