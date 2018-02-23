package giphy_server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;


@SuppressWarnings("serial")
@WebServlet(urlPatterns="/giphylist")
public class giphy_servlet extends HttpServlet{
	@Resource(lookup="jdbc/giphy_list")
	private DataSource coonpool;
	
	@Override
	protected void doGet(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException{


	}
	
	
	
	@Override
	protected void doPost(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException{

//		  StringBuffer jb = new StringBuffer();
//		  String line = null;
//		  try {
//		    BufferedReader reader = req.getReader();
//		    while ((line = reader.readLine()) != null)
//		      jb.append(line);
//		  } catch (Exception e) { /*report an error*/ }
//
//		  try {
//		    JsonObject jsonObject =  HTTP.toJSONObject(jb.toString());
//		  } catch (JsonException e) {
//		    // crash and burn
//		    throw new IOException("Error parsing JSON request string");
//		  }
		
		StringBuilder buffer = new StringBuilder();
	    BufferedReader reader = req.getReader();
	    String line;
	    while ((line = reader.readLine()) != null) {
	        buffer.append(line);
	    }
	    String data = buffer.toString();
	    JsonObject body = Json.createReader(new StringReader(data)).readObject();
	    String id = body.get("id").toString();
	    String title = body.getString("title").toString();
	    String url = body.getString("url").toString();
	    String type = body.getString("type").toString();
	    String rating = body.getString("rating").toString();
	    String user = body.getString("user").toString();
		    
		
//	    JsonArrayBuilder custBuilder = Json.createArrayBuilder();
	    Connection connection=null;
		try{
			connection  = coonpool.getConnection();
//			Statement stmt = connection.createStatement();
//			ResultSet rSet = stmt.executeQuery("select * from gl_data");
			
//			while(rSet.next()) {//must need rSet.next(),or it will occur before resultset error
//				JsonObject cust = Json.createObjectBuilder()
//						.add("id", rSet.getString("id"))
//						.add("type", rSet.getString("type"))
//						.build();
//				custBuilder.add(cust);
//				
//			}		
//			res.setStatus(HttpServletResponse.SC_OK);
			String query = " insert into gl_data (id, type, url, rating, title,user)"
			        + " values (?, ?, ?, ?, ?, ?)";
			 PreparedStatement preparedStmt = connection.prepareStatement(query);
			 preparedStmt.setString(1, id);
			 preparedStmt.setString(2, type);
			 preparedStmt.setString(3, url);
			 preparedStmt.setString(4, rating);
			 preparedStmt.setString(5, title);
			 preparedStmt.setString(6, user);
			 preparedStmt.execute();
			 res.setStatus(HttpServletResponse.SC_OK);
			 
		}
		catch(SQLException e) {
			e.printStackTrace();
			log(e.getMessage());
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}
		finally {
			 if (connection != null)
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		try(PrintWriter pWriter = res.getWriter()){
			res.setStatus(HttpServletResponse.SC_OK);
			res.setContentType(MediaType.APPLICATION_JSON);
			pWriter.println(id.toString());
			
		}
	}
}
