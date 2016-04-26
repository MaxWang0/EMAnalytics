import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;

public class HttpDownloadUtility {
	private static final int BUFFER_SIZE = 4096;
	
	/**
     * Downloads a file from a URL
     * @param fileURL HTTP URL of the file to be downloaded
     * @param saveDir path of the directory to save the file
     * @throws IOException
     */
	public static int downloadFile(String fileURL, String saveDir){
		int responseCode = 0;
		int attempt = 0;
		String file = "";
		int fileSize = 0;
		while(responseCode != HttpURLConnection.HTTP_OK&&attempt < 5){
			try{
				URL url = new URL(fileURL);
                                HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		                responseCode = httpConn.getResponseCode();
			
 
                // always check HTTP response code first
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    String fileName = "";
                    String disposition = httpConn.getHeaderField("Content-Disposition");
                    String contentType = httpConn.getContentType();
                    int contentLength = httpConn.getContentLength();
 
                    if (disposition != null) {
                        // extracts file name from header field
                        int index = disposition.indexOf("filename=");
                        if (index > 0) {
                            fileName = disposition.substring(index + 9,
                                    disposition.length());
                        }
                    } else {
                        // extracts file name from URL
                        fileName = fileURL.substring(fileURL.lastIndexOf("/") + 1,
                                fileURL.length());
                    }
 
                    System.out.println("Content-Type = " + contentType);
                    System.out.println("Content-Disposition = " + disposition);
                    System.out.println("Content-Length = " + contentLength);
                    System.out.println("fileName = " + fileName);
 
                    // opens input stream from the HTTP connection
                    InputStream inputStream = httpConn.getInputStream();
                    // ZipEntry zEntry = null;
                    // ZipInputStream zipIs = new ZipInputStream(new BufferedInputStream(inputStream));
                    String saveFilePath = saveDir + File.separator + fileName;
                    BufferedInputStream in = new BufferedInputStream(inputStream);
            
                    try{
            	        byte[] tmp = new byte[4*1024];
            	        FileOutputStream outputStream = new FileOutputStream(saveFilePath);
            	        int size = 0;
            	        while((size = in.read(tmp)) != -1){
        			outputStream.write(tmp, 0, size);
        			fileSize += size;
        		}
            	        outputStream.flush();
            	        outputStream.close();
                        // throw new IOException();
                    }catch (Exception e){
            	        e.printStackTrace();
            	        fileSize = -1;
            	        return fileSize;
                    }
            /***
            while((zEntry = zipIs.getNextEntry()) != null){
            	try{
            		byte[] tmp = new byte[4*1024];
            		FileOutputStream outputStream = new FileOutputStream(saveFilePath);
            		int size = 0;	
            		while((size = zipIs.read(tmp)) != -1){
            			outputStream.write(tmp, 0, size);
            		}
            		outputStream.flush();
            		outputStream.close();
            	} catch(Exception ex){
            		
            	}
            }
            ***/
            
            
            //zipIs.close();
            
             
            /**
            // opens an output stream to save into file
            FileOutputStream outputStream = new FileOutputStream(saveFilePath);
 
            int bytesRead = -1;
            byte[] buffer = new byte[BUFFER_SIZE];
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            **/

            /***
            File f = new File(saveFilePath);
    		if(f.exists() && !f.isDirectory()) { 
    			System.out.println("File downloaded");
    			return fileSize;
    		}else{
    			fileSize = 0;
    		}
    		***/
            
 
            
            } else {
        	fileSize = 0;
        	attempt++;
                //System.out.println("No file to download. Server replied HTTP code: " + responseCode);
            }
            httpConn.disconnect();
        }catch(SocketTimeoutException e){
            e.printStackTrace();
            attempt++;
	}catch(IOException e){
            e.printStackTrace();
            attempt++;
	}
		}
		
		
		
		
		return fileSize;
	}
	
}





